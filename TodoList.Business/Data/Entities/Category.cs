namespace TodoList.Business.Data.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<TodoItem> TodoItems { get; set; }
}