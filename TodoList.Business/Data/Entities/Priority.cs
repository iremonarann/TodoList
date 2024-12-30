namespace TodoList.Business.Data.Entities;

public class Priority
{
    public int Id { get; set; }
    public string Level { get; set; }

    public ICollection<TodoItem> TodoItems { get; set; }
}
