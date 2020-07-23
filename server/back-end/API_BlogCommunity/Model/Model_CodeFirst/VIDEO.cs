namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VIDEOS")]
    public partial class VIDEO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public VIDEO()
        {
            VIDEOVIEWS = new HashSet<VIDEOVIEW>();
        }

        [Key]
        public string IdVideo { get; set; }

        [Required]
        [StringLength(128)]
        public string IdAlbumVideo { get; set; }

        public string ContentVideo { get; set; }

        public string LinkUrl { get; set; }

        public DateTime? CreatedTS { get; set; }

        public DateTime? UpdatedTS { get; set; }

        [StringLength(256)]
        public string VideoName { get; set; }

        public string Cover { get; set; }

        [StringLength(20)]
        public string Time { get; set; }

        public byte? Status { get; set; }

        public virtual ALBUMVIDEO ALBUMVIDEO { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VIDEOVIEW> VIDEOVIEWS { get; set; }
    }
}
