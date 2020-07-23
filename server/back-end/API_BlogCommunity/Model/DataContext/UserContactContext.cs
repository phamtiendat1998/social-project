using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserContactContext : DataContextCoreBase<UserContactContext>
    {
        public IEnumerable<USERCONTACT> Get()
        {
            return DbContext.USERCONTACTs.ToList();
        }

        public USERCONTACT GetByIDUser(string idUser)
        {
            return DbContext.USERCONTACTs.FirstOrDefault(n => n.IdUser == idUser);
        }

        public bool IsHasIDInfo(string idContact)
        {
            return DbContext.USERCONTACTs.Any(n => n.IdUserContact == idContact);
        }

        public USERCONTACT Get(string idContact)
        {
            return DbContext.USERCONTACTs.FirstOrDefault(n => n.IdUserContact == idContact);
        }

        public int Create(USERCONTACT usercontact)
        {
            DbContext.USERCONTACTs.Add(usercontact);
            return DbContext.SaveChanges();
        }

        public int Update(USERCONTACT contact)
        {
            var current = !string.IsNullOrEmpty(contact.IdUser) ?
                DbContext.USERCONTACTs.FirstOrDefault(n => n.IdUser == contact.IdUser) :
                DbContext.USERCONTACTs.FirstOrDefault(n => n.IdUserContact == contact.IdUserContact);

            current.Email = !string.IsNullOrEmpty(contact.Email) ? contact.Email : current.Email;
            current.PhoneNumber = !string.IsNullOrEmpty(contact.PhoneNumber) ? contact.PhoneNumber : current.PhoneNumber;

            DbContext.USERCONTACTs.Add(current);
            DbContext.Entry(contact).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public void Delete(USERCONTACT contact)
        {
            DbContext.USERCONTACTs.Remove(contact);
            DbContext.SaveChanges();
        }
    }
}