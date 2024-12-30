using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using TodoList.Api.Models;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Dtos;

namespace TodoList.Api.Controllers;

[Authorize(Policy = "AdminOnly")]
[Route("api/[controller]")]
[ApiController]
public class AccountsController : ControllerBase
{
    readonly IConfiguration _configuration;
    private readonly TodoContext _context;
    private readonly IRoleService _roleService;

    public AccountsController(IConfiguration configuration, TodoContext context, IRoleService roleService)  
    {
        _configuration = configuration;
        _context = context;
        _roleService = roleService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel loginModel)
    {

        var user = _context.Users.FirstOrDefault(u => u.Username == loginModel.Username && u.Password == loginModel.Password);

        if (user == null)
            return Unauthorized();

        var role = _roleService.GetRoleNameByUserId(user.Id);

        if (role == null)
            return Unauthorized("Role not found for the user");


        var claims = new List<Claim>() {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), 
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.GivenName, user.Name + user.Surname),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, role.RoleName)
    };

        var key = _configuration.GetValue<string>("Authentication:Jwt:SecretKey");
        var issuer = _configuration.GetValue<string>("Authentication:Jwt:Issuer");

        var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credential = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: credential,
            claims: claims);


        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            id = user.Id,
            name = user.Name,
            surname = user.Surname,
            username = user.Username,
            email = user.Email
        });
    }



    [Authorize]
    [AllowAnonymous]
    [HttpGet("fetch-admin-data")]
    public IActionResult FetchAdminData()
    {
        var claimsIdentity = User.Identity as ClaimsIdentity;

        if (claimsIdentity != null)
        {
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            return Ok(new
            {
                Message = "Admin data fetched successfully",
                UserId = userId,
                UserName = userName
            });
        }

        return Unauthorized();  
    }


}
