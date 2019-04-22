using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CRUD_API_REST.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRUD_API_REST.Controllers
{
    
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private  UserContext _context;

        //api/user/
        public UserController(UserContext context)
        {
            _context = context;
            if(_context.usuario.Count() == 0)
            {
                _context.usuario.Add(new usuario { name = "Default Name" });
                _context.SaveChanges();
            }
        }
        //api/user/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<usuario>>> GetAllitems()
        {
            return await _context.usuario.ToListAsync();
        }
        //api/user/3
        [HttpGet("{id}")]
        public async Task<ActionResult<usuario>>GetUsuarioitem(int id)
        {
            var userItem = await _context.usuario.FindAsync(id);
            if (userItem == null)
            {
                return NotFound();
            }

            return userItem;
        }

        [HttpPost]
        public async Task<ActionResult<usuario>> PostUserItem(int id, string name, int age, char sex)
        {
            usuario item = new usuario { id = id, name = name, age = age, sex = sex };
            _context.usuario.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUsuarioitem), new { id = id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserItem(int id , string name, int age, char sex)
        {
            usuario item = new usuario { id = id, name = name, age = age, sex = sex };
            if (id != item.id)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserItem(int id)
        {
            var item = await _context.usuario.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.usuario.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}
