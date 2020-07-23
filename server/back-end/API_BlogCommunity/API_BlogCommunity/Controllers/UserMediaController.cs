using COMMON;
using DAL.Common;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.TempModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API_BlogCommunity.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UserMediaController : BaseApiController
    {
        DAL.Controllers.UserMediaController dc = new DAL.Controllers.UserMediaController();

        [Route("api/usermedia/createalbummusic")]
        [HttpPost]
        public JsonResult CreateAlbumMusic([FromBody]AlbumMusics album)
        {
            var idAlbum = string.Empty;

            if (!String.IsNullOrEmpty(album.IdUser))
            {
                if (!String.IsNullOrEmpty(album.Base64String))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(album.Base64String);
                    var cover = UploadFile.UploadFileToDrive(listBase64Image, album.IdUser, CommonInstants.ParentMusic);
                    album.Cover = JsonConvert.SerializeObject(cover);
                }

                idAlbum = dc.CreateAlbumMusic(album);
            }

            return new JsonResult { Data = idAlbum };
        }

        [Route("api/usermedia/createalbumvideo")]
        [HttpPost]
        public JsonResult CreateAlbumVideo([FromBody]AlbumVideos album)
        {
            var idAlbum = string.Empty;

            if (!String.IsNullOrEmpty(album.IdUser))
            {
                if (!String.IsNullOrEmpty(album.Base64String))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(album.Base64String);
                    var cover = UploadFile.UploadFileToDrive(listBase64Image, album.IdUser, CommonInstants.ParentMusic);
                    album.Cover = JsonConvert.SerializeObject(cover);
                }

                idAlbum = dc.CreateAlbumVideo(album);
            }

            return new JsonResult { Data = idAlbum };
        }

        [Route("api/usermedia/createalbumimage")]
        [HttpPost]
        public JsonResult CreateAlbumImage([FromBody]AlbumImages album)
        {
            var result = new JsonResult { Data = "Created Album failed" };
            var idAlbum = string.Empty;

            if (!String.IsNullOrEmpty(album.IdUser))
            {
                idAlbum = dc.CreateAlbumImage(album);
            }

            return new JsonResult { Data = idAlbum };
        }

        [Route("api/usermedia/isavailablesalbummusicname")]
        [HttpPost]
        public JsonResult IsAvailableAlbumMusicName([FromBody]AlbumImages album)
        {
            if (!(string.IsNullOrEmpty(album.IdUser) && string.IsNullOrEmpty(album.AlbumName)))
                return dc.IsHasAlbumMusicName(album.IdUser, album.AlbumName) ? new JsonResult { Data = "match" } : new JsonResult { Data = "not match" };
            return new JsonResult { Data = "enter data" };
        }

        [Route("api/usermedia/isavailablesalbumvideoname")]
        [HttpPost]
        public JsonResult IsAvailableAlbumVideoName([FromBody]AlbumImages album)
        {
            if (!(string.IsNullOrEmpty(album.IdUser) && string.IsNullOrEmpty(album.AlbumName)))
                return dc.IsHasAlbumVideoName(album.IdUser, album.AlbumName) ? new JsonResult { Data = "match" } : new JsonResult { Data = "not match" };
            return new JsonResult { Data = "enter data" };
        }

        [Route("api/usermedia/isavailablesalbumimagename")]
        [HttpPost]
        public JsonResult IsAvailableAlbumImageName([FromBody]AlbumImages album)
        {
            if (!(string.IsNullOrEmpty(album.IdUser) && string.IsNullOrEmpty(album.AlbumName)))
                return dc.IsHasAlbumImageName(album.IdUser, album.AlbumName) ? new JsonResult { Data = "match" } : new JsonResult { Data = "not match" };
            return new JsonResult { Data = "enter data" };
        }

        [Route("api/usermedia/deletealbumimage")]
        [HttpPost]
        public JsonResult DeleteAlbumImage([FromBody]AlbumImages album)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(album.IdUser) && !String.IsNullOrEmpty(album.IdAlbumImage))
            {
                isDeleted = dc.DeleteAlbumImage(album.IdAlbumImage, album.IdUser) ?
                    new JsonResult { Data = "Deleted album" } : new JsonResult { Data = "Delete failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/deletealbumvideo")]
        [HttpPost]
        public JsonResult DeleteAlbumVideo([FromBody]AlbumVideos album)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(album.IdUser) && !String.IsNullOrEmpty(album.IdAlbumVideo))
            {
                isDeleted = dc.DeleteAlbumVideo(album.IdAlbumVideo, album.IdUser) ?
                    new JsonResult { Data = "Deleted album" } : new JsonResult { Data = "Delete failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/deletealbummusic")]
        [HttpPost]
        public JsonResult DeleteAlbumMusic([FromBody]AlbumMusics album)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(album.IdUser) && !String.IsNullOrEmpty(album.IdAlbumMusic))
            {
                isDeleted = dc.DeleteAlbumMusic(album.IdAlbumMusic, album.IdUser) ?
                    new JsonResult { Data = "Deleted album" } : new JsonResult { Data = "Delete failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/deletemultifile")]
        [HttpPost]
        public JsonResult DeleteMultiFile([FromBody]MultiFile multi)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(multi.IdUser) && !String.IsNullOrEmpty(multi.IdUser) && multi.TypeMedia > 0)
            {
                isDeleted = dc.DeleteMultiFile(multi) ?
               new JsonResult { Data = "Deleted" } : new JsonResult { Data = "Delete failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/uploadimage")]
        [HttpPost]
        public JsonResult UploadImage([FromBody]Images image)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(image.IdUser) && !String.IsNullOrEmpty(image.Base64String))
            {
                var listBase64Image = JsonConvert.DeserializeObject<List<string>>(image.Base64String);
                image.ListLinkUrl = UploadFile.UploadFileToDrive(listBase64Image, image.IdUser, CommonInstants.ParentImage);
                image.Base64String = string.Empty;

                isDeleted = dc.UploadImage(image) ?
                    new JsonResult { Data = image.IdImage } : new JsonResult { Data = "Upload failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/uploadvideo")]
        [HttpPost]
        public JsonResult UploadVideo([FromBody]Videos video)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(video.IdUser) && !String.IsNullOrEmpty(video.Base64String))
            {
                if (!string.IsNullOrEmpty(video.Cover))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(video.Cover);
                    var Images = UploadFile.UploadFileToDrive(listBase64Image, video.IdUser, CommonInstants.ParentImage);
                    video.Cover = JsonConvert.SerializeObject(Images);
                }

                var Base64Video = JsonConvert.DeserializeObject<List<string>>(video.Base64String);
                var videos = UploadFile.UploadFileToDrive(Base64Video, video.IdUser, CommonInstants.ParentVideo, "video/mp4");
                video.LinkUrl = JsonConvert.SerializeObject(videos);

                video.Base64String = string.Empty;

                isDeleted = dc.UploadVideo(video) ?
                    new JsonResult { Data = video.IdVideo } : new JsonResult { Data = "Upload failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/uploadmusic")]
        [HttpPost]
        public JsonResult UploadMusic([FromBody]Musics music)
        {
            var isUploaded = new JsonResult { Data = "Enter data input" };

            if (music != null && !String.IsNullOrEmpty(music.IdUser) && !String.IsNullOrEmpty(music.Base64String))
            {
                if (!string.IsNullOrEmpty(music.Cover))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(music.Cover);
                    var Images = UploadFile.UploadFileToDrive(listBase64Image, music.IdUser, CommonInstants.ParentImage);
                    music.Cover = JsonConvert.SerializeObject(Images);
                }
                List<string> Base64Music = null;
                try
                {
                     Base64Music = JsonConvert.DeserializeObject<List<string>>(music.Base64String);
                }
                catch (Exception e) { }
               
                var musics = UploadFile.UploadFileToDrive(Base64Music, music.IdUser, CommonInstants.ParentMusic, "audio/mpeg");
                music.LinkUrl = JsonConvert.SerializeObject(musics);

                music.Base64String = string.Empty;

                if (dc.UploadMusic(music))
                {
                    isUploaded = new JsonResult { Data = new ResponseMusic { IdMusic = music.IdMusic, LinkUrl = $"{CommonInstants.PrefixGG}{musics?[0]}" } };
                }
                else
                {
                    isUploaded = new JsonResult { Data = "Upload failed" };
                }
            }

            return isUploaded;
        }

        [Route("api/usermedia/deleteitemmusic")]
        [HttpPost]
        public JsonResult DeleteItemMusic([FromBody]Musics music)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(music.IdMusic) && !String.IsNullOrEmpty(music.IdUser))
            {
                isDeleted = dc.DeleteMusic(music.IdMusic, music.IdUser) ?
                    new JsonResult { Data = "Deleted item music" } : new JsonResult { Data = "Delate failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/deleteitemimage")]
        [HttpPost]
        public JsonResult DeleteItemImage([FromBody]Images image)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(image.IdImage) && !String.IsNullOrEmpty(image.IdUser))
            {
                isDeleted = dc.DeleteImage(image.IdImage, image.IdUser) ?
                    new JsonResult { Data = "Deleted item image" } : new JsonResult { Data = "Delate failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/deleteitemvideo")]
        [HttpPost]
        public JsonResult DeleteItemVideo([FromBody]Videos video)
        {
            var isDeleted = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(video.IdVideo) && !String.IsNullOrEmpty(video.IdUser))
            {
                isDeleted = dc.DeleteImage(video.IdVideo, video.IdUser) ?
                    new JsonResult { Data = "Deleted item video" } : new JsonResult { Data = "Delate failed" };
            }

            return isDeleted;
        }

        [Route("api/usermedia/getalbumimages")]
        [HttpGet]
        public JsonResult GetAlbumImages(string idUser)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Musics"))
                {
                    foreach (var item in header.GetValues("Paging-Musics"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetAlbumImages(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/usermedia/getalbummusics")]
        [HttpGet]
        public JsonResult GetAlbumMusics(string idUser)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Musics"))
                {
                    foreach (var item in header.GetValues("Paging-Musics"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetAlbumMusics(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/usermedia/getalbumvideos")]
        [HttpGet]
        public JsonResult GetAlbumVideos(string idUser)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "Enter data input" };

            if (!String.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Musics"))
                {
                    foreach (var item in header.GetValues("Paging-Musics"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetAlbumVideos(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/usermedia/getimages")]
        [HttpGet]
        public JsonResult GetImages(string idAlbum, string idUser = null)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "" };
            var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
            PagingMetaData pagingData = null;

            if (header.Contains("Paging-Images"))
            {
                foreach (var item in header.GetValues("Paging-Images"))
                {
                    pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                }
            }

            var data = dc.GetImages(idAlbum, PagingModel.AutomaticPaging(pagingData, pageSize), idUser);

            result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };


            return result;
        }

        [Route("api/usermedia/getallimages")]
        [HttpGet]
        public JsonResult GetAllImages(string idUser)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "enter input" };
            var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
            PagingMetaData pagingData = null;

            if (header.Contains("Paging-Images"))
            {
                foreach (var item in header.GetValues("Paging-Images"))
                {
                    pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                }
            }

            var data = dc.GetAllImages(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

            result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };

            return result;
        }


        [Route("api/usermedia/getvideos")]
        [HttpGet]
        public JsonResult GetVideos(string idAlbum, string idUser = null)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "enter input" };
            var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
            PagingMetaData pagingData = null;

            if (header.Contains("Paging-Videos"))
            {
                foreach (var item in header.GetValues("Paging-Videos"))
                {
                    pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                }
            }


            var data = dc.GetVideos(idAlbum, PagingModel.AutomaticPaging(pagingData, pageSize), idUser);

            result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };

            return result;
        }

        [Route("api/usermedia/getmusics")]
        [HttpGet]
        public JsonResult GetMusics(string idAlbum, string idUser = null)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "enter input" };
            var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
            PagingMetaData pagingData = null;

            if (header.Contains("Paging-Musics"))
            {
                foreach (var item in header.GetValues("Paging-Musics"))
                {
                    pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                }
            }

            var data = dc.GetMusics(idAlbum, PagingModel.AutomaticPaging(pagingData, pageSize), idUser);

            result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };

            return result;
        }

        [Route("api/usermedia/getdetailalbum")]
        [HttpGet]
        public JsonResult GetDetailAlbum(string idAlbum, TypeMedia type)
        {
            var result = new JsonResult { Data = "enter input" };
            if (!string.IsNullOrEmpty(idAlbum) && type > 0)
            {
                switch (type)
                {
                    case TypeMedia.Image:
                        result = new JsonResult { Data = dc.DetailAlbumImage(idAlbum) };
                        break;

                    case TypeMedia.Music:
                        result = new JsonResult { Data = dc.DetailAlbumMusic(idAlbum) };
                        break;

                    case TypeMedia.Video:
                        result = new JsonResult { Data = dc.DetailAlbumVideo(idAlbum) };
                        break;
                }
            }

            return result;
        }

        [Route("api/usermedia/updatealbummusic")]
        [HttpPost]
        public JsonResult UpdateAlbumMusic([FromBody]AlbumMusics album)
        {
            var result = new JsonResult { Data = "enter input" };

            if (!(string.IsNullOrEmpty(album.AlbumMusicName) && string.IsNullOrEmpty(album.IdAlbumMusic) && string.IsNullOrEmpty(album.IdUser)))
            {
                result = dc.UpdateAlbumMusic(album) ? new JsonResult { Data = "updated" } : new JsonResult { Data = "update failed" };
            }

            return result;
        }

        [Route("api/usermedia/updatealbumimage")]
        [HttpPost]
        public JsonResult UpdateAlbumImage([FromBody]AlbumImages album)
        {
            var result = new JsonResult { Data = "enter input" };

            if (!(string.IsNullOrEmpty(album.AlbumName) && string.IsNullOrEmpty(album.IdAlbumImage) && string.IsNullOrEmpty(album.IdUser)))
            {
                result = dc.UpdateAlbumImage(album) ? new JsonResult { Data = "updated" } : new JsonResult { Data = "update failed" };
            }

            return result;
        }

        [Route("api/usermedia/updatealbumvideo")]
        [HttpPost]
        public JsonResult UpdateAlbumVideo([FromBody]AlbumVideos album)
        {
            var result = new JsonResult { Data = "enter input" };

            if (!(string.IsNullOrEmpty(album.AlbumVideoName) && string.IsNullOrEmpty(album.IdAlbumVideo) && string.IsNullOrEmpty(album.IdUser)))
            {
                result = dc.UpdateAlbumVideo(album) ? new JsonResult { Data = "updated" } : new JsonResult { Data = "update failed" };
            }

            return result;
        }

        [Route("api/usermedia/quantitymedia")]
        [HttpGet]
        public JsonResult QuantityMedia(string idUser, TypeMedia type)
        {
            var result = new JsonResult { Data = "enter input" };

            if (!string.IsNullOrEmpty(idUser) && type > 0)
            {
                result = new JsonResult { Data = dc.QuantityMedia(idUser, type) };
            }

            return result;
        }

        [Route("api/usermedia/addquantitylistenorviewmedia")]
        [HttpGet]
        public JsonResult AddQuantityListenOrViewMedia(string idMedia, TypeMedia type)
        {
            if (!string.IsNullOrEmpty(idMedia) && type > 0)
            {
                return new JsonResult { Data = dc.AddListenOrView(idMedia, type) };
            }

            return new JsonResult { Data = "enter input" };
        }

        [Route("api/usermedia/getquantitylistenorviewmedia")]
        [HttpGet]
        public JsonResult GetQuantityListenOrViewMedia(string idMedia, TypeMedia type)
        {
            if (!string.IsNullOrEmpty(idMedia) && type > 0)
            {
                return new JsonResult { Data = dc.GetQuantityListensOrViews(idMedia, type) };
            }

            return new JsonResult { Data = "enter input" };
        }

        [Route("api/usermedia/getchartmusictopten")]
        [HttpGet]
        public JsonResult GetChartMusicTopTen()
        {
            return new JsonResult { Data = dc.ChartOnMusicTopTen() };
        }

        [Route("api/usermedia/getchartalbummusictopten")]
        [HttpGet]
        public JsonResult GetChartAlbumMusicTopTen()
        {
            return new JsonResult { Data = dc.ChartOnAlbumMusicTopTen() };
        }

        [Route("api/usermedia/ishasalbumofuser")]
        [HttpGet]
        public JsonResult IsHasAlbumOfUser(string idAlbum, string idUser, TypeMedia type)
        {
            var result = new JsonResult { Data = "enter data" };

            switch (type)
            {
                case TypeMedia.Image:
                    result = dc.IsHasAlbumImageOfUser(idAlbum, idUser) ? new JsonResult { Data = "owned" } : new JsonResult { Data = "Not owned" };
                    break;

                case TypeMedia.Music:
                    result = dc.IsHasAlbumMusicOfUser(idAlbum, idUser) ? new JsonResult { Data = "owned" } : new JsonResult { Data = "Not owned" };
                    break;

                case TypeMedia.Video:
                    result = dc.IsHasAlbumVideoOfUser(idAlbum, idUser) ? new JsonResult { Data = "owned" } : new JsonResult { Data = "Not owned" };
                    break;
            }

            return result;
        }
    }
}