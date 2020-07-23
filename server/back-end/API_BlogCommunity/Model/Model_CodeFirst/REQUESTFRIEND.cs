namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("REQUESTFRIENDS")]
    public partial class REQUESTFRIEND
    {
        [Key]
        [Column(Order = 0)]
        public string IdUser { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUserRequest { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? CreateTS { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
