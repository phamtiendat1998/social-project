using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Common
{
    public static class GUID
    {
        public static string UUID()
        {
            return Guid.NewGuid().ToString();
        }
    }
}