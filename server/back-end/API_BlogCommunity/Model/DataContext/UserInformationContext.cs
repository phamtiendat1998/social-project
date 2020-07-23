using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserInformationContext : DataContextCoreBase<UserInformationContext>
    {
        public IEnumerable<USERINFO> Get()
        {
            return DbContext.USERINFOes.ToList();
        }

        public bool IsHasIDInfo(string idInfo)
        {
            return DbContext.USERINFOes.Any(n => n.IdInfo == idInfo);
        }

        public USERINFO GetByIdUser(string idUser)
        {
            return DbContext.USERINFOes.FirstOrDefault(n => n.IdUser == idUser);
        }

        public USERINFO GetByIdInfo(string idInfo)
        {
            return DbContext.USERINFOes.FirstOrDefault(n => n.IdInfo == idInfo);
        }

        public int Create(USERINFO userinfo)
        {
            DbContext.USERINFOes.Add(userinfo);
            return DbContext.SaveChanges();
        }

        public int Update(USERINFO Info)
        {
            var currentInfo = !String.IsNullOrEmpty(Info.IdUser) ?
                DbContext.USERINFOes.FirstOrDefault(n => n.IdUser == Info.IdUser) :
                DbContext.USERINFOes.FirstOrDefault(n => n.IdInfo == Info.IdInfo);

            currentInfo.Avatar = !String.IsNullOrEmpty(Info.Avatar) ? Info.Avatar : currentInfo.Avatar;
            currentInfo.Cover = !String.IsNullOrEmpty(Info.Cover) ? Info.Cover : currentInfo.Cover;
            currentInfo.DateOfBirth = Info.DateOfBirth != null ? Info.DateOfBirth : currentInfo.DateOfBirth;
            currentInfo.FirstName = !String.IsNullOrEmpty(Info.FirstName) ? Info.FirstName : currentInfo.FirstName;
            currentInfo.LastName = !String.IsNullOrEmpty(Info.LastName) ? Info.LastName : currentInfo.LastName;
            currentInfo.LastUpdatedTS = Info.LastUpdatedTS != null ? Info.LastUpdatedTS : currentInfo.LastUpdatedTS;
            currentInfo.Gender = Info.Gender;

            DbContext.USERINFOes.Add(currentInfo);
            DbContext.Entry(currentInfo).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public void Delete(USERINFO info)
        {
            DbContext.USERINFOes.Remove(info);
            DbContext.SaveChanges();
        }


    }
}