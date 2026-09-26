namespace HRMS.Dtos.Employees
{
    public class SearchEmployeeDto
    {
        public long? PositionId { get; set; }
        public string? Name { get; set; }
        public bool? IsActive { get; set; }
    }
}
