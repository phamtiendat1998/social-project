using Helper.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class AlbumMusics : Media
    {
        public string IdAlbumMusic { get; set; } = Guid.NewGuid().ToString();

        public string IdMedia { get; set; }

        public string AlbumMusicName { get; set; } = "New album";

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public int? Quantity { get; set; }

        public string Cover { get; set; }

        public string Time { get; set; }

        public List<string> Covers { get; set; }

        public string ContentAlbumMusic { get; set; } = "No content";

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;

        public byte? StatusSocial { get; set; } = 1;

        public Musics Musics { get; set; }
    }

    public class MultiFile
    {
        public TypeMedia TypeMedia { get; set; }

        public string IdUser { get; set; }

        public string IdFile { get; set; }
    }

}