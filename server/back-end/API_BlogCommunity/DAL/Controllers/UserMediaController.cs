using COMMON;
using DAL.Common;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace DAL.Controllers
{
    public class UserMediaController : BaseController<UserInfoController>
    {
        private MediaContext dc = new MediaContext();
        private UserContext userdc = new UserContext();

        /// <summary>
        /// If match return true
        /// if not match return false
        /// </summary>
        /// <param name="idUser"></param>
        /// <param name="albumName"></param>
        /// <returns></returns>
        public bool IsHasAlbumMusicName(string idUser, string albumName)
        {
            return dc.IsAvailableNameAlbumMusic(idUser, albumName);
        }

        public bool IsHasAlbumImageName(string idUser, string albumName)
        {
            return dc.IsAvailableNameAlbumImage(idUser, albumName);
        }

        public bool IsHasAlbumVideoName(string idUser, string albumName)
        {
            return dc.IsAvailableNameAlbumVideo(idUser, albumName);
        }

        public string CreateAlbumMusic(AlbumMusics album)
        {
            var idAlbum = string.Empty;

            if (!string.IsNullOrEmpty(album.IdUser) && userdc.IsExistUserId(album.IdUser)
                && dc.IsAvailableNameAlbumMusic(album.IdUser, album.AlbumMusicName) == false)
            {
                var albumMusic = new ALBUMMUSIC()
                {
                    AlbumMusicName = album.AlbumMusicName,
                    ContentAlbumMusic = album.ContentAlbumMusic,
                    CreatedTS = album.CreatedTS,
                    IdAlbumMusic = album.IdAlbumMusic,
                    IdMedia = dc.GetIDMedia(album.IdUser),
                    Cover = album.Cover,
                    Status = album.StatusSocial
                };

                idAlbum = dc.CreateAlbumMusic(albumMusic) > 0 ? albumMusic.IdAlbumMusic : string.Empty;
            }

            return idAlbum;
        }

        public string CreateAlbumVideo(AlbumVideos album)
        {
            var idAlbum = string.Empty;

            if (!string.IsNullOrEmpty(album.IdUser) && userdc.IsExistUserId(album.IdUser)
                && dc.IsAvailableNameAlbumVideo(album.IdUser, album.AlbumVideoName) == false)
            {
                var albumVideo = new ALBUMVIDEO()
                {
                    AlbumVideoName = album.AlbumVideoName,
                    ContentAlbumVideo = album.ContentAlbumVideo,
                    CreatedTS = album.CreatedTS,
                    IdAlbumVideo = album.IdAlbumVideo,
                    IdMedia = dc.GetIDMedia(album.IdUser),
                    Cover = album.Cover,
                    Status = album.StatusSocial
                };

                idAlbum = dc.CreateAlbumVideo(albumVideo) > 0 ? albumVideo.IdAlbumVideo : string.Empty;
            }

            return idAlbum;
        }

        public string CreateAlbumImage(AlbumImages album)
        {
            var idAlbum = string.Empty;

            if (!string.IsNullOrEmpty(album.IdUser) && userdc.IsExistUserId(album.IdUser)
                && dc.IsAvailableNameAlbumImage(album.IdUser, album.AlbumName) == false)
            {
                var albumImage = new ALBUMIMAGE()
                {
                    AlbumName = album.AlbumName,
                    ContentAlbum = album.ContentAlbum,
                    CreatedTS = album.CreatedTS,
                    IdAlbumImage = album.IdAlbumImage,
                    IdMedia = dc.GetIDMedia(album.IdUser),
                    Status = album.StatusSocial
                };

                idAlbum = dc.CreateAlbumImage(albumImage) > 0 ? albumImage.IdAlbumImage : string.Empty;
            }

            return idAlbum;
        }

        public bool DeleteAlbumMusic(string idAlbum, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idAlbum) && !String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser)
                 && dc.IsAlbumMusic(idAlbum) && dc.IsHasAlbumMusicOfUser(idAlbum, idUser))
            {
                isDeleted = dc.DeleteAlbumMusic(idAlbum) > 0 ? true : false;
            }

            return isDeleted;
        }

        public bool DeleteMultiFile(MultiFile multi)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(multi.IdFile) && !String.IsNullOrEmpty(multi.IdUser)
                && userdc.IsExistUserId(multi.IdUser) && multi.TypeMedia > 0)
            {
                var data = JsonConvert.DeserializeObject<List<string>>(multi.IdFile);

                switch (multi.TypeMedia)
                {
                    case TypeMedia.Image:

                        if (dc.IsIdImageOfUser(multi.IdUser, multi.IdFile))
                        {
                            isDeleted = dc.DeleteMultipleImages(data) > 0 ? true : false;
                        }
                        break;

                    case TypeMedia.Music:

                        if (dc.IsIdMusicOfUser(multi.IdUser, multi.IdFile))
                        {
                            isDeleted = dc.DeleteMultipleMusics(data) > 0 ? true : false;
                        }
                        break;

                    case TypeMedia.Video:

                        if (dc.IsIdVideoOfUser(multi.IdUser, multi.IdFile))
                        {
                            isDeleted = dc.DeleteMultipleVideos(data) > 0 ? true : false;
                        }
                        break;
                }
            }

            return isDeleted;
        }

        public bool DeleteAlbumImage(string idAlbum, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idAlbum) && !String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser)
                 && dc.IsAlbumImage(idAlbum) && dc.IsHasAlbumImageOfUser(idAlbum, idUser))
            {
                isDeleted = dc.DeleteAlbumImage(idAlbum) > 0 ? true : false;
            }

            return isDeleted;
        }

        public bool DeleteAlbumVideo(string idAlbum, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idAlbum) && !String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser)
                && dc.IsAlbumVideo(idAlbum) && dc.IsHasAlbumVideoOfUser(idAlbum, idUser))
            {
                isDeleted = dc.DeleteAlbumVideo(idAlbum) > 0 ? true : false;
            }

            return isDeleted;
        }

        public bool UploadImage(Images image)
        {
            bool isUploaded = false;
            List<IMAGE> data = new List<IMAGE>();

            if (image.ListLinkUrl != null && !String.IsNullOrEmpty(image.IdUser) && userdc.IsExistUserId(image.IdUser))
            {
                if (string.IsNullOrEmpty(image.IdAlbumImage))
                {
                    image.IdAlbumImage = dc.GetIdAlbumImageDefault(image.IdUser);
                }

                foreach (var item in image.ListLinkUrl)
                {
                    data.Add(new IMAGE()
                    {
                        IdImage = GUID.UUID(),
                        IdAlbumImage = image.IdAlbumImage,
                        LinkUrl = item,
                        ContentImage = image.ContentImage,
                        CreatedTS = image.CreatedTS,
                        UpdatedTS = image.UpdatedTS,
                        Status = image.StatusSocial
                    });
                }

                if (data != null)
                {
                    isUploaded = dc.CreateImage(data) > 0 ? true : false;
                }
            }

            return isUploaded;
        }

        public bool UploadMusic(Musics music)
        {
            bool isUploaded = false;

            if (!String.IsNullOrEmpty(music.LinkUrl) && !String.IsNullOrEmpty(music.IdUser) && userdc.IsExistUserId(music.IdUser))
            {
                if (string.IsNullOrEmpty(music.IdAlbumMusic))
                {
                    music.IdAlbumMusic = dc.GetIdAlbumMusicDefault(music.IdUser);
                }

                var data = new MUSIC()
                {
                    IdMusic = music.IdMusic,
                    IdAlbumMusic = music.IdAlbumMusic,
                    LinkUrl = music.LinkUrl,
                    ContentMusic = music.ContentMusic,
                    CreatedTS = music.CreatedTS,
                    MusicName = music.MusicName,
                    Singer = music.Singer,
                    Cover = music.Cover,
                    Time = music.Time,
                    Status = music.StatusSocial
                };

                isUploaded = dc.CreateMusic(data) > 0 ? true : false;
            }

            return isUploaded;
        }

        public bool UploadVideo(Videos video)
        {
            bool isUploaded = false;

            if (!String.IsNullOrEmpty(video.LinkUrl) && !String.IsNullOrEmpty(video.IdUser) && userdc.IsExistUserId(video.IdUser))
            {
                if (string.IsNullOrEmpty(video.IdAlbumVideo))
                {
                    video.IdAlbumVideo = dc.GetIdAlbumVideoDefault(video.IdUser);
                }

                var data = new VIDEO()
                {
                    IdVideo = video.IdVideo,
                    IdAlbumVideo = video.IdAlbumVideo,
                    LinkUrl = video.LinkUrl,
                    ContentVideo = video.ContentVideo,
                    CreatedTS = video.CreatedTS,
                    VideoName = video.VideoName,
                    Cover = video.Cover,
                    Time = video.Time,
                    Status = video.StatusSocial
                };

                isUploaded = dc.CreateVideo(data) > 0 ? true : false;
            }

            return isUploaded;
        }

        public bool DeleteImage(string idImage, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idImage) && dc.IsImage(idImage)
                && userdc.IsExistUserId(idUser) && dc.IsImageOfUser(idImage, idUser))
            {
                isDeleted = dc.DeleteImage(idImage) > 0 ? true : false;
            }

            return isDeleted;
        }

        public bool DeleteVideo(string idVideo, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idVideo) && dc.IsVideo(idVideo)
                && userdc.IsExistUserId(idUser) && dc.IsVideoOfUser(idVideo, idUser))
            {
                isDeleted = dc.DeleteVideo(idVideo) > 0 ? true : false;
            }

            return isDeleted;
        }

        public bool DeleteMusic(string idMusic, string idUser)
        {
            bool isDeleted = false;

            if (!String.IsNullOrEmpty(idMusic) && dc.IsMusic(idMusic)
                && userdc.IsExistUserId(idUser) && dc.IsMusicOfUser(idMusic, idUser))
            {
                isDeleted = dc.DeleteMusic(idMusic) > 0 ? true : false;
            }

            return isDeleted;
        }

        public Tuple<PagingMetaData, List<AlbumImages>> GetAlbumImages(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<AlbumImages>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetAlbumImage(idUser, pagingparametermodel);

                var AlbumImages = data.Item2.Select(n => new AlbumImages
                {
                    AlbumName = n.AlbumName,
                    ContentAlbum = n.ContentAlbum,
                    CreatedTS = n.CreatedTS,
                    IdAlbumImage = n.IdAlbumImage,
                    IdMedia = n.IdMedia,
                    UpdatedTS = n.UpdatedTS,
                    Covers = UploadFile.ConCatImageString(n.IMAGES?.FirstOrDefault()?.LinkUrl),
                    Quantity = n.IMAGES.Count(),
                    StatusSocial = n.Status

                }).ToList();

                result = new Tuple<PagingMetaData, List<AlbumImages>>(data.Item1, AlbumImages);

            }

            return result;
        }

        public Tuple<PagingMetaData, List<AlbumMusics>> GetAlbumMusics(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<AlbumMusics>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetAlbumMusic(idUser, pagingparametermodel);

                var AlbumMusics = data.Item2.Select(n => new AlbumMusics
                {
                    AlbumMusicName = n.AlbumMusicName,
                    ContentAlbumMusic = n.ContentAlbumMusic,
                    CreatedTS = n.CreatedTS,
                    UpdatedTS = n.UpdatedTS,
                    IdAlbumMusic = n.IdAlbumMusic,
                    IdMedia = n.IdMedia,
                    Covers = UploadFile.ConCatImageString(n.Cover),
                    Quantity = n.MUSICS.Count(),
                    Time = Convert.ToString(n.MUSICS.Sum(m => Convert.ToDouble(m.Time))),
                    StatusSocial = n.Status

                }).ToList();

                result = new Tuple<PagingMetaData, List<AlbumMusics>>(data.Item1, AlbumMusics);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<AlbumVideos>> GetAlbumVideos(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<AlbumVideos>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetAlbumVideo(idUser, pagingparametermodel);

                var AlbumVideos = data.Item2.Select(n => new AlbumVideos
                {
                    AlbumVideoName = n.AlbumVideoName,
                    ContentAlbumVideo = n.ContentAlbumVideo,
                    CreatedTS = n.CreatedTS,
                    UpdatedTS = n.UpdatedTS,
                    IdAlbumVideo = n.IdAlbumVideo,
                    IdMedia = n.IdMedia,
                    Covers = UploadFile.ConCatImageString(n.Cover),
                    Quantity = n.VIDEOS.Count(),
                    Time = Convert.ToString(n.VIDEOS.Sum(m => Convert.ToDouble(m.Time))),
                    StatusSocial = n.Status

                }).ToList();

                result = new Tuple<PagingMetaData, List<AlbumVideos>>(data.Item1, AlbumVideos);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<Images>> GetAllImages(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<Images>> result = null;
            Tuple<PagingMetaData, List<IMAGE>> data = null;

            if (!string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                data = dc.GetAllImage(idUser, pagingparametermodel);

                var images = data?.Item2?.Select(n => new Images
                {
                    IdImage = n.IdImage,
                    LinkUrl = UploadFile.ConCatImageString(n.LinkUrl)?.First(),
                    ContentImage = n.ContentImage,
                    CreatedTS = n.CreatedTS,
                    StatusSocial = n.Status
                }).ToList();

                result = new Tuple<PagingMetaData, List<Images>>(data.Item1, images);
            }

            return result;
        }


        public Tuple<PagingMetaData, List<Images>> GetImages(string idAlbum, PagingParameterModel pagingparametermodel, string idUser)
        {
            Tuple<PagingMetaData, List<Images>> result = null;
            Tuple<PagingMetaData, List<IMAGE>> data = null;

            if (string.IsNullOrEmpty(idAlbum) && !string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                idAlbum = dc.GetIdAlbumImageDefault(idUser);
            }

            data = dc.GetImages(idAlbum, pagingparametermodel, idUser);

            var images = data?.Item2?.Select(n => new Images
            {
                IdImage = n.IdImage,
                LinkUrl = UploadFile.ConCatImageString(n.LinkUrl)?.First(),
                ContentImage = n.ContentImage,
                CreatedTS = n.CreatedTS,
                StatusSocial = n.Status
            }).ToList();

            result = new Tuple<PagingMetaData, List<Images>>(data?.Item1, images);


            return result;
        }

        public Tuple<PagingMetaData, List<Musics>> GetMusics(string idAlbum, PagingParameterModel pagingparametermodel, string idUser = null)
        {
            Tuple<PagingMetaData, List<Musics>> result = null;
            Tuple<PagingMetaData, List<MUSIC>> data = null;

            if (string.IsNullOrEmpty(idAlbum) && !string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                idAlbum = dc.GetIdAlbumMusicDefault(idUser);
            }

            data = dc.GetMusics(idAlbum, pagingparametermodel, idUser);

            var images = data?.Item2?.Select(n => new Musics
            {
                IdMusic = n.IdMusic,
                LinkUrl = n.LinkUrl != "[]" ? $"{CommonInstants.PrefixGG}{JsonConvert.DeserializeObject<List<string>>(n.LinkUrl)?.First()}" : null,
                ContentMusic = n.ContentMusic,
                CreatedTS = n.CreatedTS,
                Covers = UploadFile.ConCatImageString(n.Cover),
                Singer = n.Singer != null ? n.Singer : "",
                MusicName = n.MusicName,
                IdAlbumMusic = n.IdAlbumMusic,
                Time = n.Time,
                StatusSocial = n.Status,

            }).ToList();

            result = new Tuple<PagingMetaData, List<Musics>>(data?.Item1, images);

            return result;
        }

        public Tuple<PagingMetaData, List<Videos>> GetVideos(string idAlbum, PagingParameterModel pagingparametermodel, string idUser)
        {
            Tuple<PagingMetaData, List<Videos>> result = null;
            Tuple<PagingMetaData, List<VIDEO>> data = null;

            if (string.IsNullOrEmpty(idAlbum) && !string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                idAlbum = dc.GetIdAlbumVideoDefault(idUser);
            }

            data = dc.GetVideos(idAlbum, pagingparametermodel, idUser);

            var images = data?.Item2?.Select(n => new Videos
            {
                IdVideo = n.IdVideo,
                LinkUrl = !string.IsNullOrEmpty(n.LinkUrl) ? $"{CommonInstants.PrefixGG}{JsonConvert.DeserializeObject<List<string>>(n.LinkUrl)?.First()}" : null,
                ContentVideo = n.ContentVideo,
                CreatedTS = n.CreatedTS,
                Covers = UploadFile.ConCatImageString(n.Cover),
                VideoName = n.VideoName,
                IdAlbumVideo = n.IdAlbumVideo,
                Time = n.Time,
                StatusSocial = n.Status,

            }).ToList();

            result = new Tuple<PagingMetaData, List<Videos>>(data?.Item1, images);


            return result;
        }

        public AlbumVideos DetailAlbumVideo(string idAlbum)
        {
            AlbumVideos result = null;

            if (!string.IsNullOrEmpty(idAlbum) && dc.IsAlbumVideo(idAlbum))
            {
                var data = dc.DetailAlbumVideo(idAlbum);
                result = new AlbumVideos()
                {
                    IdUser = data.USERMEDIA.IdUser,
                    IdMedia = data.IdMedia,
                    IdAlbumVideo = data.IdAlbumVideo,
                    Covers = UploadFile.ConCatImageString(data.Cover),
                    CreatedTS = data.CreatedTS,
                    ContentAlbumVideo = data.ContentAlbumVideo,
                    UpdatedTS = data.UpdatedTS,
                    Quantity = data.VIDEOS.Count(),
                    Time = data.VIDEOS.Sum(n => Convert.ToDouble(n.Time)).ToString(),
                    AlbumVideoName = data.AlbumVideoName,
                    StatusSocial = data.Status
                };
            }

            return result;
        }

        public AlbumImages DetailAlbumImage(string idAlbum)
        {
            AlbumImages result = null;

            if (!string.IsNullOrEmpty(idAlbum) && dc.IsAlbumImage(idAlbum))
            {
                var data = dc.DetailAlbumImage(idAlbum);
                result = new AlbumImages()
                {
                    IdUser = data.USERMEDIA.IdUser,
                    IdMedia = data.IdMedia,
                    IdAlbumImage = data.IdAlbumImage,
                    Covers = UploadFile.ConCatImageString(data.Cover),
                    CreatedTS = data.CreatedTS,
                    ContentAlbum = data.ContentAlbum,
                    UpdatedTS = data.UpdatedTS,
                    Quantity = data.IMAGES.Count(),
                    AlbumName = data.AlbumName,
                    StatusSocial = data.Status
                };
            }

            return result;
        }

        public AlbumMusics DetailAlbumMusic(string idAlbum)
        {
            AlbumMusics result = null;

            if (!string.IsNullOrEmpty(idAlbum) && dc.IsAlbumMusic(idAlbum))
            {
                var data = dc.DetailAlbumMusic(idAlbum);
                result = new AlbumMusics()
                {
                    IdUser = data.USERMEDIA.IdUser,
                    IdMedia = data.IdMedia,
                    IdAlbumMusic = data.IdAlbumMusic,
                    Covers = UploadFile.ConCatImageString(data.Cover),
                    CreatedTS = data.CreatedTS,
                    ContentAlbumMusic = data.ContentAlbumMusic,
                    UpdatedTS = data.UpdatedTS,
                    Quantity = data.MUSICS.Count(),
                    Time = data.MUSICS.Sum(n => Convert.ToDouble(n.Time)).ToString(),
                    AlbumMusicName = data.AlbumMusicName,
                    StatusSocial = data.Status
                };
            }

            return result;
        }

        public bool UpdateAlbumMusic(AlbumMusics album)
        {
            bool isUpdated = false;

            if (!(string.IsNullOrEmpty(album.IdAlbumMusic) && string.IsNullOrEmpty(album.AlbumMusicName) && string.IsNullOrEmpty(album.IdUser))
                && dc.IsAlbumMusic(album.IdAlbumMusic) && dc.IsHasAlbumMusicOfUser(album.IdAlbumMusic, album.IdUser))
            {
                if (!string.IsNullOrEmpty(album.Base64String))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(album.Base64String);
                    var cover = UploadFile.UploadFileToDrive(listBase64Image, album.IdUser, CommonInstants.ParentMusic);
                    album.Cover = JsonConvert.SerializeObject(cover);
                    album.Base64String = string.Empty;
                }

                var data = new ALBUMMUSIC()
                {
                    IdAlbumMusic = album.IdAlbumMusic,
                    AlbumMusicName = album.AlbumMusicName,
                    ContentAlbumMusic = album.ContentAlbumMusic,
                    Cover = album.Cover,
                    UpdatedTS = UtcNow.Utc(),
                };

                isUpdated = dc.UpdateAlbumMusic(data) > 0 ? true : false;
            }

            return isUpdated;
        }

        public bool UpdateAlbumImage(AlbumImages album)
        {
            bool isUpdated = false;

            if (!(string.IsNullOrEmpty(album.IdAlbumImage) && string.IsNullOrEmpty(album.AlbumName) && string.IsNullOrEmpty(album.IdUser))
                && dc.IsAlbumImage(album.IdAlbumImage) && dc.IsHasAlbumImageOfUser(album.IdAlbumImage, album.IdUser))
            {
                var data = new ALBUMIMAGE()
                {
                    IdAlbumImage = album.IdAlbumImage,
                    AlbumName = album.AlbumName,
                    ContentAlbum = album.ContentAlbum,
                    Cover = album.Cover,
                    UpdatedTS = UtcNow.Utc(),
                };

                isUpdated = dc.UpdateAlbumImage(data) > 0 ? true : false;
            }

            return isUpdated;
        }

        public bool UpdateAlbumVideo(AlbumVideos album)
        {
            bool isUpdated = false;

            if (!(string.IsNullOrEmpty(album.IdAlbumVideo) && string.IsNullOrEmpty(album.AlbumVideoName) && string.IsNullOrEmpty(album.IdUser))
                && dc.IsAlbumImage(album.IdAlbumVideo) && dc.IsHasAlbumVideoOfUser(album.IdAlbumVideo, album.IdUser))
            {
                var data = new ALBUMVIDEO()
                {
                    IdAlbumVideo = album.IdAlbumVideo,
                    AlbumVideoName = album.AlbumVideoName,
                    ContentAlbumVideo = album.ContentAlbumVideo,
                    Cover = album.Cover,
                    UpdatedTS = UtcNow.Utc(),
                };

                isUpdated = dc.UpdateAlbumVideo(data) > 0 ? true : false;
            }

            return isUpdated;
        }

        public ModelQuantityMedia QuantityMedia(string idUser, TypeMedia type)
        {
            ModelQuantityMedia quantity = new ModelQuantityMedia();

            if (!string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                switch (type)
                {
                    case TypeMedia.Image:
                        quantity.QuantityAlbum = dc.QuantityAlbumImages(idUser);
                        quantity.QuantityItem = dc.QuantityImages(idUser);
                        break;

                    case TypeMedia.Music:
                        quantity.QuantityAlbum = dc.QuantityAlbumMusics(idUser);
                        quantity.QuantityItem = dc.QuantityMusics(idUser);
                        break;

                    case TypeMedia.Video:
                        quantity.QuantityAlbum = dc.QuantityAlbumVideos(idUser);
                        quantity.QuantityItem = dc.QuantityVideos(idUser);
                        break;
                }
            }

            return quantity;
        }

        public bool AddListenOrView(string idMedia, TypeMedia type)
        {
            bool isAdded = false;

            if (!string.IsNullOrEmpty(idMedia) && (dc.IsVideo(idMedia) || dc.IsMusic(idMedia)) && type > 0)
            {
                switch (type)
                {
                    case TypeMedia.Music:
                        dc.CreateMusicListensQuantity(idMedia);
                        isAdded = true;
                        break;

                    case TypeMedia.Video:
                        dc.CreateVideoViewsQuantity(idMedia);
                        isAdded = true;
                        break;
                }
            }

            return isAdded;
        }

        public long GetQuantityListensOrViews(string idMedia, TypeMedia type)
        {
            long result = 0;

            if (!string.IsNullOrEmpty(idMedia) && (dc.IsVideo(idMedia) || dc.IsMusic(idMedia)) && type > 0)
            {
                switch (type)
                {
                    case TypeMedia.Music:
                        result = dc.GetMusicQuantityListens(idMedia);
                        break;

                    case TypeMedia.Video:
                        result = dc.GetVideoQuantityViews(idMedia);
                        break;
                }
            }

            return result;
        }

        public List<Musics> ChartOnMusicTopTen()
        {
            return dc.ChartOnMusicTopTen()?.Select(n => new Musics()
            {
                MusicName = n.MusicName,
                Covers = UploadFile.ConCatImageString(n.Cover),
                IdMusic = n.IdMusic,
                LinkUrl = UploadFile.ConCatImageString(n.LinkUrl)?.First(),
                Singer = n.Singer,
                QuantityView = n.MUSICLISTENS.LongCount(),
                Time = n.Time,
                UserInfo = new UserInfo
                {
                    IdUser = n.ALBUMMUSIC.USERMEDIA.IdUser,
                    Avatar = !string.IsNullOrEmpty(n.ALBUMMUSIC.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).Avatar) ?
                    $"{CommonInstants.PrefixGG}{n.ALBUMMUSIC.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty)?.Avatar}" : null,
                    LastName = n.ALBUMMUSIC.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).LastName,
                    FirstName = n.ALBUMMUSIC.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).FirstName,
                }
            }).OrderByDescending(n => n.QuantityView).ToList();
        }

        public List<AlbumMusics> ChartOnAlbumMusicTopTen()
        {
            return dc.ChartOnAlbumMusicTopTen()?.Select(n => new AlbumMusics()
            {
                AlbumMusicName = n.AlbumMusicName,
                Covers = UploadFile.ConCatImageString(n.Cover),
                IdAlbumMusic = n.IdAlbumMusic,
                Quantity = n.MUSICS.Count(),
                Time = n.MUSICS.Sum(m => Convert.ToDouble(m.Time)).ToString(),
                UserInfo = new UserInfo
                {
                    IdUser = n.USERMEDIA.IdUser,
                    Avatar = !string.IsNullOrEmpty(n.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).Avatar) ?
                    $"{CommonInstants.PrefixGG}{n.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty)?.Avatar}" : null,
                    LastName = n.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).LastName,
                    FirstName = n.USERMEDIA.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != string.Empty).FirstName,
                }
            }).ToList();
        }

        public bool IsHasAlbumMusicOfUser(string idAlbum, string idUser)
        {
            if (!(string.IsNullOrEmpty(idAlbum) && string.IsNullOrEmpty(idUser))
                && dc.IsAlbumMusic(idAlbum) && userdc.IsExistUserId(idUser) && dc.IsHasAlbumMusicOfUser(idAlbum, idUser))
                return true;
            return false;
        }

        public bool IsHasAlbumVideoOfUser(string idAlbum, string idUser)
        {
            if (!(string.IsNullOrEmpty(idAlbum) && string.IsNullOrEmpty(idUser))
                && dc.IsAlbumVideo(idAlbum) && userdc.IsExistUserId(idUser) && dc.IsHasAlbumVideoOfUser(idAlbum, idUser))
                return true;
            return false;
        }

        public bool IsHasAlbumImageOfUser(string idAlbum, string idUser)
        {
            if (!(string.IsNullOrEmpty(idAlbum) && string.IsNullOrEmpty(idUser))
                && dc.IsAlbumImage(idAlbum) && userdc.IsExistUserId(idUser) && dc.IsHasAlbumImageOfUser(idAlbum, idUser))
                return true;
            return false;
        }
    }
}