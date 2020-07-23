namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("INTROSTUDY")]
    public partial class INTROSTUDY
    {
        [Key]
        public string IdStudy { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUserIntro { get; set; }

        [StringLength(128)]
        public string Studying { get; set; }

        [StringLength(4)]
        public string StudyFrom { get; set; }

        [StringLength(4)]
        public string StudyTo { get; set; }

        public byte IDStatusSocial { get; set; }

        public virtual USERINTRO USERINTRO { get; set; }
    }
}
