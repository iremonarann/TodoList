namespace TodoList.Business.Dtos;

public class UpdateTodoItemDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsComplete { get; set; }
    public DateTime DueDate { get; set; }
    public int CategoryId { get; set; }
    public int PriorityId { get; set; }
}

