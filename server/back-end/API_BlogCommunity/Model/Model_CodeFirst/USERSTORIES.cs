namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERSTORIES")]
    public partial class USERSTORIES
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USERSTORIES()
        {
            STORYSEEN = new HashSet<STORYSEEN>();
        }

        [Key]
        public string IdStory { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public byte TypeContent { get; set; }

        [Required]
        public DateTime CreatedTS { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<STORYSEEN> STORYSEEN { get; set; }


        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
