using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wandermate.Data;
using Wandermate.Models;

namespace Wandermate.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var booking = await _context.Booking.ToListAsync();
            return Ok(booking);
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> Post([FromBody] Booking booking)
        {
            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(booking);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetById(int id)
        {
            var booking = await _context.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }
        
        
    }
}
