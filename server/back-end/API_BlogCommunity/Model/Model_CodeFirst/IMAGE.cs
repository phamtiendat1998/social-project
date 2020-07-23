namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IMAGES")]
    public partial class IMAGE
    {
        [Key]
        public string IdImage { get; set; }

        [Required]
        [StringLength(128)]
        public string IdAlbumImage { get; set; }

        public string ContentImage { get; set; }

        public string LinkUrl { get; set; }

        public DateTime? CreatedTS { get; set; }

        public DateTime? UpdatedTS { get; set; }

        public byte? Status { get; set; }

        public virtual ALBUMIMAGE ALBUMIMAGE { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }
    }
}
