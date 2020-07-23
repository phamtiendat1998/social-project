namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MUSICLISTENS")]
    public partial class MUSICLISTEN
    {
        [Key]
        [Column(Order = 0)]
        public string IdMusic { get; set; }

        [Key]
        [Column(Order = 1, TypeName = "datetime2")]
        public DateTime CreatedTS { get; set; }

        public virtual MUSIC MUSIC { get; set; }
    }
}
