using System;

namespace API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int itemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            CurrentPage = currentPage;
            itemsPerPage = itemPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }
    }
}
