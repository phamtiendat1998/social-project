using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class Media
    {
        public string IdUser { get; set; }

        public string Base64String { get; set; }

        public long QuantityView { get; set; }

        public UserInfo UserInfo { get; set; }
    }

    public class ModelQuantityMedia
    {
        public long QuantityAlbum { get; set; } = 0;

        public long QuantityItem { get; set; } = 0;
    }

    public class ChartTopTen
    {
        public string IdMedia { get; set; }

        public long Quantity { get; set; }
    }

    public class CharAlbumMusic
    {
        public string IdAlbum { get; set; }

        public Musics Musics { get; set; }
    }
}