namespace Model.Model_CodeFirst
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class BlogCommunityContext : DbContext
    {
        public BlogCommunityContext()
            : base("name=BlogCommunityContext")
        {
        }
        public virtual DbSet<WRAPPERSTORIES> WRAPPERSTORIES { get; set; }

        public virtual DbSet<ALBUMIMAGE> ALBUMIMAGES { get; set; }
        public virtual DbSet<ALBUMMUSIC> ALBUMMUSICs { get; set; }
        public virtual DbSet<ALBUMVIDEO> ALBUMVIDEOS { get; set; }
        public virtual DbSet<CATEGORY> CATEGORies { get; set; }
        public virtual DbSet<COMMENT> COMMENTs { get; set; }
        public virtual DbSet<FOLLOWS> FOLLOWS { get; set; }
        public virtual DbSet<FRIEND> FRIENDS { get; set; }
        public virtual DbSet<IMAGEPOST> IMAGEPOSTs { get; set; }
        public virtual DbSet<IMAGE> IMAGES { get; set; }
        public virtual DbSet<LIKECOMMENT> LIKECOMMENTs { get; set; }
        public virtual DbSet<LIKEPOST> LIKEPOSTs { get; set; }
        public virtual DbSet<LIKEREPLYCOMMENT> LIKEREPLYCOMMENTs { get; set; }
        public virtual DbSet<MUSICLISTEN> MUSICLISTENS { get; set; }
        public virtual DbSet<MUSIC> MUSICS { get; set; }
        public virtual DbSet<NEWFEEDPOST> NEWFEEDPOSTs { get; set; }
        public virtual DbSet<NOTIFYSETTING> NOTIFYSETTINGs { get; set; }
        public virtual DbSet<NOTIFYTYPE> NOTIFYTYPEs { get; set; }
        public virtual DbSet<REPLYCOMMENT> REPLYCOMMENTs { get; set; }
        public virtual DbSet<REQUESTFRIEND> REQUESTFRIENDS { get; set; }
        public virtual DbSet<STATUSSOCIAL> STATUSSOCIALs { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<USERACCOUNT> USERACCOUNTs { get; set; }
        public virtual DbSet<USERADDRESS> USERADDRESSes { get; set; }
        public virtual DbSet<USERCONTACT> USERCONTACTs { get; set; }
        public virtual DbSet<USERHASFOLLOW> USERHASFOLLOWs { get; set; }
        public virtual DbSet<USERHASNOTIFY> USERHASNOTIFies { get; set; }
        public virtual DbSet<USERINFO> USERINFOes { get; set; }
        public virtual DbSet<USERINTRO> USERINTROes { get; set; }
        public virtual DbSet<USERMEDIA> USERMEDIAs { get; set; }
        public virtual DbSet<USERRELATIONSHIP> USERRELATIONSHIPs { get; set; }
        public virtual DbSet<USERSEXCLUDE> USERSEXCLUDEs { get; set; }
        public virtual DbSet<USERTOKEN> USERTOKENs { get; set; }
        public virtual DbSet<VIDEO> VIDEOS { get; set; }
        public virtual DbSet<VIDEOVIEW> VIDEOVIEWS { get; set; }
        public virtual DbSet<USERSTORIES> USERSTORIES { get; set; }
        public virtual DbSet<STORYSEEN> STORYSEEN { get; set; }
        public virtual DbSet<INTROSTUDY> INTROSTUDies { get; set; }
        public virtual DbSet<INTROWORKING> INTROWORKINGs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ALBUMIMAGE>()
                .HasMany(e => e.IMAGES)
                .WithRequired(e => e.ALBUMIMAGE)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ALBUMMUSIC>()
                .HasMany(e => e.MUSICS)
                .WithRequired(e => e.ALBUMMUSIC)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ALBUMVIDEO>()
                .HasMany(e => e.VIDEOS)
                .WithRequired(e => e.ALBUMVIDEO)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CATEGORY>()
                .HasMany(e => e.NEWFEEDPOSTs)
                .WithRequired(e => e.CATEGORY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<COMMENT>()
                .HasMany(e => e.LIKECOMMENTs)
                .WithRequired(e => e.COMMENT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<MUSIC>()
                .Property(e => e.Time)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<MUSIC>()
                .HasMany(e => e.MUSICLISTENS)
                .WithRequired(e => e.MUSIC)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NEWFEEDPOST>()
                .HasMany(e => e.COMMENTs)
                .WithRequired(e => e.NEWFEEDPOST)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NEWFEEDPOST>()
                .HasMany(e => e.IMAGEPOSTs)
                .WithRequired(e => e.NEWFEEDPOST)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NEWFEEDPOST>()
                .HasMany(e => e.LIKEPOSTs)
                .WithRequired(e => e.NEWFEEDPOST)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<REPLYCOMMENT>()
                .HasMany(e => e.LIKEREPLYCOMMENTs)
                .WithRequired(e => e.REPLYCOMMENT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<STATUSSOCIAL>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.ALBUMIMAGES)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.ALBUMMUSICs)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.ALBUMVIDEOS)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.IMAGES)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.MUSICS)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.NEWFEEDPOSTs)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.USERADDRESSes)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.USERINFOes)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.USERINTROes)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<STATUSSOCIAL>()
                .HasMany(e => e.VIDEOS)
                .WithOptional(e => e.STATUSSOCIAL)
                .HasForeignKey(e => e.Status);

            modelBuilder.Entity<USERACCOUNT>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.COMMENTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.FOLLOWS)
                .WithRequired(e => e.USERACCOUNT)
                .HasForeignKey(e => e.IdUser)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.FRIENDS)
                .WithRequired(e => e.USERACCOUNT)
                .HasForeignKey(e => e.IdUser)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.LIKECOMMENTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.LIKEPOSTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.LIKEREPLYCOMMENTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.NEWFEEDPOSTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.REQUESTFRIENDS)
                .WithRequired(e => e.USERACCOUNT)
                .HasForeignKey(e => e.IdUser)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERHASFOLLOWs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERSEXCLUDEs)
                .WithRequired(e => e.USERACCOUNT)
                .HasForeignKey(e => e.IdUser)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERSEXCLUDEs1)
                .WithRequired(e => e.USERACCOUNT1)
                .HasForeignKey(e => e.IdUserExclude)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERADDRESSes)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERCONTACTs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERINFOes)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERINTROes)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERMEDIAs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERACCOUNT>()
                .HasMany(e => e.USERTOKENs)
                .WithRequired(e => e.USERACCOUNT)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERCONTACT>()
                .Property(e => e.PhoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<USERINFO>()
                .HasMany(e => e.USERRELATIONSHIPs)
                .WithRequired(e => e.USERINFO)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERMEDIA>()
                .HasMany(e => e.ALBUMIMAGES)
                .WithRequired(e => e.USERMEDIA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERMEDIA>()
                .HasMany(e => e.ALBUMMUSICs)
                .WithRequired(e => e.USERMEDIA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<USERMEDIA>()
                .HasMany(e => e.ALBUMVIDEOS)
                .WithRequired(e => e.USERMEDIA)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<VIDEO>()
                .Property(e => e.Time)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<VIDEO>()
                .HasMany(e => e.VIDEOVIEWS)
                .WithRequired(e => e.VIDEO)
                .WillCascadeOnDelete(false);
        }
    }
}
