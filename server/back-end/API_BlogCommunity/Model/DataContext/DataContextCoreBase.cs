using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public abstract class DataContextCoreBase<T> : IDisposable where T : class, new()
    {

        private BlogCommunityContext _dbContext;
#if ROOT
        public CoreDbContext DbContext
#else
        internal BlogCommunityContext DbContext
#endif
        {
            get
            {
                if (_dbContext == null)
                    _dbContext = new BlogCommunityContext();
                return _dbContext;
            }
        }

        #region Internal Implementations
        //private static T _Instance;
        //public static T Instance
        //{
        //    get
        //    {
        //        if (_Instance == null)
        //            _Instance = new T();
        //        return _Instance;
        //    }
        //}

        public static T Instance
        {
            get
            {
                return new T();
            }
        }
        #endregion

        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
                _dbContext = null;
            }
        }
    }
}