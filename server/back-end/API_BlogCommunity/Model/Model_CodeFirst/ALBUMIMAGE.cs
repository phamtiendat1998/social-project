namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ALBUMIMAGES")]
    public partial class ALBUMIMAGE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ALBUMIMAGE()
        {
            IMAGES = new HashSet<IMAGE>();
        }

        [Key]
        public string IdAlbumImage { get; set; }

        [Required]
        [StringLength(128)]
        public string IdMedia { get; set; }

        [StringLength(100)]
        public string AlbumName { get; set; }

        public DateTime? CreatedTS { get; set; }

        public int? Quantity { get; set; }

        [StringLength(100)]
        public string ContentAlbum { get; set; }

        public DateTime? UpdatedTS { get; set; }

        public string Cover { get; set; }

        public byte? Status { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERMEDIA USERMEDIA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IMAGE> IMAGES { get; set; }
    }
}
