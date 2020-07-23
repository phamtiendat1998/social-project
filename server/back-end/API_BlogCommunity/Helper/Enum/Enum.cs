using System.ComponentModel.DataAnnotations;

namespace Helper.Enum
{
    public enum StatusSocial : byte
    {
        Public = 1,

        Private = 2,

        ForFriends = 4,

        ForFollower = 8,

        ForAnonymous = 16,

        ForExclude = 32,
    }

    public enum TypeUser : byte
    {
        Friend = 1,

        Follower = 2,

        Anonymous = 3,

        Exclude = 4,
    }

    public enum TypeMedia : byte
    {
        Music = 1,

        Video = 2,

        Image = 3
    }

    public enum UsersExclude : byte
    {
        ExcludeSuggest = 1,

        Block = 2
    }

    public enum NameAlbum
    {
        Cover,
        Avatar,
        Uploaded,
    }

    public enum CategoryNewsFeed
    {
        Status = 1,

        Sport = 2,

        Music = 3,

        Life = 4,

        Movie = 5,

        Food = 7,

        Travel = 8,

        Traditional = 9,

        New = 10,

        Sale = 11,

        Shopping = 12,

        Studying = 13,

        Research = 14,

        World = 15,

        Trending = 16,

    }

    public enum Emotion : byte
    {
        Happy = 1,
        Angry = 2,
        Bored = 3,
        Crying = 4,
        Ill = 5,
        InLove = 6,
        Surprised = 7
    }

    public enum StatusAccount : byte
    {
        NonActive = 0,
        Actived = 1,
        Block = 2,
    }

    public enum ServiceReceiveOTP
    {
        PhoneNumber = 0,
        Email = 1
    }

    public enum GenderEnum : byte
    {
        Male = 1,
        Female = 0,
        Other = 2,
    }

    public enum StatusLogin : byte
    {
        Fail = 0,
        Actived = 1,
        NotActive = 2
    }

    public enum StatusLogic : short
    {
        [Display(Name = "Ẩn danh")]
        Anonymous = 0,
        [Display(Name = "Khách")]
        Guest = 1,
        [Display(Name = "Học viên")]
        Learner = 2,
        [Display(Name = "Giáo viên")]
        Tutor = 4,
        [Display(Name = "Học vụ")]
        Liaison = 8,
        [Display(Name = "Sale Manager")]
        SaleManager = 16,
        [Display(Name = "Content Manager")]
        ContentManager = 32,
        [Display(Name = "Quản trị viên")]
        Admin = 64,
        [Display(Name = "Ban Điều Hành")]
        SuperAdmin = 128,
        [Display(Name = "Sale")]
        Sale = 256,
        [Display(Name = "Sale Leader")]
        SaleLeader = 512,
        [Display(Name = "Content Editor")]
        Content = 1024,
        [Display(Name = "Scheduling")]
        Scheduling = 2048,
        [Display(Name = "Sub Sale Leader")]
        SubLeader = 4096,
        [Display(Name = "Data Center Member")]
        PreSale = 8192,
        [Display(Name = "Data Center Leader")]
        PreSaleLeader = 16384,

    }

}