namespace Model.Model_CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("USERACCOUNT")]
    public partial class USERACCOUNT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USERACCOUNT()
        {
            COMMENTs = new HashSet<COMMENT>();
            FOLLOWS = new HashSet<FOLLOWS>();
            FRIENDS = new HashSet<FRIEND>();
            LIKECOMMENTs = new HashSet<LIKECOMMENT>();
            LIKEPOSTs = new HashSet<LIKEPOST>();
            LIKEREPLYCOMMENTs = new HashSet<LIKEREPLYCOMMENT>();
            NEWFEEDPOSTs = new HashSet<NEWFEEDPOST>();
            REPLYCOMMENTs = new HashSet<REPLYCOMMENT>();
            REQUESTFRIENDS = new HashSet<REQUESTFRIEND>();
            USERHASFOLLOWs = new HashSet<USERHASFOLLOW>();
            USERSEXCLUDEs = new HashSet<USERSEXCLUDE>();
            USERSEXCLUDEs1 = new HashSet<USERSEXCLUDE>();
            USERADDRESSes = new HashSet<USERADDRESS>();
            USERCONTACTs = new HashSet<USERCONTACT>();
            USERINFOes = new HashSet<USERINFO>();
            USERINTROes = new HashSet<USERINTRO>();
            USERMEDIAs = new HashSet<USERMEDIA>();
            USERTOKENs = new HashSet<USERTOKEN>();
        }

        [Key]
        public string IdUser { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastUpdatedTS { get; set; }

        public DateTime CreatedTS { get; set; }

        public byte? StatusAccount { get; set; }

        [StringLength(256)]
        public string Email { get; set; }

        public bool? EmailConfirmed { get; set; }

        [StringLength(50)]
        public string PhoneNumber { get; set; }

        public bool? PhoneNumberConfirmed { get; set; }

        public bool? TwoFactorEnabled { get; set; }

        public int? AccessFailedCount { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMMENT> COMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FOLLOWS> FOLLOWS { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FRIEND> FRIENDS { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKECOMMENT> LIKECOMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKEPOST> LIKEPOSTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LIKEREPLYCOMMENT> LIKEREPLYCOMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NEWFEEDPOST> NEWFEEDPOSTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<REPLYCOMMENT> REPLYCOMMENTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<REQUESTFRIEND> REQUESTFRIENDS { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERHASFOLLOW> USERHASFOLLOWs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERSEXCLUDE> USERSEXCLUDEs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERSEXCLUDE> USERSEXCLUDEs1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERADDRESS> USERADDRESSes { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERCONTACT> USERCONTACTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERINFO> USERINFOes { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERINTRO> USERINTROes { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERMEDIA> USERMEDIAs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USERTOKEN> USERTOKENs { get; set; }
    }
}
