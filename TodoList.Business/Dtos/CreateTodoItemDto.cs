using TodoList.Business.Data.Entities;

namespace TodoList.Business.Dtos;

public class CreateTodoItemDto
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool isComplete { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastUpdated { get; set; }

    public int UserId { get; set; }

    public int CategoryId { get; set; }


    public int PriorityId { get; set; }

}

