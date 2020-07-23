using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class AlbumVideoContext : DataContextCoreBase<AlbumVideoContext>
    {
        public IEnumerable<ALBUMVIDEO> Get()
        {
            return DbContext.ALBUMVIDEOS.ToList();
        }

        public ALBUMVIDEO Get(string idAlbum)
        {
            return DbContext.ALBUMVIDEOS.FirstOrDefault(n => n.IdAlbumVideo == idAlbum);
        }

        public void Create(ALBUMVIDEO albumvideo)
        {
            DbContext.ALBUMVIDEOS.Add(albumvideo);
            DbContext.SaveChanges();
        }

        public void Update(ALBUMVIDEO video)
        {
            DbContext.ALBUMVIDEOS.Add(video);
            DbContext.Entry(video).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Delete(ALBUMVIDEO video)
        {
            DbContext.ALBUMVIDEOS.Remove(video);
            DbContext.SaveChanges();
        }
    }
}