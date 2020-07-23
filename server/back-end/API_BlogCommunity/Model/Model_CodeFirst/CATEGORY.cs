namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CATEGORY")]
    public partial class CATEGORY
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CATEGORY()
        {
            NEWFEEDPOSTs = new HashSet<NEWFEEDPOST>();
        }

        [Key]
        public int IdCategory { get; set; }

        [StringLength(100)]
        public string NameCategory { get; set; }

        public string IntroCategory { get; set; }

        public string CoverCategoryUrl { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWFEEDPOST> NEWFEEDPOSTs { get; set; }
    }
}
