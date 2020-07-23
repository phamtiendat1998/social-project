using Model.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Helper.TempModel;
using Model.Model_CodeFirst;

namespace DAL.Controllers
{
    public class UserContactController : BaseController<UserContactController>
    {
        private UserContactContext dc = new UserContactContext();
        private UserContext userdc = new UserContext();

        public UserContact Get(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetByIDUser(idUser);
                return new UserContact()
                {
                    IdUser = data.IdUser,
                    Email = data.Email,
                    IdContact = data.IdUserContact,
                    PhoneNumber = data.PhoneNumber,
                };
            }

            return null;
        }

        public bool Create(UserContact contact)
        {
            bool isCreate = false;

            if (!(string.IsNullOrEmpty(contact.IdUser) && (string.IsNullOrEmpty(contact.Email) || string.IsNullOrEmpty(contact.PhoneNumber))))
            {
                var data = new USERCONTACT()
                {
                    Email = contact.Email,
                    IdUser = contact.IdUser,
                    PhoneNumber = contact.PhoneNumber,
                    IdUserContact = contact.IdContact
                };

                isCreate = dc.Create(data) > 0 ? true : false;
            }

            return isCreate;
        }

        public bool Update(UserContact contact)
        {
            bool isUpdate = false;

            if (!(string.IsNullOrEmpty(contact.IdUser) && string.IsNullOrEmpty(contact.IdContact)
                && userdc.IsExistUserId(contact.IdUser) && dc.IsHasIDInfo(contact.IdContact)))
            {
                var data = new USERCONTACT()
                {
                    IdUser = contact.IdUser,
                    Email = contact.Email,
                    IdUserContact = contact.IdContact,
                    PhoneNumber = contact.PhoneNumber
                };

                isUpdate = dc.Update(data) > 0 ? true : false;
            }

            return isUpdate;
        }
    }
}