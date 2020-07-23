using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class Comment : Media
    {
        public string IdComment { get; set; } = Guid.NewGuid().ToString();

        public string IdPost { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        public List<string> Images { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedTS { get; set; }

        public long ReplyComments { get; set; }

        public NewsFeed NewsFeed { get; set; }

        public UserAccount UserAccount { get; set; }

        public UserInfo UserInfo { get; set; }
    }
}