namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VIDEOVIEWS")]
    public partial class VIDEOVIEW
    {
        [Key]
        [Column(Order = 0)]
        public string IdVideo { get; set; }

        [Key]
        [Column(Order = 1, TypeName = "datetime2")]
        public DateTime CreatedTS { get; set; }

        public virtual VIDEO VIDEO { get; set; }
    }
}
