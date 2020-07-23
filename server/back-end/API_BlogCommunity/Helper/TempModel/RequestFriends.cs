using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class RequestFriends
    {
        public string IdUser { get; set; }

        public string IdUserRequest { get; set; }

        public DateTime? CreateTS { get; set; } = DateTime.UtcNow;

        public UserAccount UserAccount { get; set; }

        public UserInfo UserInfo { get; set; }
    }
}