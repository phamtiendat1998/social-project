using System;

namespace Helper.TempModel
{
    public class Follows
    {
        public string IdUser { get; set; }

        public string IdUserRequest { get; set; }

        public DateTime? CreateTS { get; set; } = DateTime.UtcNow;

        public UserAccount UserAccount { get; set; }

        public UserInfo UserInfo { get; set; }
    }
}