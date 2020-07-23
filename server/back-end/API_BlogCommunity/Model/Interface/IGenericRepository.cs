using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model.Interface
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetSingle(Object id);
        void Create(TEntity obj);
        void Update(TEntity obj);
        void Delete(Object id);
        void SaveChanges();
    }
}