namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NOTIFYTYPE")]
    public partial class NOTIFYTYPE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NOTIFYTYPE()
        {
            USERHASNOTIFies = new HashSet<USERHASNOTIFY>();
        }

        [Key]
        public int IdNotifyType { get; set; }

        public string Discription { get; set; }

        public byte? Value { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERHASNOTIFY> USERHASNOTIFies { get; set; }
    }
}
