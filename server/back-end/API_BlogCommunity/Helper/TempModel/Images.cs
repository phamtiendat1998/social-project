using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class Images : Media
    {
        public string IdImage { get; set; } = Guid.NewGuid().ToString();

        public string IdAlbumImage { get; set; }

        public string ContentImage { get; set; }

        public string LinkUrl { get; set; }

        public List<string> ListLinkUrl { get; set; }

        public byte? StatusSocial { get; set; } = 1;

        public DateTime? CreatedTS { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedTS { get; set; } = DateTime.UtcNow;
    }
}