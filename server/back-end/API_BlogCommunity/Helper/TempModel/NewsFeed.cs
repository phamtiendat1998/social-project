using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class NewsFeed
    {
        public string IdPost { get; set; } = Guid.NewGuid().ToString();

        public string IdUser { get; set; }

        public int IdCategory { get; set; }

        public string Content { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UploadedTS { get; set; } = DateTime.UtcNow;

        public string Location { get; set; } = "INDETERMINATE";

        public string Images { get; set; }

        public byte? StatusSocial { get; set; }

        public DateTime? TimeStampSort { get; set; } = DateTime.UtcNow;

        public string UpdateImages { get; set; }

        public byte? Emotion { get; set; }

        public long QuantityLike { get; set; }

        public long QuantityComment { get; set; }

        public string SharePost { get; set; }

        public bool Liked { get; set; } = false;

        public List<string> ListImages { get; set; }

        public UserInfo UserInfo { get; set; }

        public Category Category { get; set; }

        public List<Comment> Comment { get; set; }
    }

    public class ImagePostParams
    {
        public string IdUser { get; set; }
        public byte Status { get; set; }
    }
}