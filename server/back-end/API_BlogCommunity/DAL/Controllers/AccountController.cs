using COMMON;
using DAL.Common;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.Models;
using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using UsersExclude = Helper.TempModel.UsersExclude;

namespace DAL.Controllers
{
    public class AccountController : BaseController<AccountController>
    {
        UserContext dc = UserContext.Instance;
        AccountContext accountdc = AccountContext.Instance;

        public bool UpdatePassword(PasswordModel password)
        {
            bool IsUpdate = false;

            try
            {
                if (password != null && !(String.IsNullOrEmpty(password.PasswordNew) && String.IsNullOrEmpty(password.PasswordConfirm)
                    && String.IsNullOrEmpty(password.IdUser) && String.IsNullOrEmpty(password.PasswordCurrent))
                    && password.PasswordNew == password.PasswordConfirm && dc.IsExistUserId(password.IdUser)
                    && IsMatchPassword(password.PasswordCurrent, password.IdUser))
                {
                    var userCurrent = dc.DetailAccount(password.IdUser);
                    CredentialUtils.EncryptPasswordFromPubDot(password.PasswordNew, out string pwdHash, out string pwdSalt);

                    userCurrent.PasswordHash = pwdHash;
                    userCurrent.PasswordSalt = pwdSalt;
                    userCurrent.LastUpdatedTS = UtcNow.Utc();

                    IsUpdate = accountdc.Update(userCurrent) > 0 ? true : false;
                }
            }
            catch { }

            return IsUpdate;
        }

        public IEnumerable<UserSignUp> Get()
        {
            var account = accountdc.Get();
            return account?.Select(n => new UserSignUp
            {
                Avatar = !string.IsNullOrEmpty(n.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar) ? $"{CommonInstants.PrefixGG}{n.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar}" : null,
                UserId = n.IdUser,
                Email = n.Email,
                EmailConfirm = n.EmailConfirmed ?? false,
                PhoneNumber = n.PhoneNumber,
                PhoneNumberConfirm = n.PhoneNumberConfirmed ?? false,
            });
        }

        public UserSignUp Get(string idUser)
        {
            var account = accountdc.Get(idUser);
            return new UserSignUp()
            {
                Cover = UploadFile.ConCatImageString(account.USERINFOes.FirstOrDefault(n => n.IdUser != string.Empty)?.Cover)?.First(),
                Avatar = UploadFile.ConCatImageString(account.USERINFOes.FirstOrDefault(n => n.IdUser != string.Empty)?.Avatar)?.First(),
                UserId = account.IdUser,
                UserName = account.Username,
                Email = account.Email,
                PhoneNumber = account.PhoneNumber,
                UserAddress = new UserAddress
                {
                    City = account.USERADDRESSes.FirstOrDefault(n => n.IdUser != string.Empty)?.City,
                    Country = account.USERADDRESSes.FirstOrDefault(n => n.IdUser != string.Empty)?.Country,
                    DetailAddress = account.USERADDRESSes.FirstOrDefault(n => n.IdUser != string.Empty)?.DetailAddress,
                    Province = account.USERADDRESSes.FirstOrDefault(n => n.IdUser != string.Empty)?.Province,
                },
            };
        }

        public UserSignUp GetByUsername(string username)
        {
            var account = accountdc.GetByUsername(username);
            return new UserSignUp()
            {
                Avatar = !string.IsNullOrEmpty(account.USERINFOes.FirstOrDefault(n => n.IdUser != "")?.Avatar) ? $"{CommonInstants.PrefixGG}{account.USERINFOes.FirstOrDefault(n => n.IdUser != "")?.Avatar}" : null,
                UserId = account.IdUser,
                UserName = account.Username,
                Email = account.Email,
                EmailConfirm = account.EmailConfirmed ?? false,
                PhoneNumber = account.PhoneNumber,
                PhoneNumberConfirm = account.PhoneNumberConfirmed ?? false,
            };
        }

        public bool IsMatchPassword(string PasswordCurrent, string idUser)
        {
            if (!(String.IsNullOrEmpty(PasswordCurrent) && String.IsNullOrEmpty(idUser)) && dc.IsExistUserId(idUser))
            {
                var user = accountdc.Get(idUser);
                return CredentialUtils.IsPasswordMatch(PasswordCurrent, user.PasswordHash, user.PasswordSalt);
            }

            return false;
        }

        public UserInfo GetInfo(string idUser)
        {
            UserInfo result = null;

            if (!String.IsNullOrEmpty(idUser) && dc.IsExistUserId(idUser))
            {
                var info = accountdc.GetInfo(idUser);

                result = new UserInfo
                {
                    Avatar = UploadFile.ConCatImageString(info.Avatar)?.First(),
                    FirstName = info.FirstName,
                    LastName = info.LastName,
                    IdUser = info.IdUser
                };
            }

            return result;
        }

        public bool UpdateInfoAccount(UserSignUp account)
        {
            bool check = false;

            try
            {
                if (account != null)
                {
                    var acc = new USERACCOUNT()
                    {
                        EmailConfirmed = account.EmailConfirm,
                        PhoneNumberConfirmed = account.PhoneNumberConfirm,
                        IdUser = account.UserId,
                        LastUpdatedTS = UtcNow.Utc()
                    };

                    check = accountdc.Update(acc) > 0 ? true : false;
                }
            }
            catch { }

            return check;
        }

        public bool UpdateStatusAccount(OTPModel statusAccount)
        {
            bool IsUpdate = false;
            try
            {
                var account = accountdc.Get(statusAccount.IdUser);
                account.StatusAccount = (byte)StatusAccount.Actived;

                if (statusAccount.Type == ServiceReceiveOTP.PhoneNumber && account.PhoneNumberConfirmed == false)
                {
                    account.PhoneNumberConfirmed = true;
                }
                else
                {
                    account.EmailConfirmed = true;
                }

                IsUpdate = accountdc.Update(account) > 0 ? true : false;
            }
            catch { }

            return IsUpdate;
        }

        public Tuple<PagingMetaData, List<Friends>> GetFriendSuggest(string idUser, PagingParameterModel paging)
        {
            Tuple<PagingMetaData, List<Friends>> result = null;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                var data = accountdc.GetUserSuggest(paging, idUser);

                var listRequest = data?.Item2?.Select(n => new Friends
                {
                    IdUser = n.IdUser,

                    UserInfo = new UserInfo
                    {
                        LastName = n.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.LastName,
                        FirstName = n.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.FirstName,
                        Avatar = UploadFile.ConCatImageString(n.USERINFOes.FirstOrDefault(m => m.IdUser != "").Avatar)?.First(),
                    }
                }).ToList();

                result = new Tuple<PagingMetaData, List<Friends>>(data.Item1, listRequest);
            }

            return result;
        }

        public bool InsertRequestFriend(RequestFriends friend)
        {
            bool isSuccess = false;

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserRequest)) && !AccountContext.Instance.IsRequest(friend.IdUser, friend.IdUserRequest)
                && dc.GetAccountByID(friend.IdUser) && dc.GetAccountByID(friend.IdUserRequest) && friend.IdUser != friend.IdUserRequest) 
            {
                var data = new REQUESTFRIEND
                {
                    IdUser = friend.IdUser,
                    IdUserRequest = friend.IdUserRequest,
                    CreateTS = friend.CreateTS
                };

                isSuccess = accountdc.InsertRequestFriend(data) > 0 ? true : false;
            }

            return isSuccess;
        }

        public bool RemoveRequestFriend(RequestFriends friend)
        {
            bool isSuccess = false;

            if (!String.IsNullOrEmpty(friend.IdUser) && !String.IsNullOrEmpty(friend.IdUserRequest) && accountdc.IsRequest(friend.IdUser, friend.IdUserRequest)
               && dc.GetAccountByID(friend.IdUser) && dc.GetAccountByID(friend.IdUserRequest) && friend.IdUser != friend.IdUserRequest)
            {
                isSuccess = accountdc.RemoveRequestFriend(friend.IdUser, friend.IdUserRequest) > 0 ? true : false;
            }

            return isSuccess;
        }

        public int QuantityRequestFriend(string idUser)
        {
            int quantity = 0;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                quantity = accountdc.QuantityRequestFriend(idUser);
            }

            return quantity;
        }

        public int QuantityFriend(string idUser)
        {
            int quantity = 0;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                quantity = accountdc.QuantityFriend(idUser);
            }

            return quantity;
        }

        public bool CreateFriend(Friends friend)
        {
            bool isSuccess = false;

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserFriend) && accountdc.IsFriend(friend.IdUser, friend.IdUserFriend))
                && dc.GetAccountByID(friend.IdUser) && dc.GetAccountByID(friend.IdUserFriend) && friend.IdUser != friend.IdUserFriend)
            {
                isSuccess = AccountContext.Instance.InsertFriend(new FRIEND
                {
                    IdUser = friend.IdUser,
                    IdUserFriend = friend.IdUserFriend,
                    CreateTS = friend.CreateTS,
                    Status = friend.Status

                }) > 0 ? true : false;
            }

            return isSuccess;
        }

        public bool RemoveFriend(Friends friend)
        {
            bool isRemove = false;

            if (!String.IsNullOrEmpty(friend.IdUser) && !String.IsNullOrEmpty(friend.IdUserFriend) && accountdc.IsFriend(friend.IdUser, friend.IdUserFriend)
                 && dc.GetAccountByID(friend.IdUser) && dc.GetAccountByID(friend.IdUserFriend) && friend.IdUser != friend.IdUserFriend)
            {
                isRemove = accountdc.RemoveFriend(friend.IdUser, friend.IdUserFriend) > 0 ? true : false;
            }

            return isRemove;
        }

        public Tuple<PagingMetaData, List<UserInfo>> GetFriends(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<UserInfo>> result = null;

            if (!string.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                var data = accountdc.GetFriends(idUser, pagingparametermodel);

                var listFriends = data?.Item2?.Select(n => new UserInfo
                {
                    IdUser = n.IdUser,
                    Avatar = UploadFile.ConCatImageString(n.Avatar)?.First(),
                    LastName = n.LastName,
                    FirstName = n.FirstName

                }).ToList();

                result = new Tuple<PagingMetaData, List<UserInfo>>(data.Item1, listFriends);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<RequestFriends>> GetRequestFriends(string idUser, PagingParameterModel paging)
        {
            Tuple<PagingMetaData, List<RequestFriends>> result = null;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                var data = accountdc.GetRequestFriends(paging, idUser);

                var listRequest = data?.Item2?.Select(n => new RequestFriends
                {
                    IdUser = n.IdUser,

                    UserInfo = new UserInfo
                    {
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.FirstName,
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").Avatar)?.First(),
                    }
                }).ToList();

                result = new Tuple<PagingMetaData, List<RequestFriends>>(data?.Item1, listRequest);
            }

            return result;
        }

        public bool CreateFollows(Follows follow)
        {
            bool isCreate = false;

            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest) && accountdc.IsFollow(follow.IdUser, follow.IdUserRequest))
                && dc.GetAccountByID(follow.IdUser) && dc.GetAccountByID(follow.IdUserRequest) && follow.IdUser != follow.IdUserRequest)
            {
                var data = new FOLLOWS
                {
                    IdUser = follow.IdUser,
                    IdUserRequest = follow.IdUserRequest,
                    CreateTS = follow.CreateTS
                };

                isCreate = accountdc.InsertFollows(data) > 0 ? true : false;
            }

            return isCreate;
        }

        public bool IsFollowing(Follows follow)
        {
            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest)))
            {
                return accountdc.IsFollow(follow.IdUser, follow.IdUserRequest);
            }

            return false;
        }

        public bool IsFriend(Friends data)
        {
            if (!(String.IsNullOrEmpty(data.IdUser) && String.IsNullOrEmpty(data.IdUserFriend)))
            {
                return accountdc.IsFriend(data.IdUser, data.IdUserFriend);
            }

            return false;
        }

        public bool RemoveFollows(Follows follow)
        {
            bool isRemove = false;

            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest)) && accountdc.IsFollow(follow.IdUser, follow.IdUserRequest)
                && dc.GetAccountByID(follow.IdUser) && dc.GetAccountByID(follow.IdUserRequest) && follow.IdUser != follow.IdUserRequest)
            {
                var data = new FOLLOWS
                {
                    IdUser = follow.IdUser,
                    IdUserRequest = follow.IdUserRequest,
                };

                isRemove = accountdc.RemoveFollows(data) > 0 ? true : false;
            }

            return isRemove;
        }

        public long QuantityFollowers(string idUser)
        {
            long quantity = 0;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                quantity = accountdc.QuantityFollowers(idUser);
            }

            return quantity;
        }

        public Tuple<PagingMetaData, List<Follows>> GetFollowers(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<Follows>> result = null;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                var data = accountdc.GetFollowers(idUser, pagingparametermodel);

                var listFollowers = data.Item2.Select(n => new Follows
                {
                    IdUserRequest = n.IdUserRequest,
                    CreateTS = n.CreateTS,
                    UserInfo = new UserInfo
                    {
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").Avatar)?.First(),
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser == n.IdUserRequest)?.LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser == n.IdUserRequest)?.FirstName
                    }

                }).ToList();

                result = new Tuple<PagingMetaData, List<Follows>>(data.Item1, listFollowers);
            }

            return result;
        }

        public List<Follows> GetFollowOfUser(string idUser)
        {
            List<Follows> result = null;

            if (!String.IsNullOrEmpty(idUser) && dc.GetAccountByID(idUser))
            {
                result = accountdc.GetFollowsOfUser(idUser)
                .Select(n => new Follows
                {
                    IdUser = n.IdUser,
                    CreateTS = n.CreateTS,
                    UserInfo = new UserInfo
                    {
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").Avatar)?.First(),
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.FirstName
                    }

                }).ToList();
            }

            return result;
        }

        public bool CreateUsersExclude(UsersExclude usersExclude)
        {
            bool result = false;

            if (!(string.IsNullOrEmpty(usersExclude.IdUser) && string.IsNullOrEmpty(usersExclude.IdUserExclude))
                && dc.IsExistUserId(usersExclude.IdUser) && dc.IsExistUserId(usersExclude.IdUserExclude) && usersExclude.IdUser != usersExclude.IdUserExclude)
            {
                var data = new USERSEXCLUDE()
                {
                    IdUser = usersExclude.IdUser,
                    IdUserExclude = usersExclude.IdUserExclude,
                    Status = usersExclude.Status
                };

                result = accountdc.CreateUsersExclude(data) > 0 ? true : false;
            }

            return result;
        }

        public bool RemoveUsersExclude(UsersExclude usersExclude)
        {
            bool result = false;

            if (!(string.IsNullOrEmpty(usersExclude.IdUser) && string.IsNullOrEmpty(usersExclude.IdUserExclude))
                && dc.IsExistUserId(usersExclude.IdUser) && dc.IsExistUserId(usersExclude.IdUserExclude) && usersExclude.IdUser != usersExclude.IdUserExclude)
            {
                var data = new USERSEXCLUDE()
                {
                    IdUser = usersExclude.IdUser,
                    IdUserExclude = usersExclude.IdUserExclude,
                    Status = usersExclude.Status
                };

                result = accountdc.RemoveUsersExclude(data) > 0 ? true : false;
            }

            return result;
        }

        public Tuple<PagingMetaData, List<UsersExclude>> GetUserExclude(UsersExclude usersExclude, PagingParameterModel paging)
        {
            Tuple<PagingMetaData, List<UsersExclude>> result = null;

            if (!string.IsNullOrEmpty(usersExclude.IdUser) && dc.IsExistUserId(usersExclude.IdUser))
            {
                var data = new USERSEXCLUDE()
                {
                    IdUser = usersExclude.IdUser,
                    Status = usersExclude.Status
                };

                var dataResult = accountdc.GetUsersExclude(data, paging);

                var listUserExclude = dataResult.Item2?
                    .Select(n => new UsersExclude
                    {
                        IdUserExclude = n.IdUserExclude,
                        UserInfo = new UserInfo
                        {
                            IdUser = n.USERACCOUNT1.IdUser,
                            Avatar = UploadFile.ConCatImageString(n.USERACCOUNT1.USERINFOes.FirstOrDefault(m => m.IdUser != "").Avatar)?.First(),
                            LastName = n.USERACCOUNT1.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.LastName,
                            FirstName = n.USERACCOUNT1.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.FirstName
                        }
                    }).ToList();

                result = new Tuple<PagingMetaData, List<UsersExclude>>(dataResult.Item1, listUserExclude);
            }

            return result;
        }

        public int QuantityUserExcluded(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && dc.IsExistUserId(idUser))
            {
                return accountdc.QuantityUserExcluded(idUser);
            }

            return 0;
        }

        private UserToken DecodeToken(string tokenHeader)
        {
            UserToken result = null;

            if (!String.IsNullOrEmpty(tokenHeader))
            {
                var dataString = GenerateTokenKey.Decode(tokenHeader, ConfigurationManager.AppSettings["tokenKey"]);
                result = JsonConvert.DeserializeObject<UserToken>(dataString);
            }

            return result;
        }

        public bool LogOut(string tokenKey)
        {
            UserToken token = DecodeToken(tokenKey);
            bool isLogout = false;

            if (!string.IsNullOrEmpty(token.ContentToken) && !string.IsNullOrEmpty(token.IdUser)
                && dc.IsExistUserId(token.IdUser) && accountdc.IsAvaiableToken(token.IdUser, token.ContentToken))
            {
                var data = new USERTOKEN()
                {
                    ContentToken = token.ContentToken,
                    IdUser = token.IdUser
                };

                isLogout = accountdc.LogOut(data) > 0 ? true : false;
            }

            return isLogout;
        }

        public int QuantityFriendsParallel(UserParallel user)
        {
            int result = 0;

            if (!(string.IsNullOrEmpty(user.IdUser) && string.IsNullOrEmpty(user.IdUserParallel)) && dc.IsExistUserId(user.IdUser) && dc.IsExistUserId(user.IdUserParallel))
            {
                result = accountdc.QuantityFriendsParallel(user.IdUser, user.IdUserParallel);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<UserInfo>> GetUserParallel(UserParallel user, PagingParameterModel paging)
        {
            Tuple<PagingMetaData, List<UserInfo>> result = null;

            if (!(string.IsNullOrEmpty(user.IdUser) && string.IsNullOrEmpty(user.IdUserParallel)) && dc.IsExistUserId(user.IdUser) && dc.IsExistUserId(user.IdUserParallel))
            {
                var dataResult = accountdc.GetInfoUserParallel(user.IdUser, user.IdUserParallel, paging);

                var listUser = dataResult?.Item2?
                    .Select(n => new UserInfo
                    {
                        IdUser = n.IdUser,
                        Avatar = UploadFile.ConCatImageString(n.Avatar)?.First(),
                        LastName = n.LastName,
                        FirstName = n.FirstName

                    })?.ToList();

                result = new Tuple<PagingMetaData, List<UserInfo>>(dataResult?.Item1, listUser);
            }

            return result;
        }
    }
}