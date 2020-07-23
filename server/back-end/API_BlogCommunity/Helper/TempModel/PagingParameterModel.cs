namespace Helper.TempModel
{
    public class PagingParameterModel
    {
        int maxPageSize = 100;

        public PagingParameterModel() { }

        public PagingParameterModel(int quantity)
        {
            maxPageSize = quantity / 8;
        }

        public int pageNumber { get; set; } = 1;

        public int _pageSize { get; set; } = 10;

        public int pageSize
        {

            get { return _pageSize; }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }

    public class PagingMetaData
    {
        public long TotalCount { get; set; } 

        public int PageSize { get; set; }

        public int CurrentPage { get; set; }

        public int TotalPage { get; set; }

        public bool PreviousPage { get; set; }

        public bool NextPage { get; set; }
    }
}