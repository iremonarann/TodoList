using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Abstract;

public interface IUserService
{
    bool CreateUser(CreateUserDto dto, out string errorMessage);
    void UpdateUser(UpdateUserDto dto);
    bool DeleteUserById(int id);
    IEnumerable<UserDto> GetAllUsers();
    UserDto GetUserById(int id);
    UserDto GetUserByUsername(string userName);
    IEnumerable<TodoItemDto> GetTodoItemsByUserId(int userId);
    UserDto LoginUser(LoginUserDto dto);

    bool RegisterUser(RegisterUserDto dto, out string errorMessage);
}




