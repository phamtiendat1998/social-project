using Helper.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class OTPModel
    {
        public string Username { get; set; }
        public string IdUser { get; set; }
        public string OTPCode { get; set; }
        public ServiceReceiveOTP Type { get; set; }
    }
}