namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("INTROWORKING")]
    public partial class INTROWORKING
    {
        [Key]
        public string IdWorking { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUserIntro { get; set; }

        [StringLength(128)]
        public string WorkingAt { get; set; }

        [StringLength(4)]
        public string WorkFrom { get; set; }

        [StringLength(4)]
        public string WorkTo { get; set; }

        public byte IDStatusSocial { get; set; }

        public virtual USERINTRO USERACCOUNT { get; set; }
    }
}
