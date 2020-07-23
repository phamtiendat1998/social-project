namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERTOKEN")]
    public partial class USERTOKEN
    {
        [Key]
        public string IdToken { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        [Required]
        public string ContentToken { get; set; }

        public DateTime? CreatedTS { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
