using COMMON;
using DAL.Common;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using System;
namespace DAL.Controllers
{
    public class UserController : BaseController<UserController>
    {
        public string InsertNewAccount(UserSignUp user)
        {
            var ID_USER = string.Empty;
            try
            {
                USERACCOUNT newUser = new USERACCOUNT();
                ID_USER = GUID.UUID();
                var dateOnTime = DateTime.UtcNow;
                newUser.IdUser = ID_USER;
                newUser.DateOfBirth = user.DateOfBirth;
                newUser.Username = user.UserName;
                newUser.PasswordHash = user.PasswordHash;
                newUser.PasswordSalt = user.PasswordSalt;
                newUser.CreatedTS = dateOnTime;
                newUser.StatusAccount = (byte)user.StatusAccount;

                USERINFO info = new USERINFO();
                info.IdInfo = GUID.UUID();
                info.IdUser = ID_USER;
                info.DateOfBirth = Convert.ToDateTime(user.DateOfBirth);
                info.FirstName = user.FirstName;
                info.LastName = user.LastName;
                info.Gender = Convert.ToBoolean(user.Gender);
                info.CreatedTS = dateOnTime;

                if (user.EmailConfirm)
                {
                    newUser.EmailConfirmed = user.EmailConfirm;
                }

                if (user.PhoneNumberConfirm)
                {
                    newUser.PhoneNumberConfirmed = user.PhoneNumberConfirm;
                }

                if (!String.IsNullOrEmpty(user.Email))
                {
                    newUser.Email = user.Email;
                }

                else
                {
                    newUser.PhoneNumber = user.PhoneNumber;
                }

                UserContext.Instance.InsertAccount(newUser, info);
            }
            catch (Exception ex) { }

            return ID_USER;
        }

        public void InsertUserIntro(string idUser)
        {
            USERINTRO intro = new USERINTRO();
            intro.IdUser = idUser;
            intro.IdUserIntro = GUID.UUID();

            UserContext.Instance.InsertUserIntro(intro);
        }

        public void InsertUserAddress(string idUser)
        {
            USERADDRESS address = new USERADDRESS();
            address.IdUser = idUser;
            address.IdUserAddress = GUID.UUID();

            UserContext.Instance.InsertUserAddress(address);
        }

        public void InsertUserMedia(string idUser)
        {
            USERMEDIA media = new USERMEDIA();
            media.IdUser = idUser;
            media.IdMedia = GUID.UUID();

            UserContext.Instance.InsertUserMedia(media);
        }

        public bool InsertRelationTableOnUser(string idUser)
        {
            bool isInsert = false;

            if (!string.IsNullOrEmpty(idUser) && IsExistIDUser(idUser))
            {
                USERINTRO intro = new USERINTRO();
                intro.IdUser = idUser;
                intro.IdUserIntro = GUID.UUID();

                USERADDRESS address = new USERADDRESS();
                address.IdUser = idUser;
                address.IdUserAddress = GUID.UUID();

                USERMEDIA media = new USERMEDIA();
                media.IdUser = idUser;
                media.IdMedia = GUID.UUID();

                UserContext.Instance.InsertUserRelation(intro, address, media);
                isInsert = true;
            }

            return isInsert;
        }

        public bool IsExistAccount(string username)
        {
            return UserContext.Instance.GetUserOfUsername(username);
        }

        public bool IsExistIDUser(string IdUser)
        {
            return UserContext.Instance.GetAccountByID(IdUser);
        }

        public bool IsExistPhoneNumber(string phonenumber)
        {
            return UserContext.Instance.IsExistPhoneNumber(phonenumber);
        }

        public bool IsExistEmail(string email)
        {
            return UserContext.Instance.IsExistEmail(email);
        }

        public bool UpdatePassword(UserSignUp user)
        {
            return UserContext.Instance.UpdatePassword(user);
        }

        public UserAccount DetailAccount(string idUser)
        {
            var detail = UserContext.Instance.DetailAccount(idUser);
            return new UserAccount
            {
                IdUser = detail.IdUser,
                AccessFailedCount = detail.AccessFailedCount,
                CreatedTS = detail.CreatedTS,
                DateOfBirth = detail.DateOfBirth,
                Email = detail.Email,
                EmailConfirmed = detail.EmailConfirmed,
                LastUpdatedTS = detail.LastUpdatedTS,
                PasswordHash = detail.PasswordHash,
                PasswordSalt = detail.PasswordSalt,
                PhoneNumber = detail.PhoneNumber,
                PhoneNumberConfirmed = detail.PhoneNumberConfirmed,
                StatusAccount = detail.StatusAccount,
                TwoFactorEnabled = detail.TwoFactorEnabled,
                Username = detail.Username
            };
        }

        public Tuple<string, byte> Login(UserSignUp user)
        {
            Tuple<string, byte> result = new Tuple<string, byte>("", 0);
            if (IsExistAccount(user.UserName))
            {
                var HasUser = UserContext.Instance.GetAccountByUsername(user.UserName);

                if (HasUser != null && CredentialUtils.IsPasswordMatch(user.Password, HasUser.PasswordHash, HasUser.PasswordSalt))
                {
                    if (HasUser.StatusAccount == (byte)StatusAccount.Actived)
                    {
                        result = new Tuple<string, byte>(HasUser.IdUser, (byte)StatusLogin.Actived);
                    }
                    else
                    {
                        result = new Tuple<string, byte>(HasUser.IdUser, (byte)StatusLogin.NotActive);
                    }
                }
            }

            return result;
        }

        public string InsertUserToken(string UserId)
        {
            var generateToken = string.Empty;

            if (!String.IsNullOrEmpty(UserId))
            {
                generateToken = CredentialUtils.Base64Encode(GUID.UUID());

                var userToken = new USERTOKEN()
                {
                    CreatedTS = UtcNow.Utc(),
                    ContentToken = generateToken,
                    IdUser = UserId,
                    IdToken = GUID.UUID()
                };

                if (UserContext.Instance.InsertTokenKey(userToken) > 0)
                {
                    return generateToken;
                }
            }

            return generateToken;
        }

        public bool IsHasAddressID(string idUser)
        {
            return UserContext.Instance.IsHasIDAddress(idUser);
        }

        public bool IsHasContactID(string idUser)
        {
            return UserContext.Instance.IsHasIDContact(idUser);
        }

        public bool IsHasInfoID(string idUser)
        {
            return UserContext.Instance.IsHasIDInfo(idUser);
        }

        public bool IsHasIntroID(string idUser)
        {
            return UserContext.Instance.IsHasIDIntro(idUser);
        }

        public bool IsHasMediaID(string idUser)
        {
            return UserContext.Instance.IsHasIDMedia(idUser);
        }
    }
}