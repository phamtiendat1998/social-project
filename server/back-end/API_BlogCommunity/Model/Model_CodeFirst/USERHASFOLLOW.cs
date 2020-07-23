namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERHASFOLLOW")]
    public partial class USERHASFOLLOW
    {
        [Key]
        [Column(Order = 0)]
        public string IdFollow { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUser { get; set; }

        public DateTime? CreateTS { get; set; }

        public byte? Stutus { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
