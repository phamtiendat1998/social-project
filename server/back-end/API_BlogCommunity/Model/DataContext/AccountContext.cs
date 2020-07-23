using Helper.Enum;
using Helper.TempModel;
using Model.Common;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class AccountContext : DataContextCoreBase<AccountContext>
    {
        public IEnumerable<USERACCOUNT> Get()
        {
            return DbContext.USERACCOUNTs.Include(n => n.USERINFOes).ToList();
        }

        public USERACCOUNT Get(string idUser)
        {
            return DbContext.USERACCOUNTs
                .Include(n => n.USERADDRESSes)
                .Include(n => n.USERINTROes)
                .Include(n => n.USERINFOes)
                .FirstOrDefault(n => n.IdUser == idUser);
        }

        public USERINFO GetInfo(string idUser)
        {
            return DbContext.USERINFOes.SingleOrDefault(n => n.IdUser == idUser);
        }

        public Tuple<PagingMetaData, List<USERACCOUNT>> GetUserSuggest(PagingParameterModel paging, string idUser)
        {
            var listFriendOfUser = DbContext.FRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserFriend).AsQueryable();
            var listRequestOfUser = DbContext.REQUESTFRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserRequest).AsQueryable();
            var listUserExclude = DbContext.USERSEXCLUDEs.Where(n => n.IdUser == idUser).Select(n => n.IdUserExclude);

            var source = DbContext.USERACCOUNTs
                .Include(n => n.USERINFOes)
                .Where(n => n.IdUser != idUser
                 && !listFriendOfUser.Contains(n.IdUser)
                 && !listRequestOfUser.Contains(n.IdUser)
                 && !listUserExclude.Contains(n.IdUser))
                .OrderByDescending(n => n.CreatedTS).AsQueryable();

            return ApiPaging<USERACCOUNT>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<REQUESTFRIEND>> GetRequestFriends(PagingParameterModel paging, string idUser)
        {
            var source = DbContext.REQUESTFRIENDS
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Where(n => n.IdUserRequest == idUser)
                .OrderByDescending(n => n.CreateTS).AsQueryable();

            return ApiPaging<REQUESTFRIEND>.Paging(source, paging);
        }

        public REQUESTFRIEND GetRequestFriendsCurrent(string idUser, string idUserRequest)
        {
            return DbContext.REQUESTFRIENDS
                .Include(n => n.USERACCOUNT.USERINFOes)
                .FirstOrDefault(n => n.IdUser == idUser && n.IdUserRequest == idUserRequest);
        }

        public USERACCOUNT GetByUsername(string username)
        {
            return DbContext.USERACCOUNTs
                .Include(n => n.USERINFOes)
                .FirstOrDefault(n => n.Username.ToLower().Equals(username.ToLower()));
        }

        public FRIEND GetCurrentFriend(string idUser, string idUserFriend)
        {
            return DbContext.FRIENDS
                .Include(n => n.USERACCOUNT.USERINFOes)
                .FirstOrDefault(n => n.IdUser == idUser && n.IdUserFriend == idUserFriend);
        }

        public void Create(USERACCOUNT useraccount)
        {
            DbContext.USERACCOUNTs.Add(useraccount);
            DbContext.SaveChanges();
        }

        public int Update(USERACCOUNT user)
        {
            var CurrentUser = Get(user.IdUser);
            CurrentUser.DateOfBirth = user.DateOfBirth != null ? user.DateOfBirth : CurrentUser.DateOfBirth;
            CurrentUser.LastUpdatedTS = user.LastUpdatedTS;
            CurrentUser.PasswordHash = !String.IsNullOrEmpty(user.PasswordHash) ? user.PasswordHash : CurrentUser.PasswordHash;
            CurrentUser.PasswordSalt = !String.IsNullOrEmpty(user.PasswordSalt) ? user.PasswordSalt : CurrentUser.PasswordSalt;
            CurrentUser.PhoneNumber = String.IsNullOrEmpty(CurrentUser.PhoneNumber) ? (!String.IsNullOrEmpty(user.PhoneNumber) ? user.PhoneNumber : CurrentUser.PhoneNumber) : CurrentUser.PhoneNumber;
            CurrentUser.PhoneNumberConfirmed = user.PhoneNumberConfirmed == true ? user.PhoneNumberConfirmed : CurrentUser.PhoneNumberConfirmed;
            CurrentUser.Email = String.IsNullOrEmpty(CurrentUser.Email) ? (!String.IsNullOrEmpty(user.Email) ? user.Email : CurrentUser.Email) : CurrentUser.Email;
            CurrentUser.EmailConfirmed = user.EmailConfirmed == true ? user.EmailConfirmed : CurrentUser.EmailConfirmed;
            CurrentUser.StatusAccount = CurrentUser.StatusAccount == (byte)StatusAccount.NonActive ? (user.StatusAccount != (byte)StatusAccount.NonActive ? user.StatusAccount : CurrentUser.StatusAccount) : CurrentUser.StatusAccount;
            CurrentUser.TwoFactorEnabled = CurrentUser.TwoFactorEnabled == false ? (user.TwoFactorEnabled != false ? user.TwoFactorEnabled : CurrentUser.TwoFactorEnabled) : CurrentUser.TwoFactorEnabled;

            DbContext.USERACCOUNTs.Add(CurrentUser);
            DbContext.Entry(CurrentUser).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public void Delete(USERACCOUNT User)
        {
            DbContext.USERACCOUNTs.Remove(User);
            DbContext.SaveChanges();
        }

        public int InsertRequestFriend(REQUESTFRIEND friend)
        {
            DbContext.REQUESTFRIENDS.Add(friend);
            return DbContext.SaveChanges();
        }

        public int RemoveRequestFriend(string idUser, string idUserRequest)
        {
            var current = DbContext.REQUESTFRIENDS.FirstOrDefault(n => n.IdUser == idUserRequest && n.IdUserRequest == idUser);

            DbContext.REQUESTFRIENDS.Remove(current);
            return DbContext.SaveChanges();
        }

        public bool IsFriend(string idUser, string idUserFriend)
        {
            return DbContext.FRIENDS.Any(n => n.IdUser == idUser && n.IdUserFriend == idUserFriend);
        }

        public bool IsRequest(string idUser, string idUserRequest)
        {
            return DbContext.REQUESTFRIENDS.Any(n => n.IdUser == idUser && n.IdUserRequest == idUserRequest);
        }

        public int InsertFriend(FRIEND friend)
        {
            var dataReturn = new FRIEND()
            {
                IdUser = friend.IdUserFriend,
                IdUserFriend = friend.IdUser,
                CreateTS = DateTime.UtcNow,
                Status = friend.Status
            };

            DbContext.FRIENDS.Add(friend);
            DbContext.FRIENDS.Add(dataReturn);

            if (DbContext.SaveChanges() > 0)
                return RemoveRequestFriend(friend.IdUser, friend.IdUserFriend);
            return 0;
        }

        public Tuple<PagingMetaData, List<USERINFO>> GetFriends(string IdUser, PagingParameterModel paging)
        {
            var listIDFriends = DbContext.FRIENDS.Where(n => n.IdUser == IdUser && n.IdUserFriend != IdUser).Select(n => n.IdUserFriend);
            var listInfoFriends = DbContext.USERINFOes.Where(n => listIDFriends.Contains(n.IdUser)).OrderByDescending(n => n.CreatedTS);

            return ApiPaging<USERINFO>.Paging(listInfoFriends, paging);
        }

        public int QuantityFriend(string IdUser)
        {
            return DbContext.FRIENDS.Count(n => n.IdUser == IdUser);
        }

        public int RemoveFriend(string idUser, string idUserFriend)
        {
            DbContext.FRIENDS.Remove(GetCurrentFriend(idUser, idUserFriend));
            DbContext.FRIENDS.Remove(GetCurrentFriend(idUserFriend, idUser));
            return DbContext.SaveChanges();
        }

        public int QuantityRequestFriend(string idUser)
        {
            return DbContext.REQUESTFRIENDS.Count(n => n.IdUserRequest == idUser);
        }

        public IEnumerable<REQUESTFRIEND> GetUserRequest(string idUser)
        {
            return DbContext.REQUESTFRIENDS.Include(n => n.USERACCOUNT.USERINFOes).Where(n => n.IdUserRequest == idUser).AsEnumerable();
        }

        public int InsertFollows(FOLLOWS follows)
        {
            DbContext.FOLLOWS.Add(follows);
            return DbContext.SaveChanges();
        }

        public FOLLOWS GetFollows(string idUser, string idUserRequest)
        {
            return DbContext.FOLLOWS.FirstOrDefault(n => n.IdUser == idUser && n.IdUserRequest == idUserRequest);
        }

        public IEnumerable<FOLLOWS> GetFollowsOfUser(string idUserRequest)
        {
            return DbContext.FOLLOWS
                .Include(n => n.USERACCOUNT.NEWFEEDPOSTs)
                .Where(n => n.IdUserRequest == idUserRequest).AsEnumerable();
        }

        public bool IsFollow(string idUser, string idUserRequest)
        {
            return DbContext.FOLLOWS.Any(n => n.IdUser == idUser && n.IdUserRequest == idUserRequest);
        }

        public long QuantityFollowers(string idUser)
        {
            return DbContext.FOLLOWS.LongCount(n => n.IdUserRequest == idUser);
        }

        public Tuple<PagingMetaData, List<FOLLOWS>> GetFollowers(string idUser, PagingParameterModel paging)
        {
            var source = DbContext.FOLLOWS
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Where(n => n.IdUser == idUser).AsQueryable();

            return ApiPaging<FOLLOWS>.Paging(source, paging);
        }

        public int RemoveFollows(FOLLOWS follows)
        {
            DbContext.FOLLOWS.Remove(GetFollows(follows.IdUser, follows.IdUserRequest));
            return DbContext.SaveChanges();
        }

        public bool IsExcludeSuggest(USERSEXCLUDE usersExclude)
        {
            return DbContext.USERSEXCLUDEs.Any(n => n.IdUser == usersExclude.IdUser && n.IdUserExclude == usersExclude.IdUserExclude);
        }

        public int CreateUsersExclude(USERSEXCLUDE usersExclude)
        {
            DbContext.USERSEXCLUDEs.Add(usersExclude);
            return DbContext.SaveChanges();
        }

        public int RemoveUsersExclude(USERSEXCLUDE usersExclude)
        {
            var current = DbContext.USERSEXCLUDEs.FirstOrDefault(n => n.IdUser == usersExclude.IdUser
            && n.IdUserExclude == usersExclude.IdUserExclude && n.Status == usersExclude.Status);
            DbContext.USERSEXCLUDEs.Remove(current);
            return DbContext.SaveChanges();
        }

        public int QuantityUserExcluded(string idUser)
        {
            return DbContext.USERSEXCLUDEs.Count(n => n.IdUser == idUser && n.Status == 2);
        }

        public Tuple<PagingMetaData, List<USERSEXCLUDE>> GetUsersExclude(USERSEXCLUDE usersExclude, PagingParameterModel paging)
        {
            var source = DbContext.USERSEXCLUDEs
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Where(n => n.IdUser == usersExclude.IdUser && n.Status == usersExclude.Status)
                .AsQueryable();

            return ApiPaging<USERSEXCLUDE>.Paging(source, paging);
        }

        public bool IsAvaiableToken(string idUser, string contentToken)
        {
            return DbContext.USERTOKENs.Any(n => n.IdUser == idUser && n.ContentToken == contentToken);
        }

        public int LogOut(USERTOKEN token)
        {
            var current = DbContext.USERTOKENs.FirstOrDefault(n => n.IdUser == token.IdUser && n.ContentToken == token.ContentToken);

            DbContext.USERTOKENs.Remove(current);
            return DbContext.SaveChanges();
        }

        public bool IsExcluded(string idUser, string idUserParallel)
        {
            return DbContext.USERSEXCLUDEs.Any(n => n.IdUser == idUser && n.IdUserExclude == idUserParallel && n.Status == (byte)Helper.Enum.UsersExclude.Block);
        }

        public TypeUser GetTypeUser(string idUser, string idUserParallel)
        {
            if (IsFriend(idUser, idUserParallel) || (IsExcluded(idUser, idUserParallel) && IsFriend(idUser, idUserParallel)))
                return TypeUser.Friend;
            else if (IsFollow(idUser, idUserParallel))
                return TypeUser.Follower;
            else if (IsExcluded(idUser, idUserParallel))
                return TypeUser.Exclude;
            else
                return TypeUser.Anonymous;
        }

        public int QuantityFriendsParallel(string idUser, string idUserParallel)
        {
            var listFiendsUserCurrent = DbContext.FRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserFriend).AsQueryable();

            return DbContext.FRIENDS
                .Where(n => n.IdUser == idUserParallel && listFiendsUserCurrent.Contains(n.IdUserFriend)).Count();
        }

        public IQueryable<string> GetIdFriendsParallel(string idUser, string idUserParallel)
        {
            var listFiendsUserCurrent = DbContext.FRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserFriend).AsQueryable();

            var a = DbContext.FRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserFriend).ToList();
            var b = DbContext.FRIENDS
                 .Where(n => n.IdUser == idUserParallel && listFiendsUserCurrent.Contains(n.IdUserFriend))
                 .Select(n => n.IdUserFriend).ToList();

            return DbContext.FRIENDS
                 .Where(n => n.IdUser == idUserParallel && listFiendsUserCurrent.Contains(n.IdUserFriend))
                 .Select(n => n.IdUserFriend).AsQueryable();
        }

        public Tuple<PagingMetaData, List<USERINFO>> GetInfoUserParallel(string idUser, string idUserParallel, PagingParameterModel paging)
        {
            var listFiendsUserCurrent = DbContext.FRIENDS.Where(n => n.IdUser == idUser).Select(n => n.IdUserFriend).ToList();
            var IdFriendsParallel = DbContext.FRIENDS
                 .Where(n => n.IdUser == idUserParallel && listFiendsUserCurrent.Contains(n.IdUserFriend))
                 .Select(n => n.IdUserFriend).ToList();

            var listIdFriends = GetIdFriendsParallel(idUser, idUserParallel);

            IQueryable<USERINFO> source = null;

            var a = DbContext.USERINFOes.Where(n => IdFriendsParallel.Contains(n.IdUser))?
               .Select(n => new USERINFO()
               {
                   IdUser = n.IdUser,
                   Avatar = n.Avatar,
                   FirstName = n.FirstName,
                   LastName = n.LastName,
               }).ToList();

            if (listIdFriends.Any() && listIdFriends.Count() > 0)
            {
                source = DbContext.USERINFOes.Where(n => listIdFriends.Contains(n.IdUser))
               .Select(n => new USERINFO()
               {
                   IdUser = n.IdUser,
                   Avatar = n.Avatar,
                   FirstName = n.FirstName,
                   LastName = n.LastName,
               }).AsQueryable();
            }

            return ApiPaging<USERINFO>.Paging(source, paging);
        }
    }
}