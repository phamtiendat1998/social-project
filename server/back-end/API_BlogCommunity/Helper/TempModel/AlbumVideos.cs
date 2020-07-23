using System;
using System.Collections.Generic;

namespace Helper.TempModel
{
    public class AlbumVideos : Media
    {
        public string IdAlbumVideo { get; set; } = Guid.NewGuid().ToString();

        public string IdMedia { get; set; }

        public string AlbumVideoName { get; set; } = "New album";

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public int? Quantity { get; set; }

        public string Time { get; set; }

        public string Cover { get; set; }

        public byte? StatusSocial { get; set; }

        public List<string> Covers { get; set; }

        public string ContentAlbumVideo { get; set; } = "No content";

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;

        public Videos Videos { get; set; }
    }
}