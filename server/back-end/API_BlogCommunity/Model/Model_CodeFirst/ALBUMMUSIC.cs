namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ALBUMMUSIC")]
    public partial class ALBUMMUSIC
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ALBUMMUSIC()
        {
            MUSICS = new HashSet<MUSIC>();
        }

        [Key]
        public string IdAlbumMusic { get; set; }

        [Required]
        [StringLength(128)]
        public string IdMedia { get; set; }

        [StringLength(100)]
        public string AlbumMusicName { get; set; }

        public DateTime? CreatedTS { get; set; }

        public int? Quantity { get; set; }

        [StringLength(100)]
        public string ContentAlbumMusic { get; set; }

        public string Cover { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? UpdatedTS { get; set; }

        public byte? Status { get; set; }

        public virtual USERMEDIA USERMEDIA { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MUSIC> MUSICS { get; set; }
    }
}
