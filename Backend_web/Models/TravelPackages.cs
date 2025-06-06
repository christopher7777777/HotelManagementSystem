using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace wandermate.backened.Models
{
    [Table("TravelPackage")]
    public class TravelPackages
    {
        [Key]

        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;

        public string Price { get; set; } = string.Empty;
        public List<string> ImageUrl { get; set; } = new List<string>();

        public string Description { get; set; } = String.Empty;
    }
}