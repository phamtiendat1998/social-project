namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("COMMENT")]
    public partial class COMMENT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public COMMENT()
        {
            REPLYCOMMENTs = new HashSet<REPLYCOMMENT>();
            LIKECOMMENTs = new HashSet<LIKECOMMENT>();
        }

        [Key]
        public string IdComment { get; set; }

        [Required]
        [StringLength(128)]
        public string IdPost { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        public string Content { get; set; }

        public DateTime? CreatedTS { get; set; }

        public DateTime? UpdatedTS { get; set; }

        public string Images { get; set; }

        public virtual NEWFEEDPOST NEWFEEDPOST { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<REPLYCOMMENT> REPLYCOMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKECOMMENT> LIKECOMMENTs { get; set; }
    }
}
