using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SecretSantaAPI.Data;
using SecretSantaAPI.Models;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using Microsoft.AspNetCore.Cors;

namespace SecretSantaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        protected JwtSecurityToken ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch
            {
                return null;
            }
        }

        [HttpGet("getUserDTOFromToken/{token}")]
        public async Task<ActionResult<Tuple<string, string>>> GetUserFromToken(String token)
        {
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
            JwtSecurityToken jwtSecurityToken = ValidateToken(token);
            try
            {
#nullable enable
                string? name = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value.ToString();
                string? role = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value.ToString();
#nullable disable
                return Ok(new Tuple<string, string>(name, role));
            }
            catch
            {
                return BadRequest(new Tuple<string, string>("", ""));
            }
        }
        private string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleType),Enum.Parse<RoleType>(user.RoleName)))
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                ); 

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            if (request == null) return "Error";

            UserModel user = await _context.UserModels.Where(u => u.Username.Equals(request.Username)).FirstOrDefaultAsync();

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(request.Password)));

            if (user == null || !passwordHash.Equals(user.Password))
                return "Error";

            string token = CreateToken(user);
            return Ok(token);
        }


        // initialize
        [HttpGet("CreateFirstData")]
        public async Task<ActionResult<UserModel>> CreateFirstData()
        {
            await _context.SaveChangesAsync();
            
            if (!_context.UserModels.Any())
            {
                var sha = SHA256.Create();

                var pwHash1 = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("adminpw")));

                var pwHash2 = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("userpw")));

                
                UserModel user1 = new UserModel("User1", pwHash2, "User");
                UserModel user2 = new UserModel("User2", pwHash2, "User");
                UserModel user3 = new UserModel("User3", pwHash2, "User");
                UserModel user4 = new UserModel("User4", pwHash2, "User");
                UserModel user5 = new UserModel("User5", pwHash2, "User");
                UserModel admin = new UserModel("Admin", pwHash1, "Admin");

                _context.UserModels.Add(admin);
                _context.UserModels.Add(user1);
                _context.UserModels.Add(user2);
                _context.UserModels.Add(user3);
                _context.UserModels.Add(user4);
                _context.UserModels.Add(user5);
            }
            await _context.SaveChangesAsync();
            return Ok(await _context.UserModels.ToListAsync());
        }
    }
}
