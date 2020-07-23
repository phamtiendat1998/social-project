namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IMAGEPOST")]
    public partial class IMAGEPOST
    {
        [Key]
        public string IdImage { get; set; }

        [Required]
        [StringLength(128)]
        public string IdPost { get; set; }

        public string ImagesUrl { get; set; }

        public virtual NEWFEEDPOST NEWFEEDPOST { get; set; }
    }
}
