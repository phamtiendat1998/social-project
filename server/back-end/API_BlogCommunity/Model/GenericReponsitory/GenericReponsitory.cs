using Model.Interface;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.GenericReponsitory
{
    public class GenericReponsitory<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private BlogCommunityContext _context = null;
        private DbSet<TEntity> table = null;

        public GenericReponsitory()
        {
            this._context = new BlogCommunityContext();
            table = _context.Set<TEntity>();
        }

        public void Create(TEntity obj)
        {
            table.Add(obj);
        }

        public void Delete(object id)
        {
            TEntity existing = table.Find(id);
            table.Remove(existing);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return table.ToList();
        }

        public TEntity GetSingle(object id)
        {
            return table.Find(id);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(TEntity obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }
    }
}