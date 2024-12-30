using AutoMapper;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;


namespace TodoList.Business.Profiles;

public class DtoToEntityProfile : Profile
{
    public DtoToEntityProfile()
    {
        // TodoItem mappings
        CreateMap<TodoItem, TodoItemDto>().ReverseMap();
        CreateMap<TodoItem, TodoItemDetailDto>().ReverseMap();
        CreateMap<TodoItem, CreateTodoItemDto>().ReverseMap();
        CreateMap<TodoItem, UpdateTodoItemDto>().ReverseMap();

        // Category mappings
        CreateMap<Category, CategoryDto>().ReverseMap();
        CreateMap<Category, CreateCategoryDto>().ReverseMap();
        CreateMap<Category, UpdateCategoryDto>().ReverseMap();

        // Priority mappings
        CreateMap<Priority, PriorityDto>().ReverseMap();
        CreateMap<Priority, CreatePriorityDto>().ReverseMap();
        CreateMap<Priority, UpdatePriorityDto>().ReverseMap();

        // User mappings
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<User, CreateUserDto>().ReverseMap();
        CreateMap<User, UpdateUserDto>().ReverseMap();
        CreateMap<User, LoginUserDto>().ReverseMap();
        CreateMap<User, RegisterUserDto>().ReverseMap();

        // Role mappings
        CreateMap<Role, CreateRoleDto>().ReverseMap(); 
        CreateMap<Role, RoleDetailDto>().ReverseMap();
        CreateMap<Role, RoleDto>().ReverseMap();
    }

}