namespace TodoList.Business.Dtos;

public class TodoItemDetailDto : TodoItemDto
{
    public int UserId { get; set; }
    public int CategoryId { get; set; }
    public int PriorityId { get; set; }
    
}
