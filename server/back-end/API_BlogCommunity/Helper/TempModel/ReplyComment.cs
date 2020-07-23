using System;
using System.Collections.Generic;

namespace Helper.TempModel
{
    public class ReplyComment : Media
    {
        public string IdReply { get; set; } = Guid.NewGuid().ToString();

        public string IdComment { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        public List<string> Images { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;

        public Comment Comment { get; set; }

        public UserInfo UserInfo { get; set; }

        public UserAccount UserAccount { get; set; }
    }
}