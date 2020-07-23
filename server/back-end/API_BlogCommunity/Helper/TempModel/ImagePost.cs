using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class ImagePost
    {
        public string IdImage { get; set; } = Guid.NewGuid().ToString();

        public string IdPost { get; set; }

        public string ImagesUrl { get; set; }

        public NewsFeed Post { get; set; }
    }
}