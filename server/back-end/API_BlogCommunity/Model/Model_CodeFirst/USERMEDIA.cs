namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERMEDIA")]
    public partial class USERMEDIA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USERMEDIA()
        {
            ALBUMIMAGES = new HashSet<ALBUMIMAGE>();
            ALBUMMUSICs = new HashSet<ALBUMMUSIC>();
            ALBUMVIDEOS = new HashSet<ALBUMVIDEO>();
        }

        [Key]
        public string IdMedia { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ALBUMIMAGE> ALBUMIMAGES { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ALBUMMUSIC> ALBUMMUSICs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ALBUMVIDEO> ALBUMVIDEOS { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
