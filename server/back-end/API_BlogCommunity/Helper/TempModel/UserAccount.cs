using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserAccount
    {
        public long IdUserAccount { get; set; }

        public string IdUser { get; set; }

        public string Username { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastUpdatedTS { get; set; }

        public DateTime CreatedTS { get; set; }

        public byte? StatusAccount { get; set; }

        public string Email { get; set; }

        public bool? EmailConfirmed { get; set; }

        public string PhoneNumber { get; set; }

        public bool? PhoneNumberConfirmed { get; set; }

        public bool? TwoFactorEnabled { get; set; }

        public int? AccessFailedCount { get; set; }

        public UserInfo UserInfo { get; set; }
    }
}