namespace TodoList.Business.Dtos;

public class UserDetailDto : UserDto
{
    public List<TodoItemDto> TodoItems { get; set; }
}
