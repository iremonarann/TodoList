using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoList.Business.Data.Entities;

public class TodoItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool isComplete { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastUpdated { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; }

    public int PriorityId { get; set; }
    public Priority Priority { get; set; }

}
