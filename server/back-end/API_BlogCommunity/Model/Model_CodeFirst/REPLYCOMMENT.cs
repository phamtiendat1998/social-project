namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("REPLYCOMMENT")]
    public partial class REPLYCOMMENT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public REPLYCOMMENT()
        {
            LIKEREPLYCOMMENTs = new HashSet<LIKEREPLYCOMMENT>();
        }

        [Key]
        public string IdReply { get; set; }

        [StringLength(128)]
        public string IdComment { get; set; }

        [StringLength(128)]
        public string IdUser { get; set; }

        public string Content { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? CreatedTS { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? UpdatedTS { get; set; }

        public string Images { get; set; }

        public virtual COMMENT COMMENT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKEREPLYCOMMENT> LIKEREPLYCOMMENTs { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
