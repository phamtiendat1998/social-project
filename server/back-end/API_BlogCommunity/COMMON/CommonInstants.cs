using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace COMMON
{
    public class CommonInstants
    {
        public static string ID_USER_COOKIE { get; set; }

        public static string ParentComment = ConfigurationManager.AppSettings["Comment"];

        public static string PrefixGG = ConfigurationManager.AppSettings["GoogleDriveFullImagePrefix"];

        public static string FolderInDrive = ConfigurationManager.AppSettings["ImagesStatusFolderId"];

        public static string ParentImage = ConfigurationManager.AppSettings["Images"];

        public static string ParentVideo = ConfigurationManager.AppSettings["Videos"];

        public static string ParentMusic = ConfigurationManager.AppSettings["Musics"];
    }

    public static class Drive
    {
        public static string SecretJsonFilePath = HttpContext.Current.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["SecretFilePathGoogleDrive"]);
        public static string CredPath = HttpContext.Current.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["ServiceTokenFilePathGoogleDrive"]);
    }
}