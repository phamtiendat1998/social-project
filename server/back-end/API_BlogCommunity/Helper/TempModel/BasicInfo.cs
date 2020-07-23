using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class Info
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public bool? Gender { get; set; }

        public DateTime? Birthday { get; set; }
    }


    public class BasicInfo
    {
        public Info Info { get; set; }

        public List<UserAddress> Address { get; set; }

        public List<IntroStudy> IntroStudy { get; set; }

        public List<IntroWorking> IntroWorking { get; set; }
    }
}