using Microsoft.EntityFrameworkCore;
using TodoList.Business.Data.Entities;

namespace TodoList.Business.Data.Contexts;

public class TodoContext : DbContext
{
  
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {

    }

    public DbSet<Entities.TodoItem> TodoItems { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Priority> Priority { get; set; }

    public DbSet<Role> Roles { get; set; }




    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=LAPTOP-EK6RLAM4\\MSSQLSERVER01; Trusted_Connection=True;TrustServerCertificate=True; Database=TodoListDb");

        base.OnConfiguring(optionsBuilder);


    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Entities.TodoItem>()
            .HasOne(t => t.User)
            .WithMany(u => u.TodoItems)
            .HasForeignKey(t => t.UserId);

        modelBuilder.Entity<Entities.TodoItem>()
            .HasOne(t => t.Category)
            .WithMany(u => u.TodoItems)
            .HasForeignKey(t => t.CategoryId);

        modelBuilder.Entity<Entities.TodoItem>()
            .HasOne(t => t.Priority)
            .WithMany(u => u.TodoItems)
            .HasForeignKey(t => t.PriorityId);

        modelBuilder.Entity<Entities.User>()
            .HasOne(t => t.Role)
            .WithMany(u => u.Users)
            .HasForeignKey(t => t.RoleId);


        base.OnModelCreating(modelBuilder);
    }
}