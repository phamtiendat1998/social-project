namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("STORYSEEN")]
    public partial class STORYSEEN
    {
        [Key]
        [Column(Order = 0)]
        public string IdStory { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUser { get; set; }

        public virtual USERSTORIES USERSTORIES { get; set; }
    }
}
