using COMMON;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Helper.Helper.Common
{
    public class GoogleDriveFilesRepository
    {
        public static string[] Scopes = { DriveService.Scope.Drive };
        public static DriveService GetService()
        {
            UserCredential credential = null;
            try
            {
                using (var stream = new FileStream(Drive.SecretJsonFilePath, FileMode.Open, FileAccess.Read))
                {

                    String FilePath = Drive.CredPath;

                    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                        GoogleClientSecrets.Load(stream).Secrets,
                        Scopes,
                        "user",
                        CancellationToken.None,
                        new FileDataStore(FilePath, true)).Result;
                }
            }
            catch (Exception ex) { }
           

            //Create Drive API service.
            DriveService service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "SeeMedia",
            });

            return service;
        }

        public static string FileUpload(FileUploadData file)
        {
            try
            {
                if (file != null)
                {
                    DriveService service = GetService();
                    var FileMetaData = new Google.Apis.Drive.v3.Data.File();
                    FileMetaData.Name = file.Name;
                    FileMetaData.Parents = file.Parents;
                    FilesResource.CreateMediaUpload request;
                    using (var stream = new MemoryStream(file.Contents))
                    {
                        request = service.Files.Create(FileMetaData, stream, file.ContentType);
                        request.Fields = "*";
                        request.Upload();
                    }
                    var resFile = request.ResponseBody;
                    return resFile.Id;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public static bool FileUpdate(FileUploadData fileData)
        {
            try
            {
                DriveService service = GetService();
                Google.Apis.Drive.v3.Data.File file = service.Files.Get(fileData.FileId).Execute();
                var FileMetaData = new Google.Apis.Drive.v3.Data.File();
                FileMetaData.Name = file.Name;
                // File's new metadata.
                MemoryStream stream = new System.IO.MemoryStream(fileData.Contents);
                // Send the request to the API.
                FilesResource.UpdateMediaUpload request = service.Files.Update(FileMetaData, fileData.FileId, stream, fileData.ContentType);
                request.Upload();
                var updatedFile = request.ResponseBody;
                if (updatedFile == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        public static bool DeleteGoogleDriveFile(string Id)
        {
            DriveService service = GetService();
            try
            {
                // Initial validation.
                if (service == null)
                    throw new ArgumentNullException("service");

                if (Id == null)
                    throw new ArgumentNullException(Id);

                // Make the request.
                service.Files.Delete(Id).ExecuteAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                //throw new Exception("Request Files.Delete failed.", ex);
            }
        }
        public static async Task<string> CreateNewFolderAsync(FileUploadData folder)
        {
            try
            {
                DriveService driveService = GetService();
                if (driveService == null)
                    throw new ArgumentNullException("service");

                var fileMetadata = new Google.Apis.Drive.v3.Data.File()
                {
                    Name = folder.Name,
                    MimeType = "application/vnd.google-apps.folder",
                    Parents = folder.Parents
                };
                var request = driveService.Files.Create(fileMetadata);
                request.Fields = "id";
                var file = await request.ExecuteAsync();
                return file.Id;
            }
            catch
            {
                return null;
            }

        }
        /// <summary>
        /// Check google file by name
        /// </summary>
        /// <param name="data"></param>
        /// <returns>Return file Id if file exist else return empty string</returns>

        public static async Task<string> CheckExistFileByNameAsync(FileUploadData data)
        {
            try
            {
                DriveService driveService = GetService();
                if (driveService == null)
                    throw new ArgumentNullException("service");

                FilesResource.ListRequest listRequest = driveService.Files.List();
                listRequest.Q = $"mimeType = '{data.MimeType}' and name='{data.Name}' and trashed=false";
                listRequest.Fields = "nextPageToken, files(id, name,parents,mimeType)";
                var files = await listRequest.ExecuteAsync();
                foreach (var file in files.Files)
                {
                    foreach (var parent in data.Parents)
                    {
                        foreach (var fileParent in file.Parents)
                        {
                            if (parent.Equals(fileParent))
                            {
                                return file.Id;
                            }
                        }
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public class FileUploadData
    {
        public string FileId { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public Stream StreamData { get; set; }
        public byte[] Contents { get; set; }
        public List<string> Parents { get; set; }
        public string MimeType { get; set; }

        public FileUploadData()
        {

        }

        public FileUploadData(byte[] Contents, string ContentType,
            string FileId = "", string Name = "", List<string> Parents = null, string MimeType = "")
        {
            this.Contents = Contents;
            this.ContentType = ContentType;
            this.FileId = FileId;
            this.MimeType = MimeType;
            this.Parents = Parents;
            this.Name = Name;
        }

    }
}
