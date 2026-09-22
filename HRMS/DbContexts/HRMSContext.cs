using HRMS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRMS.DbContexts
{
    public class HRMSContext : DbContext
    {

        public HRMSContext(DbContextOptions<HRMSContext> options) : base(options)
        {
            // options
            //  sql provider : sql server, oracle, mysql...
            //  connection stirng
        }


        // Tables <--> DbSet
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}
