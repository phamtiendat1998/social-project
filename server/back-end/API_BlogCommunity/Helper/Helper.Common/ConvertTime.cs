using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Helper.Helper.Common
{
    public static class ConvertTime
    {
        public static string ConvertSecondToTime(long seconds)
        {
            return string.Format("{0:00}:{1:00}:{2:00}", seconds / 3600, (seconds / 60) % 60, seconds % 60);
        }
    }
}