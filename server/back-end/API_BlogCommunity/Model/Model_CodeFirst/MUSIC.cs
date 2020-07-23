namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MUSICS")]
    public partial class MUSIC
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MUSIC()
        {
            MUSICLISTENS = new HashSet<MUSICLISTEN>();
        }

        [Key]
        public string IdMusic { get; set; }

        [Required]
        [StringLength(128)]
        public string IdAlbumMusic { get; set; }

        public string ContentMusic { get; set; }

        public string LinkUrl { get; set; }

        public DateTime? CreatedTS { get; set; }

        public DateTime? UpdatedTS { get; set; }

        [StringLength(256)]
        public string MusicName { get; set; }

        [StringLength(100)]
        public string Singer { get; set; }

        public string Cover { get; set; }

        [StringLength(20)]
        public string Time { get; set; }

        public byte? Status { get; set; }

        public virtual ALBUMMUSIC ALBUMMUSIC { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MUSICLISTEN> MUSICLISTENS { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }
    }
}
