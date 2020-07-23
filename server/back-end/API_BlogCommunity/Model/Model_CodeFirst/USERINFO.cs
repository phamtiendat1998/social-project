namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERINFO")]
    public partial class USERINFO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USERINFO()
        {
            USERRELATIONSHIPs = new HashSet<USERRELATIONSHIP>();
        }

        [Key]
        public string IdInfo { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        public bool? Gender { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastUpdatedTS { get; set; }

        public DateTime CreatedTS { get; set; }

        [StringLength(256)]
        public string Avatar { get; set; }

        [StringLength(256)]
        public string Cover { get; set; }

        public byte? Status { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERRELATIONSHIP> USERRELATIONSHIPs { get; set; }
    }
}
