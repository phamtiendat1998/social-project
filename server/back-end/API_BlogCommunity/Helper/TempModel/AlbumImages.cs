using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class AlbumImages : Media
    {
        public string IdAlbumImage { get; set; } = Guid.NewGuid().ToString();

        public string IdMedia { get; set; }

        public string AlbumName { get; set; }

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public int? Quantity { get; set; }

        public string Cover { get; set; }

        public byte? StatusSocial { get; set; } = 1;

        public List<string> Covers { get; set; }

        public string ContentAlbum { get; set; }

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;

        public Images Images { get; set; }
    }
}