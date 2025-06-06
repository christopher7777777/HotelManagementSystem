using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.SignalR;
using Wandermate.Models;

namespace wandermate.backened.Models
{
    public class Hotel
    {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string Price { get; set; } = string.Empty;

        public List<string> ImageUrl { get; set; } = new List<string>();

        public bool IsDeleted { get; set; } = false;

        public ICollection<Review> Review { get; set; } = new List<Review>();
    }
}