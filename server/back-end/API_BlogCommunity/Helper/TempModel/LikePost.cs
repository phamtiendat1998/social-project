using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class LikePost
    {
        public string IdPost { get; set; }

        public string IdUser { get; set; }

        public byte Status { get; set; } = 0;
    }
}