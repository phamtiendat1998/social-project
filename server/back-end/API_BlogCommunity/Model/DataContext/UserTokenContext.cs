using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserTokenContext : DataContextCoreBase<UserTokenContext>
    {
        public IEnumerable<USERTOKEN> Get()
        {
            return DbContext.USERTOKENs.ToList();
        }

        public IEnumerable<USERTOKEN> Get(string idToken)
        {
            return DbContext.USERTOKENs.Where(n => n.IdToken == idToken).AsEnumerable();
        }

        public IEnumerable<USERTOKEN> GetByIdUser(string idUser)
        {
            return DbContext.USERTOKENs.Where(n => n.IdUser == idUser).AsEnumerable();
        }

        public bool HasToken(string idUser, string token)
        {
            return DbContext.USERTOKENs.Any(n => n.IdUser == idUser && n.IdToken == token);
        }

        public void Create(USERTOKEN usertoken)
        {
            DbContext.USERTOKENs.Add(usertoken);
            DbContext.SaveChanges();
        }

        public void Update(USERTOKEN token)
        {
            DbContext.USERTOKENs.Add(token);
            DbContext.Entry(token).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Delete(USERTOKEN token)
        {
            DbContext.USERTOKENs.Remove(token);
            DbContext.SaveChanges();
        }
    }
}