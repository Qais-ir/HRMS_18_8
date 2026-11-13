using HRMS.DbContexts;
using HRMS.Dtos.Departments;
using HRMS.Dtos.Shared;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LookupsController : ControllerBase
    {
        private readonly HRMSContext _dbContext;
        public LookupsController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetByMajorCode([FromQuery] int majorCode)
        {
            try
            {
                var data = from lookup in _dbContext.Lookups
                           where lookup.MajorCode == majorCode && lookup.MinorCode != 0
                           select new ListDto
                           {
                               Id = lookup.Id,
                               Name = lookup.Name,
                           };

                return Ok(data); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Exception(ex.Message));
            }
        }
    }
}
