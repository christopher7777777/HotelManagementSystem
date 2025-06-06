using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Wandermate.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    }
}