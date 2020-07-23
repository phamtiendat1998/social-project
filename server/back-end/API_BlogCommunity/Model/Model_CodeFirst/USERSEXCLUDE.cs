namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERSEXCLUDE")]
    public partial class USERSEXCLUDE
    {
        [Key]
        [Column(Order = 0)]
        public string IdUser { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUserExclude { get; set; }

        public byte? Status { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }

        public virtual USERACCOUNT USERACCOUNT1 { get; set; }
    }
}
