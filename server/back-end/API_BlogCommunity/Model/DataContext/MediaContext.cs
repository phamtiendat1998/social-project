using Helper.Enum;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.Common;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;

namespace Model.DataContext
{
    public class MediaContext : DataContextCoreBase<MediaContext>
    {
        public void DeleteImageDrive(List<string> source = null, string fileId = null)
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

        public IEnumerable<USERMEDIA> Get()
        {
            return DbContext.USERMEDIAs.ToList();
        }

        public string GetIDMedia(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).IdMedia;
        }

        public USERMEDIA Get(string idMedia)
        {
            return DbContext.USERMEDIAs.FirstOrDefault(n => n.IdMedia == idMedia);
        }

        public Tuple<PagingMetaData, List<ALBUMIMAGE>> GetAlbumImage(string idUser, PagingParameterModel paging)
        {
            var source = DbContext.USERMEDIAs
                .Include(n => n.ALBUMIMAGES.Select(m => m.IMAGES))
                .SingleOrDefault(n => n.IdUser == idUser).ALBUMIMAGES.AsQueryable();

            return ApiPaging<ALBUMIMAGE>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<ALBUMMUSIC>> GetAlbumMusic(string idUser, PagingParameterModel paging)
        {
            var source = DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMMUSICs.Where(m => m.AlbumMusicName != "DEFAULT").AsQueryable();

            return ApiPaging<ALBUMMUSIC>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<ALBUMVIDEO>> GetAlbumVideo(string idUser, PagingParameterModel paging)
        {
            var source = DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMVIDEOS.AsQueryable();

            return ApiPaging<ALBUMVIDEO>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<IMAGE>> GetAllImage(string idUser, PagingParameterModel paging)
        {
            var ListIdAlbumImage = DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMIMAGES.Select(n => n.IdAlbumImage).AsQueryable();
            var source = DbContext.IMAGES.Where(n => ListIdAlbumImage.Contains(n.IdAlbumImage)).OrderBy(n => n.CreatedTS).AsQueryable();

            return ApiPaging<IMAGE>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<IMAGE>> GetImages(string idAlbum, PagingParameterModel paging, string idUser = null)
        {
            var source = DbContext.IMAGES.Where(n => n.IdAlbumImage == idAlbum).OrderBy(n => n.CreatedTS).AsQueryable();

            return ApiPaging<IMAGE>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<VIDEO>> GetVideos(string idAlbum, PagingParameterModel paging, string idUser = null)
        {
            var source = DbContext.VIDEOS.Where(n => n.IdAlbumVideo == idAlbum).OrderBy(n => n.CreatedTS).AsQueryable();

            return ApiPaging<VIDEO>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<MUSIC>> GetMusics(string idAlbum, PagingParameterModel paging, string idUser = null)
        {
            var source = DbContext.MUSICS.Where(n => n.IdAlbumMusic == idAlbum).OrderBy(n => n.CreatedTS).AsQueryable();

            return ApiPaging<MUSIC>.Paging(source, paging);
        }

        public ALBUMVIDEO DetailAlbumVideo(string idAlbum)
        {
            return DbContext.ALBUMVIDEOS
                .Include(n => n.USERMEDIA)
                .Include(n => n.VIDEOS)
                .SingleOrDefault(n => n.IdAlbumVideo == idAlbum);
        }

        public ALBUMMUSIC DetailAlbumMusic(string idAlbum)
        {
            return DbContext.ALBUMMUSICs
                .Include(n => n.USERMEDIA)
                .Include(n => n.MUSICS)
                .SingleOrDefault(n => n.IdAlbumMusic == idAlbum);
        }

        public ALBUMIMAGE DetailAlbumImage(string idAlbum)
        {
            return DbContext.ALBUMIMAGES
                .Include(n => n.USERMEDIA)
                .Include(n => n.IMAGES)
                .SingleOrDefault(n => n.IdAlbumImage == idAlbum);
        }

        public void Create(USERMEDIA usermedia)
        {
            DbContext.USERMEDIAs.Add(usermedia);
            DbContext.SaveChanges();
        }

        public void Update(USERMEDIA media)
        {
            DbContext.USERMEDIAs.Add(media);
            DbContext.Entry(media).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Delete(USERMEDIA media)
        {
            DbContext.USERMEDIAs.Remove(media);
            DbContext.SaveChanges();
        }

        public bool IsHasAlbumMusicOfUser(string idAlbum, string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMMUSICs.Any(m => m.IdAlbumMusic == idAlbum);
        }

        public bool IsHasAlbumVideoOfUser(string idAlbum, string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMVIDEOS.Any(m => m.IdAlbumVideo == idAlbum);
        }

        public bool IsHasAlbumImageOfUser(string idAlbum, string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMIMAGES.Any(m => m.IdAlbumImage == idAlbum);
        }

        public bool HasIdMedia(string idMedia)
        {
            return DbContext.USERMEDIAs.Any(n => n.IdMedia == idMedia);
        }

        public bool IsMediaOfUser(string idUser, string idMedia)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser).Any(m => m.USERMEDIAs.Any(me => me.IdMedia == idMedia));
        }

        public bool IsAlbumMusic(string idAlbum)
        {
            return DbContext.ALBUMMUSICs.Any(n => n.IdAlbumMusic == idAlbum);
        }

        public bool IsIdMusicOfUser(string idUser, string idFile)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser)
                .Any(m => m.USERMEDIAs.Any(me => me.ALBUMMUSICs.Any(amu => amu.MUSICS.Any(mu => mu.IdMusic == idFile))));
        }

        public bool IsIdVideoOfUser(string idUser, string idFile)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser)
                .Any(m => m.USERMEDIAs.Any(me => me.ALBUMVIDEOS.Any(amu => amu.VIDEOS.Any(mu => mu.IdVideo == idFile))));
        }

        public bool IsIdImageOfUser(string idUser, string idFile)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser)
                .Any(m => m.USERMEDIAs.Any(me => me.ALBUMIMAGES.Any(amu => amu.IMAGES.Any(mu => mu.IdImage == idFile))));
        }

        public bool IsAlbumVideo(string idAlbum)
        {
            return DbContext.ALBUMVIDEOS.Any(n => n.IdAlbumVideo == idAlbum);
        }

        public bool IsAlbumImage(string idAlbum)
        {
            return DbContext.ALBUMIMAGES.Any(n => n.IdAlbumImage == idAlbum);
        }

        public bool IsImageOfUser(string idImage, string idUser)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser).Any(n => n.USERMEDIAs.Any(m => m.ALBUMIMAGES.Any(ab => ab.IMAGES.Any(im => im.IdImage == idImage))));
        }

        public bool IsVideoOfUser(string idVideo, string idUser)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser).Any(n => n.USERMEDIAs.Any(m => m.ALBUMVIDEOS.Any(ab => ab.VIDEOS.Any(im => im.IdVideo == idVideo))));
        }

        public bool IsMusicOfUser(string idMusic, string idUser)
        {
            return DbContext.USERACCOUNTs.Where(n => n.IdUser == idUser).Any(n => n.USERMEDIAs.Any(m => m.ALBUMMUSICs.Any(ab => ab.MUSICS.Any(im => im.IdMusic == idMusic))));
        }

        public bool IsImage(string idImage)
        {
            return DbContext.IMAGES.Any(n => n.IdImage == idImage);
        }

        public bool IsVideo(string idVideo)
        {
            return DbContext.VIDEOS.Any(n => n.IdVideo == idVideo);
        }

        public bool IsMusic(string idMusic)
        {
            return DbContext.MUSICS.Any(n => n.IdMusic == idMusic);
        }

        public int CreateAlbumMusic(ALBUMMUSIC album)
        {
            DbContext.ALBUMMUSICs.Add(album);
            return DbContext.SaveChanges();
        }

        public int CreateAlbumImage(ALBUMIMAGE album)
        {
            DbContext.ALBUMIMAGES.Add(album);
            return DbContext.SaveChanges();
        }

        public int CreateAlbumVideo(ALBUMVIDEO album)
        {
            DbContext.ALBUMVIDEOS.Add(album);
            return DbContext.SaveChanges();
        }

        public bool IsAvailableNameAlbumMusic(string idUser, string AlbumName)
        {
            return DbContext.USERMEDIAs
                .SingleOrDefault(n => n.IdUser == idUser)
                .ALBUMMUSICs.Any(n => n.AlbumMusicName.ToLower().Equals(AlbumName.ToLower()));
        }

        public bool IsAvailableNameAlbumImage(string idUser, string AlbumName)
        {
            return DbContext.USERMEDIAs
               .SingleOrDefault(n => n.IdUser == idUser)
               .ALBUMIMAGES.Any(n => n.AlbumName.Equals(AlbumName, StringComparison.OrdinalIgnoreCase));
        }

        public bool IsAvailableNameAlbumVideo(string idUser, string AlbumName)
        {
            return DbContext.USERMEDIAs
               .SingleOrDefault(n => n.IdUser == idUser)
               .ALBUMVIDEOS.Any(n => n.AlbumVideoName.Equals(AlbumName, StringComparison.OrdinalIgnoreCase));
        }

        public int CreateImage(List<IMAGE> image)
        {
            DbContext.IMAGES.AddRange(image);
            return DbContext.SaveChanges();
        }

        public string GetIdAlbumMusicDefault(string idUser, string albumName = "DEFAULT", string contentAlbum = "Home music song")
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser)?
                .ALBUMMUSICs.FirstOrDefault(n => n.AlbumMusicName == albumName && n.ContentAlbumMusic == contentAlbum)?.IdAlbumMusic;
        }

        public string GetIdAlbumVideoDefault(string idUser, string albumName = "DEFAULT", string contentAlbum = "Home video")
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser)?
                .ALBUMVIDEOS.FirstOrDefault(n => n.AlbumVideoName == albumName && n.ContentAlbumVideo == contentAlbum)?.IdAlbumVideo;
        }

        public string GetIdAlbumImageDefault(string idUser, string albumName = "DEFAULT", string contentAlbum = "Home Images")
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser)?
                .ALBUMIMAGES.FirstOrDefault(n => n.AlbumName == albumName && n.ContentAlbum == contentAlbum)?.IdAlbumImage;
        }

        public int CreateMusic(MUSIC music)
        {
            DbContext.MUSICS.Add(music);
            return DbContext.SaveChanges();
        }

        public int CreateVideo(VIDEO video)
        {
            DbContext.VIDEOS.Add(video);
            return DbContext.SaveChanges();
        }

        public int DeleteAlbumMusic(string idAlbum)
        {
            var album = DbContext.ALBUMMUSICs.Find(idAlbum);

            if (album != null)
            {
                if (!string.IsNullOrEmpty(album.Cover))
                {
                    var linkUrl = JsonConvert.DeserializeObject<List<string>>(album.Cover);

                    Thread threadDelete = new Thread(() => DeleteImageDrive(linkUrl));
                    threadDelete.Start();
                }

                if (DeleteMultipleMusics(album.MUSICS.Select(n => n.IdMusic).ToList()) >= 0)
                {
                    DbContext.ALBUMMUSICs.Remove(album);
                }
            }

            return DbContext.SaveChanges();
        }

        public int DeleteAlbumVideo(string idAlbum)
        {
            var album = DbContext.ALBUMVIDEOS.Find(idAlbum);

            if (album != null)
            {
                if (DeleteMultipleVideos(album.VIDEOS.Select(n => n.IdVideo).ToList()) > 0)
                {
                    DbContext.ALBUMVIDEOS.Remove(album);
                }
            }

            return DbContext.SaveChanges();
        }

        public int DeleteAlbumImage(string idAlbum)
        {
            var album = DbContext.ALBUMIMAGES.Find(idAlbum);

            if (album != null)
            {
                var listImages = album.IMAGES;
                var linkListImage = listImages.Select(n => n.LinkUrl);

                if (linkListImage != null)
                {
                    List<string> list = new List<string>();

                    foreach (var item in linkListImage)
                    {
                        list.Add(JsonConvert.DeserializeObject<List<string>>(item)[0]);
                    }

                    Thread threadDelete = new Thread(() => DeleteImageDrive(list)); threadDelete.Start();
                }

                if (listImages != null)
                {
                    DbContext.IMAGES.RemoveRange(listImages);
                }

                DbContext.ALBUMIMAGES.Remove(album);
            }

            return DbContext.SaveChanges();
        }

        public int DeleteVideo(string idVideo)
        {
            var data = DbContext.VIDEOS.Find(idVideo);

            if (data != null)
            {
                var dataView = data.VIDEOVIEWS;

                if (!string.IsNullOrEmpty(data.LinkUrl))
                {
                    Thread threadDelete = new Thread(() => DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(data.LinkUrl)));
                    threadDelete.Start();
                }

                if (!string.IsNullOrEmpty(data.Cover))
                {
                    Thread threadDeleteCover = new Thread(() => DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(data.Cover)));
                    threadDeleteCover.Start();
                }

                if (dataView != null)
                {
                    DbContext.VIDEOVIEWS.RemoveRange(dataView);
                }

                DbContext.VIDEOS.Remove(data);
            }

            return DbContext.SaveChanges();
        }

        public int DeleteMultipleVideos(List<string> idVideo)
        {
            var result = 0;
            foreach (var item in idVideo)
            {
                result = DeleteVideo(item);
            }

            return result;
        }

        public int DeleteMultipleImages(List<string> idImage)
        {
            var result = 0;
            foreach (var item in idImage)
            {
                result = DeleteImage(item);
            }

            return result;
        }

        public int DeleteMultipleMusics(List<string> idMusic)
        {
            var result = 0;
            foreach (var item in idMusic)
            {
                result = DeleteMusic(item);
            }

            return result;
        }

        public int DeleteImage(string idImage)
        {
            var data = DbContext.IMAGES.Find(idImage);

            if (data != null)
            {
                Thread threadDelete = new Thread(() => DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(data.LinkUrl)));
                threadDelete.Start();

                DbContext.IMAGES.Remove(data);
            }

            return DbContext.SaveChanges();
        }

        public int DeleteMusic(string idMusic)
        {
            var dataMusic = DbContext.MUSICS.Find(idMusic);

            if (dataMusic != null)
            {
                var dataListens = dataMusic.MUSICLISTENS;

                if (!string.IsNullOrEmpty(dataMusic.Cover))
                {
                    Thread threadDeleteCover = new Thread(() => DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(dataMusic.Cover)));
                    threadDeleteCover.Start();
                }

                if (!string.IsNullOrEmpty(dataMusic.LinkUrl))
                {
                    Thread threadDeleteSong = new Thread(() => DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(dataMusic.LinkUrl)));
                    threadDeleteSong.Start();
                }

                if (dataListens != null)
                {
                    DbContext.MUSICLISTENS.RemoveRange(dataListens);
                }

                DbContext.MUSICS.Remove(dataMusic);
            }

            return DbContext.SaveChanges();
        }

        public int UpdateAlbumMusic(ALBUMMUSIC album)
        {
            var current = DbContext.ALBUMMUSICs.Find(album.IdAlbumMusic);

            current.Status = album.Status != null ? album.Status : current.Status;
            current.AlbumMusicName = !string.IsNullOrEmpty(album.AlbumMusicName) ? album.AlbumMusicName : current.AlbumMusicName;
            current.Cover = !string.IsNullOrEmpty(album.Cover) ? album.Cover : current.Cover;
            current.ContentAlbumMusic = album.ContentAlbumMusic;
            current.UpdatedTS = album.UpdatedTS;
            DbContext.ALBUMMUSICs.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int UpdateAlbumImage(ALBUMIMAGE album)
        {
            var current = DbContext.ALBUMIMAGES.Find(album.IdAlbumImage);

            current.Status = album.Status != null ? album.Status : current.Status;
            current.AlbumName = !string.IsNullOrEmpty(album.AlbumName) ? album.AlbumName : current.AlbumName;
            current.Cover = !string.IsNullOrEmpty(album.Cover) ? album.Cover : current.Cover;
            current.ContentAlbum = album.ContentAlbum;
            current.UpdatedTS = album.UpdatedTS;
            DbContext.ALBUMIMAGES.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int UpdateAlbumVideo(ALBUMVIDEO album)
        {
            var current = DbContext.ALBUMVIDEOS.Find(album.IdAlbumVideo);

            current.Status = album.Status != null ? album.Status : current.Status;
            current.AlbumVideoName = !string.IsNullOrEmpty(album.AlbumVideoName) ? album.AlbumVideoName : current.AlbumVideoName;
            current.Cover = !string.IsNullOrEmpty(album.Cover) ? album.Cover : current.Cover;
            current.ContentAlbumVideo = album.ContentAlbumVideo;
            current.UpdatedTS = album.UpdatedTS;
            DbContext.ALBUMVIDEOS.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public long QuantityImages(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMIMAGES.Sum(m => m.IMAGES.LongCount());
        }

        public long QuantityVideos(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMVIDEOS.Sum(m => m.VIDEOS.LongCount());
        }

        public long QuantityMusics(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMMUSICs.Sum(m => m.MUSICS.LongCount());
        }

        public long QuantityAlbumMusics(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMMUSICs.LongCount();
        }

        public long QuantityAlbumImages(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMIMAGES.LongCount();
        }

        public long QuantityAlbumVideos(string idUser)
        {
            return DbContext.USERMEDIAs.SingleOrDefault(n => n.IdUser == idUser).ALBUMVIDEOS.LongCount();
        }

        public void CreateMusicListensQuantity(string idMusic)
        {
            var data = new MUSICLISTEN()
            {
                IdMusic = idMusic,
                CreatedTS = DateTime.UtcNow
            };

            DbContext.MUSICLISTENS.Add(data);
            DbContext.SaveChanges();
        }

        public void CreateVideoViewsQuantity(string idVideo)
        {
            var data = new VIDEOVIEW()
            {
                IdVideo = idVideo,
                CreatedTS = DateTime.UtcNow
            };

            DbContext.VIDEOVIEWS.Add(data);
            DbContext.SaveChanges();
        }

        public long GetMusicQuantityListens(string idMusic)
        {
            return DbContext.MUSICLISTENS.LongCount(n => n.IdMusic == idMusic);
        }

        public long GetVideoQuantityViews(string idVideo)
        {
            return DbContext.VIDEOVIEWS.LongCount(n => n.IdVideo == idVideo);
        }

        public string GetCoverAlbum(string idAlbum, TypeMedia type)
        {
            string result = string.Empty;

            switch (type)
            {
                case TypeMedia.Music:
                    result = DbContext.ALBUMMUSICs.Find(idAlbum)?.Cover;
                    break;

                case TypeMedia.Video:
                    result = DbContext.ALBUMVIDEOS.Find(idAlbum)?.Cover;
                    break;
            }

            return result;
        }

        public IEnumerable<MUSIC> ChartOnMusicTopTen()
        {
            return DbContext.MUSICS
               .Include(n => n.ALBUMMUSIC.USERMEDIA.USERACCOUNT.USERINFOes)
               .Include(n => n.MUSICLISTENS)
               .Where(n => n.MUSICLISTENS
               .GroupBy(m => m.IdMusic)
               .Select(g => new ChartTopTen { IdMedia = g.Key, Quantity = g.Count() })
               .Take(10).Select(m => m.IdMedia)
               .Contains(n.IdMusic)).AsEnumerable();
        }

        public IEnumerable<ALBUMMUSIC> ChartOnAlbumMusicTopTen()
        {
            return DbContext.ALBUMMUSICs
                .Where(n => n.AlbumMusicName != "DEFAULT" && n.MUSICS.Any() && n.MUSICS.LongCount(m => m.MUSICLISTENS.LongCount() > 0) > 0)
                .OrderByDescending(n => n.MUSICS.Sum(m => m.MUSICLISTENS.LongCount()))
                .Include(n => n.USERMEDIA.USERACCOUNT.USERINFOes)
                .Include(n => n.MUSICS)
                .Include(n => n.MUSICS.Select(m => m.MUSICLISTENS))
                .Take(10).AsEnumerable();
        }
    }
}