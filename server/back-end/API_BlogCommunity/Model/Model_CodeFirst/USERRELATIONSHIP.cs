namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERRELATIONSHIP")]
    public partial class USERRELATIONSHIP
    {
        [Key]
        public string IdUserRelationship { get; set; }

        [Required]
        [StringLength(128)]
        public string IdInfo { get; set; }

        public byte? StatusRelationship { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; }

        public virtual USERINFO USERINFO { get; set; }
    }
}
