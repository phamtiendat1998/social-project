namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERCONTACT")]
    public partial class USERCONTACT
    {
        [Key]
        public string IdUserContact { get; set; }

        [Required]
        [StringLength(128)]
        public string IdUser { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public virtual USERACCOUNT USERACCOUNT { get; set; }
    }
}
