namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERADDRESS")]
    public partial class USERADDRESS
    {
        [Key]
        public string IdUserAddress { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        [StringLength(50)]
        public string City { get; set; }

        [StringLength(50)]
        public string Province { get; set; }

        public string DetailAddress { get; set; }

        [StringLength(50)]
        public string Country { get; set; }

        public byte? Status { get; set; }

        [StringLength(4)]
        public string LiveFrom { get; set; }

        [StringLength(4)]
        public string LiveTo { get; set; }

        public virtual STATUSSOCIAL STATUSSOCIAL { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
