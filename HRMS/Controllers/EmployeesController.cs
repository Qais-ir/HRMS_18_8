using HRMS.DbContexts;
using HRMS.Dtos.Employees;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.Arm;

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


        // CRUD Operations
        // C : Create
        // R : Read
        // U : Update
        // D : Delete

        [HttpGet]
        public IActionResult GetByCriteria([FromQuery] SearchEmployeeDto searchEmployeeDto)
        {
            // join dep in _dbContext.Departments on emp.DepartmentId equals dep.Id
            var data = from emp in _dbContext.Employees
                       from dep in _dbContext.Departments.Where(x => x.Id == emp.DepartmentId).DefaultIfEmpty()
                       from manager in _dbContext.Employees.Where(x => x.Id == emp.ManagerId).DefaultIfEmpty()
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
                           Salary = emp.Salary,
                           DepartmentId = dep.Id,//emp.DepartmentId,
                           DepartmentName = dep.Name,
                           ManagerId = manager.Id,//emp.ManagerId
                           ManagerName = manager.FirstName + " " + manager.LastName,
                       };

            return Ok(data);
        }

        [HttpGet("{id:long}")] // Route Parameter
        public IActionResult GetById(long id)
        {
            //var data = employees.Where(x => x.Id == id);

          //  var data = _dbContext.Employees.Join(
          //    _dbContext.Departments,
          //    employee => employee.DepartmentId,
          //    department => department.Id,
          //    (employee, department) => new EmployeeDto
          //    {
          //        Id = employee.Id,
          //        FullName = employee.FirstName + " " + employee.LastName,
          //        Position = employee.Position,
          //        BirthDate = employee.BirthDate,
          //        StartDate = employee.StartDate,
          //        EndDate = employee.EndDate,
          //        DepartmentId = employee.DepartmentId,
          //        DepartmentName = department.Name,
          //    }
          //).FirstOrDefault(x => x.Id == id);

            var data = _dbContext.Employees.Select(x => new EmployeeDto
            {
                Id = x.Id,
                FullName = x.FirstName + " " + x.LastName,
                Position = x.Position,
                BirthDate = x.BirthDate,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Salary = x.Salary,
                DepartmentId = x.DepartmentId,//emp.DepartmentId,
                //DepartmentName = dep.Name,
                ManagerId = x.ManagerId,//emp.ManagerId
                //ManagerName = manager.FirstName + " " + manager.LastName,
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
                Id = 0,//(employees.LastOrDefault()?.Id ?? 0) + 1,
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Position = employeeDto.Position,
                BirthDate = employeeDto.BirthDate,
                StartDate = employeeDto.StartDate,
                EndDate = employeeDto.EndDate,
                Email = employeeDto.Email,
                IsActive = employeeDto.IsActive,
                PhoneNumber = employeeDto.PhoneNumber,
                Salary = employeeDto.Salary,
                DepartmentId = employeeDto.DepartmentId,
                ManagerId = employeeDto.ManagerId
            };

            _dbContext.Employees.Add(employee);

            _dbContext.SaveChanges(); // --> Go's To Database
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

            var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == employeeDto.Id);
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
            employee.DepartmentId = employeeDto.DepartmentId;
            employee.ManagerId = employeeDto.ManagerId;

            _dbContext.SaveChanges();

            return Ok();

        }

        [HttpDelete("{id:long}")]
        public IActionResult Delete(long id)
        {
            var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == id);
            if(employee == null)
            {
                return NotFound(new Exception("Employee Not Found"));
            }

            _dbContext.Employees.Remove(employee);
            _dbContext.SaveChanges();
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