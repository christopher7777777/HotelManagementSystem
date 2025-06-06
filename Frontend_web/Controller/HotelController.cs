using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wandermate.backened.Models;
using Wandermate.Data;
using Wandermate.DTO.HotelDTO;

namespace Wandermate.Controller
{
    [Route("Wandermate/hotel")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HotelController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET Wandermate/hotel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetHotelDTO>>> Get()
        {
            try
            {
                var hotels = await _context.Hotel
                    .Select(hotel => new GetHotelDTO
                    {
                        Id = hotel.Id,
                        Name = hotel.Name,
                        Description = hotel.Description,
                        Price = hotel.Price,
                        ImageUrl = hotel.ImageUrl,
                    }).ToListAsync();

                return Ok(hotels);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET Wandermate/hotel/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GetHotelDTO>> GetById(int id)
        {
            try
            {
                var hotel = await _context.Hotel
                    .Select(h => new GetHotelDTO
                    {
                        Name = h.Name,
                        Description = h.Description,
                        Price = h.Price,
                        ImageUrl = h.ImageUrl,
                    }).FirstOrDefaultAsync();

                if (hotel == null)
                {
                    return NotFound();
                }

                return Ok(hotel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST Wandermate/hotel
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HotelDTO hotelDTO)
        {
            try
            {
                var hotel = new Hotel
                {
                    Name = hotelDTO.Name,
                    Description = hotelDTO.Description,
                    Price = hotelDTO.Price,
                    ImageUrl = hotelDTO.ImageUrl
                };

                await _context.Hotel.AddAsync(hotel);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = hotel.Id }, hotel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT Wandermate/hotel/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HotelDTO hotelDTO)
        {
            try
            {
                var updateData = await _context.Hotel.FindAsync(id);
                if (updateData == null)
                {
                    return NotFound();
                }

                updateData.Name = hotelDTO.Name;
                updateData.Description = hotelDTO.Description;
                updateData.Price = hotelDTO.Price;
                updateData.ImageUrl = hotelDTO.ImageUrl;

                _context.Hotel.Update(updateData);
                await _context.SaveChangesAsync();

                return Ok(updateData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE Wandermate/hotel/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var content = await _context.Hotel.FindAsync(id);
                if (content == null)
                {
                    return NotFound();
                }

                _context.Hotel.Remove(content);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
