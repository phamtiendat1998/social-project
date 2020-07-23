using System;

namespace Helper.TempModel
{
    public class Friends
    {
        public string IdUser { get; set; }

        public string IdUserFriend { get; set; }

        public DateTime? CreateTS { get; set; } = DateTime.UtcNow;

        public byte Status { get; set; }

        public UserInfo UserInfo { get; set; }

        public UserAccount UserAccount { get; set; }
    }
}