using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserContact
    {
        public string IdContact { get; set; } = Guid.NewGuid().ToString();

        public string IdUser { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public byte StatusSocial { get; set; }
    }
}