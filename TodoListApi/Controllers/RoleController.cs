using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Business.Abstract;
using TodoList.Business.Dtos;


namespace TodoList.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreateRoleDto role)
    {
        var res = _roleService.CreateRole(role);
        if (res) return Ok(res);
        return BadRequest("Role could not be created!");
    }


    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var res = _roleService.DeleteRoleById(id);
        if (res) return Ok();
        return BadRequest("Role could not be deleted!");
    }

    [HttpGet("user/{id:int}")]
    public IActionResult GetRoleNameByUserId(int id)
    {
        var role = _roleService.GetRoleNameByUserId(id);
        if (role != null) return Ok(role);
        return NotFound("User or Role not found");
    }

}
