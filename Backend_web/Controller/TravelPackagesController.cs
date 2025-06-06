using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using wandermate.backened.Models;
using Wandermate.Data;

namespace Wandermate.Controller
{
    [Route("Wandermate/travelPackage")]
    [ApiController]

    public class TravelPackageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TravelPackageController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET api/travelPackages
        [HttpGet]
        public IActionResult GetAll()
        {
            var travelpackages = _context.TravelPackage.ToList();
            return Ok(travelpackages);
        }

        // GET api/travelPackages/id
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var travelpackage = _context.TravelPackage.Find(id);
            if (travelpackage == null)
            {
                return NotFound();
            }
            return Ok(travelpackage);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TravelPackages travelPackages)
        {
            if (travelPackages == null)
            {
                return BadRequest();
            }
            _context.TravelPackage.Add(travelPackages);
            _context.SaveChanges();
            // return CreatedAtAction(nameof(GetById), new {id = travelPackages.Id}, travelPackages);
            return Ok(travelPackages);
        }

        [HttpPut("{id}")]

        public IActionResult Update([FromBody] TravelPackages travelpackages, int id)
        {
            var data = _context.TravelPackage.Find(id);
            if (data == null)
            {
                return NoContent();
            }

            data.Description = travelpackages.Description;
            data.Name = travelpackages.Name;
            data.Price = travelpackages.Price;
            data.ImageUrl = travelpackages.ImageUrl;
            _context.SaveChanges();
            return Ok(data);


        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromBody] TravelPackages travelPackages, int id)
        {
            var content = _context.TravelPackage.Find(id);
            if (content == null)
            {
                return NoContent();
            }

            _context.TravelPackage.Remove(content);
            _context.SaveChanges();
            return Ok();

        }

    }


}
