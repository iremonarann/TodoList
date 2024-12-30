namespace TodoList.Business.Dtos;

public class CategoryDetailDto : CategoryDto
{
    public List<TodoItemDto> TodoItems { get; set; }
}
