namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERINTRO")]
    public partial class USERINTRO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USERINTRO()
        {
            INTROWORKINGs = new HashSet<INTROWORKING>();
            INTROSTUDYs = new HashSet<INTROSTUDY>();
        }
        [Key]
        public string IdUserIntro { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        public string IntroContent { get; set; }

        public string Hobby { get; set; }

        public byte? Status { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<INTROWORKING> INTROWORKINGs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<INTROSTUDY> INTROSTUDYs { get; set; }
    }
}
