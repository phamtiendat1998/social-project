using Helper.Enum;
using Helper.TempModel;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserContext : DataContextCoreBase<UserContext>
    {
        public void InsertUserAddress(USERADDRESS address)
        {
            DbContext.USERADDRESSes.Add(address);
            DbContext.SaveChanges();
        }

        public void InsertUserIntro(USERINTRO intro)
        {
            DbContext.USERINTROes.Add(intro);
            DbContext.SaveChanges();
        }

        public void InsertUserRelationship(USERRELATIONSHIP relationship)
        {
            DbContext.USERRELATIONSHIPs.Add(relationship);
            DbContext.SaveChanges();
        }

        public void InsertAlbumMusics(ALBUMMUSIC albumMusic)
        {
            DbContext.ALBUMMUSICs.Add(albumMusic);
            DbContext.SaveChanges();
        }

        public void InsertAlbumImages(ALBUMIMAGE albumImage)
        {
            DbContext.ALBUMIMAGES.Add(albumImage);
            DbContext.SaveChanges();
        }

        public void InsertListAlbumImages(List<ALBUMIMAGE> listAlbum)
        {
            DbContext.ALBUMIMAGES.AddRange(listAlbum);
            DbContext.SaveChanges();
        }

        public void InsertAlbumVideos(ALBUMVIDEO albumVideo)
        {
            DbContext.ALBUMVIDEOS.Add(albumVideo);
            DbContext.SaveChanges();
        }

        public bool InsertUserMedia(USERMEDIA media)
        {
            bool isCreateMedia = false;
            var ID_MEDIA = media.IdMedia;
            var CREATE_TS = DateTime.UtcNow;

            if (isCreateMedia == false)
            {
                DbContext.USERMEDIAs.Add(media);
                isCreateMedia = DbContext.SaveChanges() > 0 ? true : false;
            }

            if (isCreateMedia == true)
            {
                List<ALBUMIMAGE> listAlbumImages = new List<ALBUMIMAGE>();
                string albumName = string.Empty;
                string content = string.Empty;

                for (int i = 1; i <= 3; i++)
                {
                    if (i == 1) { albumName = "Cover"; content = "Your cover"; }
                    if (i == 2) { albumName = "Avatar"; content = "Your avatar"; }
                    if (i == 3) { albumName = "DEFAULT"; content = "Home Images"; }

                    listAlbumImages.Add(new ALBUMIMAGE()
                    {
                        IdMedia = ID_MEDIA,
                        IdAlbumImage = Guid.NewGuid().ToString(),
                        CreatedTS = CREATE_TS,
                        AlbumName = albumName,
                        ContentAlbum = content
                    });
                }

                ALBUMMUSIC albumMusic = new ALBUMMUSIC()
                {
                    IdAlbumMusic = Guid.NewGuid().ToString(),
                    IdMedia = ID_MEDIA,
                    AlbumMusicName = "DEFAULT",
                    CreatedTS = CREATE_TS,
                    ContentAlbumMusic = "Home music song"
                };

                ALBUMVIDEO albumVideo = new ALBUMVIDEO()
                {
                    IdMedia = ID_MEDIA,
                    IdAlbumVideo = Guid.NewGuid().ToString(),
                    AlbumVideoName = "DEFAULT",
                    ContentAlbumVideo = "Home video",
                    CreatedTS = CREATE_TS
                };

                if (listAlbumImages != null && albumVideo != null && albumMusic != null)
                {
                    InsertAlbumMusics(albumMusic);
                    InsertAlbumVideos(albumVideo);
                    InsertListAlbumImages(listAlbumImages);
                }
            }

            return isCreateMedia;
        }

        public void InsertUserInfo(USERINFO info)
        {
            DbContext.USERINFOes.Add(info);
            DbContext.SaveChanges();
            var UserRelationship = new USERRELATIONSHIP();
            UserRelationship.IdUserRelationship = Guid.NewGuid().ToString();
            UserRelationship.IdInfo = info.IdInfo;
            UserRelationship.CreatedDate = DateTime.UtcNow;
            InsertUserRelationship(UserRelationship);
        }

        public IEnumerable<USERACCOUNT> GetAll()
        {
            return DbContext.USERACCOUNTs.ToList();
        }

        public USERACCOUNT DetailAccount(string idUser)
        {
            return DbContext.USERACCOUNTs.FirstOrDefault(n => n.IdUser == idUser);
        }

        public bool GetAccountByID(string idUser)
        {
            return DbContext.USERACCOUNTs.Any(n => n.IdUser == idUser);
        }

        public USERACCOUNT GetAccountByUsername(string username)
        {
            return DbContext.USERACCOUNTs.SingleOrDefault(n => (n.Email.ToLower().Equals(username.ToLower())
                || n.PhoneNumber.Equals(username.ToLower())
                || n.Username.ToLower().Equals(username)));
        }

        public bool IsExistIDInfo(string idInfo)
        {
            return DbContext.USERINFOes.Any(n => n.IdInfo == idInfo);
        }

        public bool IsUserInfo(string idUser)
        {
            using (BlogCommunityContext DbContext = new BlogCommunityContext())
            {
                return DbContext.USERINFOes.Any(n => n.IdUser == idUser);
            }
        }

        public bool GetUserOfUsername(string username)
        {
            return DbContext.USERACCOUNTs.Any(n => (n.Email.ToLower().Equals(username.ToLower())
               || n.PhoneNumber.Equals(username.ToLower())
               || n.Username.ToLower().Equals(username)));
        }

        public void InsertUserRelation(USERINTRO intro, USERADDRESS address, USERMEDIA media)
        {
            InsertUserIntro(intro);
            InsertUserAddress(address);
            InsertUserMedia(media);
        }

        public bool InsertAccount(USERACCOUNT user, USERINFO info)
        {
            bool isCratedAccount = false;
            var USER_ID = user.IdUser;

            DbContext.USERACCOUNTs.Add(user);
            isCratedAccount = DbContext.SaveChanges() > 0 ? true : false;

            if (isCratedAccount == true)
            {
                InsertUserInfo(info);
            }

            return isCratedAccount;
        }

        public bool IsExistEmail(string email)
        {
            return DbContext.USERACCOUNTs.Any(n => n.Email == email && n.EmailConfirmed == true);
        }

        public bool IsExistPhoneNumber(string phonenumber)
        {
            return DbContext.USERACCOUNTs.Any(n => n.PhoneNumber == phonenumber && n.PhoneNumberConfirmed == true);
        }

        public bool IsExistUserId(string userId)
        {
            return DbContext.USERACCOUNTs.Any(n => n.IdUser == userId);

        }

        public bool UpdatePassword(UserSignUp users)
        {
            var user = DbContext.USERACCOUNTs.Find(users.UserId);
            if (user != null)
            {
                user.PasswordHash = users.PasswordHash;
                user.PasswordSalt = users.PasswordSalt;
                user.LastUpdatedTS = DateTime.UtcNow;
                DbContext.Entry(user).State = EntityState.Modified;
                DbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Login(string username, string password)
        {
            var HasUser = DbContext.USERACCOUNTs.Single(n => (n.Email.ToLower().Equals(username.ToLower())
                || n.PhoneNumber.Equals(username.ToLower())
                || n.Username.ToLower().Equals(username)
                && n.PasswordHash == password));

            if (HasUser != null)
                return true;
            return false;

        }

        public int InsertTokenKey(USERTOKEN token)
        {
            DbContext.USERTOKENs.Add(token);
            return DbContext.SaveChanges();
        }

        public bool IsHasIDAddress(string idAddress)
        {
            return DbContext.USERADDRESSes.Any(n => n.IdUserAddress == idAddress);
        }

        public bool IsExistIDAddressOfUser(string idUser, string idAddress)
        {
            return DbContext.USERADDRESSes.Any(n => n.IdUserAddress == idAddress && n.IdUser == idUser);
        }

        public bool IsHasIDInfo(string idUser)
        {
            return DbContext.USERINFOes.Any(n => n.IdUser == idUser);
        }

        public bool IsHasIDIntro(string idUser)
        {
            return DbContext.USERINTROes.Any(n => n.IdUser == idUser);
        }

        public bool IsHasIDContact(string idUser)
        {
            return DbContext.USERCONTACTs.Any(n => n.IdUser == idUser);
        }

        public bool IsHasIDMedia(string idUser)
        {
            return DbContext.USERMEDIAs.Any(n => n.IdUser == idUser);
        }

        public bool IsHasIdAddress(string idAddress)
        {
            return DbContext.USERADDRESSes.Any(n => n.IdUserAddress == idAddress);
        }
    }
}