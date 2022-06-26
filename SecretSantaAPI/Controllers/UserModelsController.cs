using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SecretSantaAPI.Data;
using SecretSantaAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Text;
using System.Security.Cryptography;

namespace SecretSantaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserModelsController : ControllerBase
    {
        private readonly DataContext _context;
        public UserModelsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> Get()
        {
            return Ok(await _context.UserModels.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserFromId(int id)
        {
            var user = await _context.UserModels.FindAsync(id);
            if (user == null) return BadRequest("No user found");
            return Ok(user);
        }
        [HttpGet("byUsername/{name}")]
        public async Task<ActionResult<UserModel>> GetUserFromId(string name)
        {
            var user = await _context.UserModels.FirstOrDefaultAsync(req => req.Username == name);
            if (user == null) return BadRequest("0");

            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<List<UserModel>>> AddUser(UserModel user)
        {
            var sha = SHA256.Create();

            var pwHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(user.Password)));
            user.Password = pwHash;
            _context.UserModels.Add(user);
            await _context.SaveChangesAsync();
            return Ok(await _context.UserModels.ToListAsync());
        }
    }
}
