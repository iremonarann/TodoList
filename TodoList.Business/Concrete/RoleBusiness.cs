using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Concrete;

public class RoleBusiness : IRoleService
{
    private readonly TodoContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly ILogger<RoleBusiness> _logger;

    public RoleBusiness(TodoContext context, IMapper mapper, ILogger<RoleBusiness> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public bool CreateRole(CreateRoleDto dto)
    {
        _logger.LogInformation("Yeni bir rol oluşturuluyor.");
        var role = _mapper.Map<Role>(dto);
        _context.Roles.Add(role);
        return _context.SaveChanges() > 0;
    }

    public bool DeleteRoleById(int id)
    {
        _logger.LogInformation($"ID {id} ile rol siliniyor.");
        var role = _context.Roles.Find(id);
        if (role == null) return false;

        _context.Roles.Remove(role);
        return _context.SaveChanges() > 0;
    }

    public RoleDetailDto GetRoleNameByUserId(int userId)
    {
        var user = _context.Users
                        .Where(u => u.Id == userId)
                        .Select(u => new RoleDetailDto
                        {
                            RoleId = u.Role.Id,
                            RoleName = u.Role.Name
                        })
                        .FirstOrDefault();

        return user ?? null;
    }
}
