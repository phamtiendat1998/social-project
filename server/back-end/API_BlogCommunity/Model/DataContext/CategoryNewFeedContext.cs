using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class CategoryNewFeedContext : DataContextCoreBase<CategoryNewFeedContext>
    {
        public IEnumerable<CATEGORY> Get()
        {
            return DbContext.CATEGORies.ToList();
        }

        public CATEGORY Get(int idCategory)
        {
            return DbContext.CATEGORies.FirstOrDefault(n => n.IdCategory == idCategory);
        }

        public int Create(CATEGORY category)
        {
            DbContext.CATEGORies.Add(category);
            return DbContext.SaveChanges();
        }

        public int Update(CATEGORY category)
        {
            DbContext.CATEGORies.Add(category);
            DbContext.Entry(category).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int Delete(CATEGORY category)
        {
            DbContext.CATEGORies.Remove(category);
            return DbContext.SaveChanges();
        }
    }
}