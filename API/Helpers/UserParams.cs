using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string? Gender { get; set; }
        public string? CurrentUsername { get; set; }

        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 1000;
        public string orderBy { get; set; } = "lastActive";

    }
}