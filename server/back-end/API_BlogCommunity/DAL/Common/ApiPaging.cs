using Helper.TempModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace DAL.Common
{
    public class ApiPaging
    {
        public Tuple<PagingMetaData, object> Paging(IQueryable<object> source, PagingParameterModel paging)
        {
            long count = source.Count();

            int CurrentPage = paging.pageNumber;

            int PageSize = paging.pageSize;

            long TotalCount = count;

            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            var items = source.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

            bool previousPage = CurrentPage > 1 ? true : false;

            bool nextPage = CurrentPage < TotalPages ? true : false;

            var paginationMetadata = new PagingMetaData
            {
                TotalCount = TotalCount,
                PageSize = PageSize,
                CurrentPage = CurrentPage,
                TotalPage = TotalPages,
                PreviousPage = previousPage,
                NextPage = nextPage
            };

            return new Tuple<PagingMetaData, object>(paginationMetadata, items);
        }
    }

    public static class PagingModel
    {
        public static PagingParameterModel AutomaticPaging(PagingMetaData pagingData, int pageSize)
        {
            PagingParameterModel pagingParameter = new PagingParameterModel()
            {
                pageNumber = 1,
                pageSize = pageSize
            };

            if (pagingData != null && pagingData.NextPage)
            {
                pagingParameter = new PagingParameterModel()
                {
                    pageNumber = pagingData.CurrentPage + 1,
                    pageSize = pageSize
                };
            }

            return pagingParameter;
        }
    }
}