using HRMS.DbContexts;
using HRMS.Dtos.Employees;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Controllers
{
    // Data Annotation
    [Route("api/[controller]")] // api/Employees
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        // Dependcey Injuction
        private readonly HRMSContext _dbContext;// = new HRMSContext();

        public EmployeesController(HRMSContext dbContext)
        {
            _dbContext = dbContext;
        }
        // Mockup Data
        public static List<Employee> employees = new List<Employee>()
        {
            new Employee(){ Id = 1, FirstName = "Ahmad", LastName = "Nasser", Email = "Ahmad@123.com", Position = "Developer", BirthDate = new DateTime(1995,1,25), PhoneNumber = "+9627516848", IsActive = true, StartDate = new DateTime(), Salary = 1000},
            new Employee(){ Id = 2, FirstName = "Layla", LastName = "Kareem", Email = "Layla@123.com", Position = "HR", BirthDate = new DateTime(2000,1,25), PhoneNumber = "+9625588625", IsActive = true, StartDate = new DateTime(2026, 1, 1), Salary = 1000},
            new Employee(){ Id = 3, FirstName = "Yousef", LastName = "Faris", Email = "Yousef@123.com", Position = "Manager", BirthDate = new DateTime(1996,1,25), PhoneNumber = "+9625588625", IsActive = true, StartDate = new DateTime(2026, 1, 1), Salary = 1200},
            new Employee(){ Id = 4, FirstName = "Nadia", LastName = "Zaid", Email = "Nadia@123.com", Position = "Developer", BirthDate = new DateTime(1999,1,25), PhoneNumber = "+9625588625", IsActive = true, StartDate = new DateTime(2026, 1, 1), Salary = 800}
        };

        // CRUD Operations
        // C : Create
        // R : Read
        // U : Update
        // D : Delete

        [HttpGet]
        public IActionResult GetByCriteria([FromQuery] SearchEmployeeDto searchEmployeeDto)
        {
            var data = from emp in _dbContext.Employees
                       where 
                           (searchEmployeeDto.Position == null || emp.Position.ToUpper().Contains(searchEmployeeDto.Position.ToUpper())) &&
                           (searchEmployeeDto.Name == null || emp.FirstName.ToUpper().Contains(searchEmployeeDto.Name.ToUpper())) &&
                           (searchEmployeeDto.IsActive == null || emp.IsActive == searchEmployeeDto.IsActive)
                       orderby emp.Id descending
                       select new EmployeeDto
                       {
                           Id = emp.Id,
                           FullName = emp.FirstName + " " + emp.LastName,
                           Position = emp.Position,
                           BirthDate = emp.BirthDate,
                           StartDate = emp.StartDate,
                           EndDate = emp.EndDate,
                           Salary = emp.Salary
                       };

            return Ok(data);
        }

        [HttpGet("{id:long}")] // Route Parameter
        public IActionResult GetById(long id)
        {
            //var data = employees.Where(x => x.Id == id);

            var data = employees.Select(x => new EmployeeDto
            {
                Id = x.Id,
                FullName = x.FirstName + " " + x.LastName,
                Position = x.Position,
                BirthDate = x.BirthDate,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Salary = x.Salary
            }).FirstOrDefault(x => x.Id == id);// .SingleOrDefault(x => x.Id == id);

            if (data == null) // No Employee
            {
                return NotFound(new Exception("Employee Not Found"));
            }

            return Ok(data);

        }

        [HttpPost]
        public IActionResult Create([FromBody] SaveEmployeeDto employeeDto)
        {
            var employee = new Employee()
            {
                Id = (employees.LastOrDefault()?.Id ?? 0) + 1,
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Position = employeeDto.Position,
                BirthDate = employeeDto.BirthDate,
                StartDate = employeeDto.StartDate,
                EndDate = employeeDto.EndDate,
                Email = employeeDto.Email,
                IsActive = employeeDto.IsActive,
                PhoneNumber = employeeDto.PhoneNumber,
                Salary = employeeDto.Salary
            };

            employees.Add(employee);
            return Ok(employee.Id);
        }

        [HttpPut("{id:long}")] // Update
        //[HttpPatch] // Update
        public IActionResult Update(long id,[FromBody] SaveEmployeeDto employeeDto)
        {
            if (id != employeeDto.Id)
            {
                return BadRequest(new Exception("Id Mismatch"));
            }

            var employee = employees.FirstOrDefault(x => x.Id == employeeDto.Id);
            if (employee == null) 
            {
                return NotFound(new Exception("Employee Not Found"));
            }

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
            employee.Position = employeeDto.Position;
            employee.BirthDate = employeeDto.BirthDate;
            employee.StartDate = employeeDto.StartDate;
            employee.EndDate = employeeDto.EndDate;
            employee.Email = employeeDto.Email;
            employee.IsActive = employeeDto.IsActive;
            employee.Salary = employeeDto.Salary;
            employee.PhoneNumber = employeeDto.PhoneNumber;

            return Ok();

        }

        [HttpDelete("{id:long}")]
        public IActionResult Delete(long id)
        {
            var employee = employees.FirstOrDefault(x => x.Id == id);
            if(employee == null)
            {
                return NotFound(new Exception("Employee Not Found"));
            }

            employees.Remove(employee);
            return Ok();
        }

    }


}


// Simple Data Type => string, int, double.... --> (By Default) Query Parameter
// Complix Data Type => Model, Dto, Object... --> (By Default) Request Body

// FromQuery => Query Parameter
// FromBody => Request Body

// Endpoint Can Use Multiple Parameters of type [FromQuery]
// Endpoint Can Not use multiple parameters of type [FromBody]