namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ALBUMVIDEOS")]
    public partial class ALBUMVIDEO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ALBUMVIDEO()
        {
            VIDEOS = new HashSet<VIDEO>();
        }

        [Key]
        public string IdAlbumVideo { get; set; }

        [Required]
        [StringLength(128)]
        public string IdMedia { get; set; }

        [StringLength(100)]
        public string AlbumVideoName { get; set; }

        public DateTime? CreatedTS { get; set; }

        public int? Quantity { get; set; }

        [StringLength(100)]
        public string ContentAlbumVideo { get; set; }

        public string Cover { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? UpdatedTS { get; set; }

        public byte? Status { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERMEDIA USERMEDIA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VIDEO> VIDEOS { get; set; }
    }
}
