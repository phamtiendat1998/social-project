namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class WRAPPERSTORIES
    {
        [Key]
        public string IdStory { get; set; }

        public string IdUser { get; set; }

        public string Content { get; set; }

        public byte TypeContent { get; set; }

        public DateTime CreatedTS { get; set; }

        public string IdInfo { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [StringLength(256)]
        public string Avatar { get; set; }

        [StringLength(256)]
        public string Cover { get; set; }

        public byte? Status { get; set; }
    }
}
