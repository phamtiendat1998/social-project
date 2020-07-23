using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.Models
{
    public class PasswordModel
    {
        public string IdUser { get; set; }
        public string PasswordCurrent { get; set; }
        public string PasswordConfirm { get; set; }
        public string PasswordNew { get; set; }
    }
}