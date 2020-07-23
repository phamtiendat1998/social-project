using Helper.Enum;
using Helper.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserSignUp
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public GenderEnum Gender { get; set; } = true ? GenderEnum.Male : GenderEnum.Female;

        public DateTime DateOfBirth { get; set; }

        public string Password { get; set; }

        public string PasswordConfirm { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public string Avatar { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Contact { get; set; }

        public string OTP { get; set; }

        public bool EmailConfirm { get; set; }

        public bool PhoneNumberConfirm { get; set; }

        public DateTime CreatedTS { get; set; }

        public ServiceReceiveOTP Type { get; set; }

        public StatusAccount StatusAccount { get; set; }

        public string Cover { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }

        public string Province { get; set; }

        public UserAddress UserAddress { get; set; }
    }
}