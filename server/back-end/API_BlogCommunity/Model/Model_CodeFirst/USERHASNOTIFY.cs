namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERHASNOTIFY")]
    public partial class USERHASNOTIFY
    {
        [Key]
        public string IdNotify { get; set; }

        public int? IdNotifyType { get; set; }

        public DateTime? SeenTime { get; set; }

        public DateTime? CreatedTS { get; set; }

        [StringLength(200)]
        public string Content { get; set; }

        [StringLength(128)]
        public string IdPost { get; set; }

        public int? IdNotifySetting { get; set; }

        public virtual NEWFEEDPOST NEWFEEDPOST { get; set; }

        public virtual NOTIFYSETTING NOTIFYSETTING { get; set; }

        public virtual NOTIFYTYPE NOTIFYTYPE { get; set; }
    }
}
