using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var res = _userService.GetAllUsers();
        return Ok(res);
    }

    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        var res = _userService.GetUserById(id);
        if(res == null) return NotFound();
        return Ok(res);
    }

    [HttpGet("by-username/{username}")]
    public IActionResult Get(string username)
    {
        var res = _userService.GetUserByUsername(username);
        if(res == null) return NotFound();
        return Ok(res);
    }


    [HttpPost()]
    public IActionResult Post([FromBody] CreateUserDto newUser)
    {
        string errorMessage;
        var result = _userService.CreateUser(newUser, out errorMessage);

        if (!result)
        {
            return BadRequest(new { message = errorMessage });
        }

        return Ok(new { message = "Kullanıcı başarıyla kaydedildi." });
    }


    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterUserDto newUser)
    {
        string errorMessage;
        var result = _userService.RegisterUser(newUser, out errorMessage);

        if (!result)
        {
            return BadRequest(new { message = errorMessage });
        }

        return Ok(new { message = "Kullanıcı başarıyla kaydedildi." });
    }




    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginUserDto user)
    {
        var res = _userService.LoginUser(user);

        if (res == null)
        {
            return Unauthorized("Kullanıcı adı veya şifre hatalı!");
        }

        return Ok(res);
    }



    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] UpdateUserDto user)
    {
        user.Id = id;
        _userService.UpdateUser(user);

        return NoContent();

    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var res =_userService.DeleteUserById(id);
        if (res) return Ok();
        return BadRequest("User could not be deleted!");
    }

    [HttpGet("{id:int}/todo-items")]
    public IActionResult GetTodoItemsByUserId(int id)
    {
        var res = _userService.GetTodoItemsByUserId(id);
        return Ok(res);

    }

}




      
   