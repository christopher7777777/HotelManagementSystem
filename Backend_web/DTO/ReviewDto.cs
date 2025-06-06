using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Wandermate.DTO
{
    public class ReviewDto
    {
        public int Rating { get; set; }

        public string ReviewText { get; set; } = string.Empty;

        public int? HotelId { get; set; }
    }
}