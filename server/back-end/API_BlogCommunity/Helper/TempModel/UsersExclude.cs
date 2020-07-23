using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UsersExclude
    {
        public string IdUser { get; set; }

        public string IdUserExclude { get; set; }

        public byte Status { get; set; } = (byte)Enum.UsersExclude.ExcludeSuggest;

        public UserInfo UserInfo { get; set; }
    }

    public class UserParallel
    {
        public string IdUser { get; set; }

        public string IdUserParallel { get; set; }
    }
}