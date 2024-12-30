using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Concrete;

public class UserBusiness : IUserService
{
    private readonly TodoContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly ILogger<UserBusiness> _logger;

    public UserBusiness(TodoContext context, IMapper mapper, ILogger<UserBusiness> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public bool CreateUser(CreateUserDto newUserDto, out string errorMessage)
    {
        var existingUser = _context.Users.SingleOrDefault(u => u.Username == newUserDto.Username);

        if (existingUser != null)
        {
            errorMessage = "Bu kullanıcı adı zaten mevcut!";
            return false;
        }

        var user = _mapper.Map<User>(newUserDto);
        _context.Users.Add(user);
        var result = _context.SaveChanges();

        if (result > 0)
        {
            errorMessage = null;
            return true;
        }

        errorMessage = "Kayıt işlemi sırasında bir hata oluştu.";
        return false;
    }

    public bool RegisterUser(RegisterUserDto newUserDto, out string errorMessage)
    {
        var existingUser = _context.Users.SingleOrDefault(u => u.Username == newUserDto.Username);

        if (existingUser != null)
        {
            errorMessage = "Bu kullanıcı adı zaten mevcut!";
            return false;
        }

        var user = _mapper.Map<User>(newUserDto);

        user.RoleId = 2;

        _context.Users.Add(user);
        var result = _context.SaveChanges();

        if (result > 0)
        {
            errorMessage = null;
            return true;
        }

        errorMessage = "Kayıt işlemi sırasında bir hata oluştu.";
        return false;
    }



    public bool DeleteUserById(int id)
    {
        _logger.LogInformation($"ID {id} ile kullanıcı siliniyor.");
        var user = _context.Users.Find(id);
        if (user == null) return false;

        _context.Users.Remove(user);
        return _context.SaveChanges() > 0;
    }

    public IEnumerable<UserDto> GetAllUsers()
    {
        _logger.LogInformation("Tüm kullanıcılar getiriliyor.");
        var users = _context.Users.ToList();
        return _mapper.Map<IEnumerable<UserDto>>(users);
    }


    public IEnumerable<TodoItemDto> GetTodoItemsByUserId(int userId)
    {
        _logger.LogInformation($"ID {userId} ile kullanıcının todo öğeleri getiriliyor.");
        var todoItems = _context.TodoItems.Where(t => t.UserId == userId).ToList();
        return _mapper.Map<IEnumerable<TodoItemDto>>(todoItems);
    }

    public UserDto GetUserById(int id)
    {
        _logger.LogInformation($"ID {id} ile kullanıcı getiriliyor.");
        var user = _context.Users.Find(id);
        return _mapper.Map<UserDto>(user);
    }

    public UserDto GetUserByUsername(string userName)
    {
        _logger.LogInformation($"Kullanıcı adı ile kullanıcı getiriliyor: {userName}");
        var user = _context.Users.SingleOrDefault(u => u.Username == userName);
        return _mapper.Map<UserDto>(user);
    }

    public UserDto LoginUser(LoginUserDto dto)
    {
        _logger.LogInformation($"Kullanıcı adı ile giriş yapılıyor: {dto.Username}");

        var user = _context.Users.SingleOrDefault(u => u.Username == dto.Username && u.Password == dto.Password);

        if (user == null)
        {
            return null;
        }

        return _mapper.Map<UserDto>(user);


    }


    public void UpdateUser(UpdateUserDto dto)
    {
        var user = _context.Users.SingleOrDefault(t => t.Id == dto.Id);

        _mapper.Map(dto, user);
        _context.SaveChanges();
    }
}
