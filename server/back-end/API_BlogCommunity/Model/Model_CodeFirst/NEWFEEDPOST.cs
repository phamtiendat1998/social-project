namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NEWFEEDPOST")]
    public partial class NEWFEEDPOST
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NEWFEEDPOST()
        {
            COMMENTs = new HashSet<COMMENT>();
            IMAGEPOSTs = new HashSet<IMAGEPOST>();
            LIKEPOSTs = new HashSet<LIKEPOST>();
            USERHASNOTIFies = new HashSet<USERHASNOTIFY>();
        }

        [Key]
        public string IdPost { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        public int IdCategory { get; set; }

        public string Content { get; set; }

        public DateTime? CreatedTS { get; set; }

        public DateTime? UploadedTS { get; set; }

        [StringLength(200)]
        public string Location { get; set; }

        public DateTime? TimeStampSort { get; set; }

        public string Images { get; set; }

        public byte? Emotion { get; set; }

        [StringLength(128)]
        public string SharePost { get; set; }

        public byte? Status { get; set; }

        public virtual CATEGORY CATEGORY { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMMENT> COMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IMAGEPOST> IMAGEPOSTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKEPOST> LIKEPOSTs { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERHASNOTIFY> USERHASNOTIFies { get; set; }
    }
}
