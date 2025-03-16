using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[ApiController]
[Route("[controller]")]
public class WaterController
{

    private WaterDbContext _waterContext;

    public WaterController(WaterDbContext temp)
    {
        _waterContext = temp;
    }
    
    [HttpGet("AllProjects")]
    public IEnumerable<Project> GetProjects()
    {
        return _waterContext.Projects.ToList();
    }
    
    [HttpGet("FunctionalProjects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        return _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
    }

}