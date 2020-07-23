using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Helper.Helper.Common
{
    public static class UploadFile
    {
        static string PrefixGG = ConfigurationManager.AppSettings["GoogleDriveFullImagePrefix"];

        private static byte[] FromBase64String(string base64)
        {
            return Convert.FromBase64String(base64);
        }

        public static void DeleteImageDrive(List<string> source = null, string fileId = null)
        {
            if (source != null && source.Any() && fileId == null)
            {
                foreach (var item in source)
                {
                    GoogleDriveFilesRepository.DeleteGoogleDriveFile(item);
                }
            }

            if (!string.IsNullOrEmpty(fileId) && source == null)
            {
                GoogleDriveFilesRepository.DeleteGoogleDriveFile(fileId);
            }
        }


        public static FileUploadData FileUpdateDataForCreate(string userId, string Contents, List<string> Parents, string ContentType = "image/png")
        {
            return new FileUploadData
            {
                Contents = !string.IsNullOrEmpty(Contents) ? FromBase64String(Contents) : null,
                ContentType = ContentType,
                Name = $"{userId}+/+{Guid.NewGuid()}",
                Parents = Parents,
            };
        }

        public static FileUploadData FileUploadDataForUpdate(string FileId, string ContentType, string Name, string Content = "image/png")
        {
            return new FileUploadData
            {
                FileId = FileId,
                ContentType = ContentType,
                Name = Name,
                Contents = FromBase64String(Content)
            };
        }

        public static List<string> UploadFileToDrive(List<string> listImageBase64, string IdUser, string idFolerInDrive, string MIME = "image/png")
        {
            List<string> listImage = new List<string>();

            try
            {
                if (listImageBase64 != null)
                {
                    foreach (var image in listImageBase64)
                    {
                        var data = FileUpdateDataForCreate(IdUser, image, new List<string> { idFolerInDrive }, MIME);

                        if (data.Contents != null)
                        {
                            listImage.Add(GoogleDriveFilesRepository.FileUpload(data));
                        }
                    }
                }
            }
            catch { }

            return listImage;
        }

        public static List<string> UploadMediaToDrive(string fileBase64, string IdUser, string idFolerInDrive, string MIME = "image/png")
        {
            List<string> listImage = new List<string>();

            try
            {
                var data = FileUpdateDataForCreate(IdUser, fileBase64, new List<string> { idFolerInDrive }, MIME);
                if (data.Contents != null)
                {
                    listImage.Add(GoogleDriveFilesRepository.FileUpload(data));
                }
            }
            catch { }

            return listImage;
        }

        public static List<string> ConCatLinkDirve(List<string> idUrl)
        {
            List<string> listImage = null;

            if (idUrl.Any() && idUrl.Count() > 0)
            {
                listImage = new List<string>();

                foreach (var item in idUrl)
                {
                    listImage.Add($"{PrefixGG}{item}");
                }
            }

            return listImage;
        }

        public static List<string> ConCatImageString(string jsonImage)
        {
            List<string> listImage = null;

            if (!string.IsNullOrEmpty(jsonImage) && (jsonImage.StartsWith("{") && jsonImage.EndsWith("}") || (jsonImage.StartsWith("[") && jsonImage.EndsWith("]"))))
            {
                listImage = new List<string>();

                foreach (var item in JsonConvert.DeserializeObject<List<string>>(jsonImage))
                {
                    listImage.Add($"{PrefixGG}{item}");
                }
            }
            else if (!string.IsNullOrEmpty(jsonImage))
            {
                listImage = new List<string>();

                listImage.Add($"{PrefixGG}{jsonImage}");
            }

            return listImage;
        }
    }
}