using System;
using System.Collections.Generic;

namespace Helper.TempModel
{
    public class Videos : Media
    {
        public string IdVideo { get; set; } = Guid.NewGuid().ToString();

        public string IdAlbumVideo { get; set; }

        public string ContentVideo { get; set; }

        public string LinkUrl { get; set; }

        public string VideoName { get; set; }

        public string Cover { get; set; }

        public string Time { get; set; }

        public byte? StatusSocial { get; set; } = 1;

        public List<string> Covers { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;
    }
}