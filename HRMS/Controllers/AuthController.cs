using HRMS.DbContexts;
using HRMS.Dtos.Auth;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HRMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HRMSContext _dbContext;// = new HRMSContext();

        public AuthController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            // admin // ADMIN
            var user = _dbContext.Users.FirstOrDefault(x => x.Username.ToUpper() == loginDto.Username.ToUpper());

            if(user == null)
            {
                return Unauthorized(new Exception ("Invalid Username Or Password"));//401
            }

            // [ Salt, Cost Factor] "$2a$11$CvI/yU1KQfZkycureOco4.nh1IeL8f.uD6rR6s99l.fmCaRLbsfU6" == Admin@123
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.HashedPassword))
            {
                return Unauthorized(new Exception("Invalid Username Or Password"));//401
            }

            // Generate Token

            string token = GenerateToken(user);

            return Ok(token);
        }

        private string GenerateToken(User user)
        {
            // Claims => User Info
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));//UserId // Key/Value
            claims.Add(new Claim(ClaimTypes.Name, user.Username));//UserId // Key/Value

            // Role => Admin, HR, Developer, Manager ...
            if (user.IsAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
                // Employee => Position
                var employee = _dbContext.Employees.Include(x => x.Lookup).FirstOrDefault(x => x.UserId == user.Id);
                claims.Add(new Claim(ClaimTypes.Role, employee.Lookup.Name));
            }

            // Secert Key + Signing
            // WHAFWEI#!@S!!112312WQEQW@RWQEQW432
            // [68, 55, 31...]
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WHAFWEI#!@S!!112312WQEQW@RWQEQW432"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            // Token Settings
            var tokenSettings = new JwtSecurityToken(
                    claims: claims,
                    signingCredentials: creds,
                    expires: DateTime.Now.AddDays(1)
                );

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenSettings);



            return token;
        }
    }
}
