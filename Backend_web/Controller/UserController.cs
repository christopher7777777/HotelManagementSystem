using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wandermate.Data;
using Wandermate.DTO;
using Wandermate.Models;

namespace Wandermate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var user = _context.User.ToList();
            return Ok(user);

        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<User>>> Create([FromBody] UserDto user)
        {
            try
            {
                var User = new User
                {
                    Name = user.Name,
                    Role = user.Role,
                    UserName = user.Username,
                    Password = user.Password
                };

                await _context.User.AddAsync(User);
                await _context.SaveChangesAsync();

                return Ok(User);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }
    }
}
