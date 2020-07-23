using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserStory
    {
        public string IdStory { get; set; }

        public string IdUser { get; set; }

        public string Content { get; set; }

        public byte TypeContent { get; set; } = 1; //1 : img  2: video

        public DateTime CreatedTS { get; set; }

        public UserInfo UserInfo { get; set; }

        public double MinuteOfTime { get; set; }
    }
}