using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Common
{
    public static class UtcNow
    {
        public static DateTime Utc()
        {
            return DateTime.UtcNow;
        }
    }
}