using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.TempModel
{
    public class UserRelationship
    {
        public string IdRelationship { get; set; }

        public string IdInfo { get; set; }

        public byte? Status { get; set; }

        public DateTime? CreatedTs { get; set; }
    }
}