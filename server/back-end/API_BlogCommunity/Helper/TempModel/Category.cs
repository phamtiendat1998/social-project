using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class Category
    {
        public int IdCategory { get; set; }

        [StringLength(100)]
        public string NameCategory { get; set; }

        public string IntroCategory { get; set; }

        public string CoverCategoryUrl { get; set; }

        public byte[] Base64Image { get; set; }

        public string Base64String { get; set; }
    }
}