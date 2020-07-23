using API_BlogCommunity.Models;
using CACHE_SYSTEM.MemoryCaching;
using COMMON;
using DAL.Controllers;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.Models;
using Helper.RegexHelper;
using Helper.TempModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using AllowAnonymousAttribute = System.Web.Http.AllowAnonymousAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using OTPModel = Helper.TempModel.OTPModel;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API_BlogCommunity.Controllers
{
    [EnableCors("*", "*", "*")]
    public class AccountController : BaseApiController
    {
        private static Dictionary<string, byte> ListUserLoginFailed = new Dictionary<string, byte>();
        private UserController userdc = new UserController();
        private DAL.Controllers.AccountController accountdc = new DAL.Controllers.AccountController();

        /// <summary>
        /// //////////////////
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        #region Private
        private static String GenerateCodeVerify()
        {
            Random rd = new Random();
            return rd.Next(111111, 999999).ToString();
        }

        private bool SendOTP(SendOTPModel data, ServiceReceiveOTP type)
        {
            bool IsSent = false;
            var CodeVerify = GenerateCodeVerify();
            var contentOTP = "";

            try
            {
                Caching_Memory.Add($"CodeVerify{data.UserID}", CodeVerify, DateTimeOffset.UtcNow.AddMinutes(15));

                switch (type)
                {
                    case ServiceReceiveOTP.Email:
                        var pwEmail = ConfigurationManager.AppSettings["PasswordEmail"];
                        var UsernameEmail = ConfigurationManager.AppSettings["Email"];
                        contentOTP = $"{ConfigurationManager.AppSettings["ContentOTP"]} {Caching_Memory.GetValue($"CodeVerify{data.UserID}")}";
                        var SubjectEmail = ConfigurationManager.AppSettings["SubjectEmail"];
                        if (ServiceOTP.SendEmail(UsernameEmail, pwEmail, data.Username, SubjectEmail, contentOTP))
                            IsSent = true;
                        break;

                    case ServiceReceiveOTP.PhoneNumber:
                        var Comport = ConfigurationManager.AppSettings["COM-PORT"];
                        contentOTP = $"{ConfigurationManager.AppSettings["ContentOTP"]} {Caching_Memory.GetValue($"CodeVerify{data.UserID}")}";
                        if (ServiceOTP.SendOTPToPhoneNumber(data.Username, contentOTP))
                            IsSent = true;

                        break;
                }
            }
            catch { IsSent = false; }

            return IsSent;
        }

        private HttpResponseMessage SetCookie(string nameCookie, string value)
        {
            var resp = new HttpResponseMessage();

            var cookie = new CookieHeaderValue(nameCookie, value);
            cookie.Expires = DateTimeOffset.UtcNow.AddMonths(12);
            resp.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            return resp;
        }

        private UserAccount GenerateCookie(string idUser)
        {
            if (!String.IsNullOrEmpty(idUser))
            {
                var user = userdc.DetailAccount(idUser);
                UserAccount newInfo = new UserAccount()
                {
                    IdUser = user.IdUser,
                    DateOfBirth = user.DateOfBirth,
                    StatusAccount = user.StatusAccount,
                    IdUserAccount = user.IdUserAccount,
                    PasswordSalt = CredentialUtils.GeneratePassword()
                };

                return newInfo;
            }

            return null;
        }

        #endregion
        [AllowAnonymous]
        [Route("api/account/insertnewaccount")]
        [HttpPost]
        public JsonResult InsertNewAccount([FromBody]UserSignUp user)
        {
            var result = new JsonResult { Data = "data not enough" };

            if (user != null && user.Password == user.PasswordConfirm
                && userdc.IsExistAccount(user.UserName = user.Type == ServiceReceiveOTP.Email ? user.Email : user.PhoneNumber) == false)
            {
                CredentialUtils.EncryptPasswordFromPubDot(user.Password, out string pwdHash, out string pwdSalt);
                user.PasswordHash = pwdHash;
                user.PasswordSalt = pwdSalt;
                user.StatusAccount = StatusAccount.NonActive;

                if (user.Type == ServiceReceiveOTP.Email && !String.IsNullOrEmpty(user.OTP))
                {
                    user.EmailConfirm = true;
                }
                if (user.Type == ServiceReceiveOTP.PhoneNumber && !String.IsNullOrEmpty(user.OTP))
                {
                    user.PhoneNumberConfirm = true;
                }

                var userId = userdc.InsertNewAccount(user);
                if (!String.IsNullOrEmpty(userId))
                    result = new JsonResult { Data = userId, ContentType = "success" };
            }

            return result;
        }

        [AllowAnonymous]
        [Route("api/account/verifyotpactiveaccount")]
        [HttpPost]
        public JsonResult VerifyOTPActiveAccount(OTPModel code)
        {
            var result = new JsonResult { Data = "data not enough" };

            if (!(String.IsNullOrEmpty(code.IdUser) && String.IsNullOrEmpty(code.OTPCode)))
            {
                var cache = Caching_Memory.GetValue($"CodeVerify{code.IdUser}");

                if (cache != null && code.OTPCode == cache.ToString() && accountdc.UpdateStatusAccount(code))
                {
                    result = userdc.InsertRelationTableOnUser(code.IdUser) ?
                        new JsonResult { Data = "account actived success" } :
                        new JsonResult { Data = "account active failed" };

                    if (Caching_Memory.GetValue($"CodeVerify{code.IdUser}") != null)
                    {
                        Caching_Memory.Delete($"CodeVerify{code.IdUser}");
                    }
                }
                else
                {
                    result = new JsonResult { Data = "account active failed" };
                }
            }

            return result;
        }

        [AllowAnonymous]
        [Route("api/account/sendOTP")]
        [HttpPost]
        public JsonResult SendOTP(OTPModel code)
        {
            var result = new JsonResult { Data = "Send failed" };
            SendOTPModel accountReceive = null;

            if (userdc.IsExistAccount(code.Username) || userdc.IsExistIDUser(code.IdUser))
            {
                var account = !String.IsNullOrEmpty(code.IdUser) ? accountdc.Get(code.IdUser) : !String.IsNullOrEmpty(code.Username) ?
                              accountdc.GetByUsername(code.Username) : null;

                if (account != null)
                {
                    code.Type = IsValidEmail.IsValidEmailAddress(account.UserName) == true ?
                        ServiceReceiveOTP.Email : ServiceReceiveOTP.PhoneNumber;

                    accountReceive = new SendOTPModel { UserID = account.UserId, Username = account.UserName };

                    if (SendOTP(accountReceive, code.Type))
                    {
                        result = SendOTP(new SendOTPModel { UserID = account.UserId, Username = account.UserName }, code.Type)
                         ? new JsonResult { Data = new OTPModel { IdUser = account.UserId } } : new JsonResult { Data = "failed" };
                    }
                }
            }

            return result;
        }

        [AllowAnonymous]
        [Route("api/account/checkexistusername/")]
        [HttpGet]
        public JsonResult CheckExistUserName(string username)
        {
            return (!String.IsNullOrEmpty(username) && userdc.IsExistAccount(username) == false) ?
               new JsonResult { Data = "User not Exist" } : new JsonResult { Data = "User exist" };
        }

        [AllowAnonymous]
        [Route("api/account/confirmotp")]
        [HttpPost]
        public JsonResult ConfirmOTP(OTPModel code)
        {
            var CurrentOTP = Convert.ToString(Caching_Memory.GetValue($"CodeVerify{ code.IdUser }"));

            return (!String.IsNullOrEmpty(code.IdUser) && CurrentOTP != null && !string.IsNullOrEmpty(code.OTPCode) && CurrentOTP == code.OTPCode && userdc.IsExistIDUser(code.IdUser)) ?
               new JsonResult { Data = "Confirm success" } : new JsonResult { Data = "Confirm failed" };
        }

        [AllowAnonymous]
        [Route("api/account/forgotpassword")]
        [HttpPost]
        public JsonResult ForgotPassword([FromBody]UserSignUp user)
        {
            var result = new JsonResult { Data = "data not enough" };

            try
            {
                if (!(String.IsNullOrEmpty(user.Password) && String.IsNullOrEmpty(user.PasswordConfirm) && String.IsNullOrEmpty(user.UserId))
                    && user.Password == user.PasswordConfirm && userdc.IsExistIDUser(user.UserId))
                {
                    CredentialUtils.EncryptPasswordFromPubDot(user.Password, out string pwdHash, out string pwdSalt);
                    user.PasswordHash = pwdHash;
                    user.PasswordSalt = pwdSalt;
                    result = userdc.UpdatePassword(user) == true ? new JsonResult { Data = "Update password success" } :
                        new JsonResult { Data = "Update password failed" };
                }
            }
            catch { result = new JsonResult { Data = "Server busy" }; }

            return result;
        }

        [AllowAnonymous]
        [Route("api/account/login")]
        [HttpPost]
        public JsonResult Login([FromBody]UserSignUp user)
        {
            var result = new JsonResult { ContentType = "data not enough" };
            string cacheLoginFailed = Convert.ToString(Caching_Memory.GetValue($"loginfailed{user.UserName}"));

            if (!(String.IsNullOrEmpty(user.UserName) && String.IsNullOrEmpty(user.Password)))
            {
                if (string.IsNullOrEmpty(cacheLoginFailed))
                {
                    var userId = userdc.Login(user);

                    if (!String.IsNullOrEmpty(userId.Item1))
                    {
                        var tokenKey = userdc.InsertUserToken(userId.Item1);

                        if (!String.IsNullOrEmpty(tokenKey) && userId.Item2 == (byte)StatusLogin.Actived)
                        {
                            if (!userdc.IsHasAddressID(userId.Item1))
                            {
                                userdc.InsertUserAddress((userId.Item1));
                            }
                            if (!userdc.IsHasIntroID(userId.Item1))
                            {
                                userdc.InsertUserIntro((userId.Item1));
                            }
                            if (!userdc.IsHasMediaID(userId.Item1))
                            {
                                userdc.InsertUserMedia((userId.Item1));
                            }

                            if (userdc.IsHasMediaID(userId.Item1))
                            {
                                result = new JsonResult
                                {
                                    ContentType = "Login success",
                                    Data = new
                                    {
                                        id = userId.Item1,
                                        token = GenerateTokenKey.Encode(new Token { IdUser = userId.Item1, TokenKey = tokenKey },
                                        ConfigurationManager.AppSettings["tokenKey"], JwtHashAlgorithm.HS512),
                                    }
                                };

                                if (ListUserLoginFailed.ContainsKey(user.UserName))
                                {
                                    ListUserLoginFailed.Remove(user.UserName);
                                }
                            }
                        }
                        else
                        {
                            result = new JsonResult
                            {
                                ContentType = "Login success, not active. plesea active account",
                                Data = new
                                {
                                    id = userId.Item1,
                                    token = tokenKey,
                                }
                            };
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(user.UserName) && userdc.IsExistAccount(user.UserName))
                        {
                            if (ListUserLoginFailed.ContainsKey(user.UserName))
                            {
                                byte countFailed = 0;
                                ListUserLoginFailed.TryGetValue(user.UserName, out countFailed);
                                countFailed++;

                                if (countFailed >= 10)
                                {
                                    Caching_Memory.Add($"loginfailed{user.UserName}", countFailed, DateTimeOffset.UtcNow.AddMinutes(15));
                                }
                                else
                                {
                                    ListUserLoginFailed[user.UserName] = countFailed;
                                }
                            }
                            else
                            {
                                ListUserLoginFailed.Add(user.UserName, 1);
                            }
                        }

                        result = new JsonResult { ContentType = "Login failed" };
                    }
                }
                else
                {
                    result = new JsonResult { ContentType = "accout was login failed 10 time with block 15 Minutes" };
                }
            }

            return result;
        }

        [Route("api/account/getinfo")]
        [HttpGet]
        public JsonResult GetInfo(string idUser)
        {
            return !String.IsNullOrEmpty(idUser) ?
                new JsonResult { Data = accountdc.GetInfo(idUser) } : new JsonResult { Data = "" };
        }

        [Route("api/account/updatepassword")]
        [HttpPost]
        public JsonResult UpdatePassword([FromBody]PasswordModel password)
        {
            var result = new JsonResult { Data = "data not enough" };

            if (password != null)
            {
                result = accountdc.UpdatePassword(password) == true ? new JsonResult { Data = "updated password" } :
                    new JsonResult { Data = "update password failed" };
            }

            return result;
        }

        [Route("api/account/logout")]
        [HttpPost]
        public JsonResult LogOut([FromBody]string token)
        {
            var result = new JsonResult { Data = "data not enough" };

            if (!string.IsNullOrEmpty(token))
            {
                result = accountdc.LogOut(token) == true ? new JsonResult { Data = "has logout" } :
                    new JsonResult { Data = "logout failed" };
            }

            return result;
        }
    }
}
