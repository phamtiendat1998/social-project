using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserToken
    {
        public string IdToken { get; set; }

        public string IdUser { get; set; }

        public string ContentToken { get; set; }

        public DateTime? CreatedTS { get; set; }
    }
}