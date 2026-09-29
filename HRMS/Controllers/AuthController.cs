using HRMS.DbContexts;
using HRMS.Dtos.Auth;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            return "";
        }
    }
}
