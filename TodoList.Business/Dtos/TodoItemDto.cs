using TodoList.Business.Data.Entities;

namespace TodoList.Business.Dtos;

public class TodoItemDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsComplete { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastUpdated { get; set; }

   
}



