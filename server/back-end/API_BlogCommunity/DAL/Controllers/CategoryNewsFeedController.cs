using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Controllers
{
    public class CategoryNewsFeedController : BaseController<CategoryNewsFeedController>
    {
        public IEnumerable<CATEGORY> Get()
        {
            return CategoryNewFeedContext.Instance.Get();
        }

        public CATEGORY Get(int idCategory)
        {
            return CategoryNewFeedContext.Instance.Get(idCategory);
        }

        public bool Create(Category category)
        {
            bool IsCreated = false;
            CATEGORY cate = new CATEGORY();
            cate.IntroCategory = category.IntroCategory;
            cate.NameCategory = category.NameCategory;
            cate.CoverCategoryUrl = category.CoverCategoryUrl;

            if (CategoryNewFeedContext.Instance.Create(cate) >= 1)
            {
                IsCreated = true;
            }

            return IsCreated;
        }

        public bool Update(Category category)
        {
            bool IsUpdate = false;
            CATEGORY cate = new CATEGORY();
            cate.IntroCategory = category.IntroCategory;
            cate.NameCategory = category.NameCategory;
            
            if (!String.IsNullOrEmpty(category.CoverCategoryUrl))
            {
                cate.CoverCategoryUrl = category.CoverCategoryUrl;
            }

            if (CategoryNewFeedContext.Instance.Update(cate) >= 1)
            {
                IsUpdate = true;
            }

            return IsUpdate;
        }
    }
}