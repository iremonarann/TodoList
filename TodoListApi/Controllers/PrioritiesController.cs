using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class PrioritiesController : ControllerBase
{
    private readonly IPriorityService _priorityService;

    public PrioritiesController(IPriorityService priorityService)
    {
        _priorityService = priorityService;
    }

    
    [HttpGet]
    public IActionResult Get()
    {
        var res = _priorityService.GetAllPriorities();
        return Ok(res);
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreatePriorityDto priority)
    {
        var res = _priorityService.CreatePriority(priority);
        if(res) return Ok(res);
        return BadRequest("Priority could not be created!");
    }

    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] UpdatePriorityDto priority)
    {
        priority.Id = id;
        _priorityService.UpdatePriority(priority);

        return NoContent();
    }
}


