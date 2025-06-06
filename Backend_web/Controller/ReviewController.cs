using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wandermate.Data;
using Wandermate.DTO;
using Wandermate.Models;

namespace Wandermate.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Review
                                .Include(r => r.Hotel)
                                // .Include(r => r.User)
                                .ToListAsync();
        }

        [HttpPost]

        public async Task<ActionResult<IEnumerable<Review>>> Create([FromBody] ReviewDto reviewDto)
        {
            try
            {
                var review = new Review
                {
                    Rating = reviewDto.Rating,
                    ReviewText = reviewDto.ReviewText,
                    HotelId = reviewDto.HotelId

                };

                await _context.Review.AddAsync(review);
                await _context.SaveChangesAsync();

                return Ok(review);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            var findReviews = _context.Review.Find(id);

            if (findReviews == null)
            {
                return NotFound();
            }

            _context.Review.Remove(findReviews);
            _context.SaveChanges();
            return Ok("Deleted Sucessfully");

        }
    }
}
