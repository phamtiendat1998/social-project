namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NOTIFYSETTING")]
    public partial class NOTIFYSETTING
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NOTIFYSETTING()
        {
            USERHASNOTIFies = new HashSet<USERHASNOTIFY>();
        }

        [Key]
        public int IdNotifySetting { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public string Descriptions { get; set; }

        public byte? StatusNotify { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERHASNOTIFY> USERHASNOTIFies { get; set; }
    }
}
