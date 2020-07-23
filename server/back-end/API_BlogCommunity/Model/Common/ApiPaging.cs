using Helper.TempModel;
using Model.Model_CodeFirst; //
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model.Common
{
    public static class ApiPaging<TModel>
    {
        public static Tuple<PagingMetaData, List<TModel>> Paging(IQueryable<TModel> source, PagingParameterModel paging)
        {
            List<TModel> items = null;

            long TotalCount = 0;
            int PageSize = 0;
            int CurrentPage = 0;
            int TotalPages = 0;
            bool previousPage = false;
            bool nextPage = false;

            if (source != null)
            {
                items = new List<TModel>();

                long count = source.Count();

                CurrentPage = paging?.pageNumber ?? 1;

                PageSize = paging?.pageSize ?? 8;

                TotalCount = count;

                TotalPages = (int)Math.Ceiling(count / (double)PageSize);

                if (count > 1)
                {
                    items = count > 0 ? source.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList() : null;
                }
                else
                {
                    items = source?.ToList();
                }

                previousPage = CurrentPage > 1 ? true : false;

                nextPage = CurrentPage < TotalPages ? true : false;
            }

            var paginationMetadata = new PagingMetaData
            {
                TotalCount = TotalCount,
                PageSize = PageSize,
                CurrentPage = CurrentPage,
                TotalPage = TotalPages,
                PreviousPage = previousPage,
                NextPage = nextPage
            };

            return new Tuple<PagingMetaData, List<TModel>>(paginationMetadata, items);
        }
    }
}