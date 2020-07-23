using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class ImagesContext : DataContextCoreBase<ImagesContext>
    {
        public IEnumerable<IMAGE> Get()
        {
            return DbContext.IMAGES.ToList();
        }

        public IMAGE Get(string idImage)
        {
            return DbContext.IMAGES.FirstOrDefault(n => n.IdImage == idImage);
        }

        public int Create(IMAGE image)
        {
            DbContext.IMAGES.Add(image);
            return DbContext.SaveChanges();
        }

        public int Update(IMAGE image)
        {
            DbContext.IMAGES.Add(image);
            DbContext.Entry(image).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public void Delete(IMAGE image)
        {
            DbContext.IMAGES.Remove(image);
            DbContext.SaveChanges();
        }
    }
}