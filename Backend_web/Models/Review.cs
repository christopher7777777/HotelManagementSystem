using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using wandermate.backened.Models;

namespace Wandermate.Models
{
 public class Review
    {
        [Key]

        public int Id {get; set; }

        public int Rating{get; set; }

        public string Comment{get; set; } = string.Empty;

        public int? HotelId{get; set; }

        public Hotel? Hotel {get; set; }

        public int? UserId{get; set; }

        public User? User { get; set; }
        public string ReviewText { get; internal set; }
    }
}
