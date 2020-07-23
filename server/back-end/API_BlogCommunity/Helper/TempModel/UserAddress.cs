using Helper.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserAddress : IUser
    {
        public string IdUser { get; set; }

        public string IdUserAddress { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string DetailAddress { get; set; }

        public string Country { get; set; }

        public byte? Status { get; set; } = 1;

        [StringLength(4)]
        public string LiveFrom { get; set; }

        [StringLength(4)]
        public string LiveTo { get; set; }
    }
}