using System;
using System.Collections.Generic;

namespace Helper.TempModel
{
    public class Musics : Media
    {
        public string IdMusic { get; set; } = Guid.NewGuid().ToString();

        public string IdAlbumMusic { get; set; }

        public string ContentMusic { get; set; }

        public string LinkUrl { get; set; }

        public string MusicName { get; set; }

        public string Singer { get; set; }

        public string Cover { get; set; }

        public string Time { get; set; }

        public byte? StatusSocial { get; set; } = 1;

        public List<string> Covers { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;

        public UserInfo UserInfo { get; set; }
    }

    public class ResponseMusic
    {
        public string IdMusic { get; set; }

        public string LinkUrl { get; set; }
    }
}