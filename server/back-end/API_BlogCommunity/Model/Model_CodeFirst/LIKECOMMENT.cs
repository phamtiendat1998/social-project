namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LIKECOMMENT")]
    public partial class LIKECOMMENT
    {
        [Key]
        [Column(Order = 0)]
        public string IdComment { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUser { get; set; }

        public byte? Status { get; set; }

        public virtual COMMENT COMMENT { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
