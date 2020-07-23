using System;

namespace Helper.TempModel
{
    public class UserInfo
    {
        public string IdInfo { get; set; } = Guid.NewGuid().ToString();

        public string IdUser { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool? Gender { get; set; }

        public string Avatar { get; set; }

        public string Cover { get; set; }

        public string Content { get; set; }

        public byte StatusSocial { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? LastUpdatedTS { get; set; }

        public DateTime CreatedTS { get; set; } = DateTime.UtcNow;

        public UserRelationship Relationship { get; set; }

        public UserContact Contact { get; set; }

    }
}