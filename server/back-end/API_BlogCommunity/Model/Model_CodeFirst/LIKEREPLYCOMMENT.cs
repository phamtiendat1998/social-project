namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LIKEREPLYCOMMENT")]
    public partial class LIKEREPLYCOMMENT
    {
        [Key]
        [Column(Order = 0)]
        public string IdReply { get; set; }

        [Key]
        [Column(Order = 1)]
        public string IdUser { get; set; }

        public byte? Status { get; set; }

        public virtual REPLYCOMMENT REPLYCOMMENT { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
