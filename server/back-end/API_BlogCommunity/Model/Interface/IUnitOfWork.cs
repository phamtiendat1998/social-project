using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Interface
{
    public interface IUnitOfWork<TEntity> where TEntity : class
    {
        IGenericRepository<TEntity> entity { get; }
        void Commit();
    }
}
