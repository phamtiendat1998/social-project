using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class AlbumImageContext : DataContextCoreBase<AlbumImageContext>
    {
        public IEnumerable<ALBUMIMAGE> Get()
        {
            return DbContext.ALBUMIMAGES.ToList();
        }

        public ALBUMIMAGE Get(string idAlbum)
        {
            return DbContext.ALBUMIMAGES.FirstOrDefault(n => n.IdAlbumImage == idAlbum);
        }

        public void Create(ALBUMIMAGE album)
        {
            DbContext.ALBUMIMAGES.Add(album);
            DbContext.SaveChanges();
        }

        public void Update(ALBUMIMAGE image)
        {
            DbContext.ALBUMIMAGES.Add(image);
            DbContext.Entry(image).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Delete(ALBUMIMAGE image)
        {
            DbContext.ALBUMIMAGES.Remove(image);
            DbContext.SaveChanges();
        }
    }
}