namespace TodoList.Business.Data.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public ICollection<TodoItem> TodoItems { get; set; }

    public int RoleId { get; set; }
    public Role Role { get; set; }


}
