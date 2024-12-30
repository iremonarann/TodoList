using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoList.Business.Abstract;
using TodoList.Business.Concrete;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Concrete;

public class TodoItemBusiness : ITodoItemService
{
    private readonly TodoContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly ILogger<TodoItemBusiness> _logger;

    public TodoItemBusiness(TodoContext context, IMapper mapper, IConfiguration config, ILogger<TodoItemBusiness> logger)
    {
        _context = context;
        _mapper = mapper;
        _config = config;
        _logger = logger;
    }

    public IEnumerable<TodoItemDetailDto> GetAllTodoItems()
    {
        var items = _context.TodoItems.AsEnumerable();
        var data = _mapper.Map<IEnumerable<TodoItemDetailDto>>(items);

        _logger.LogInformation("Tüm ürünler getirildi");

        return data;
    }

    TodoItemDto ITodoItemService.GetItemById(int id)
    {
        var item = _context.TodoItems
            .Include(t => t.Category)
            .Include(t => t.Priority)
            .Include(t => t.User)
            .SingleOrDefault(t => t.Id == id);

        if (item != null)
        {
            _logger.LogInformation($"{item.Name} ürünü getirildi");
        }
        else
        {
            _logger.LogWarning($"ID {id} ile todo öğesi bulunamadı.");
        }

        return _mapper.Map<TodoItemDto>(item);
    }

    public bool CreateTodoItem(CreateTodoItemDto itemDto)
    {
        _logger.LogInformation("Creating a new todo item.");
        var item = _mapper.Map<TodoItem>(itemDto); 
        item.Created = DateTime.Now;
        item.LastUpdated = DateTime.Now;
        item.isComplete = false;
        _context.TodoItems.Add(item);
        return _context.SaveChanges() > 0;
    }

    public void UpdateTodoItem(UpdateTodoItemDto itemDto)
    {
        var item = _context.TodoItems.SingleOrDefault(t => t.Id == itemDto.Id);

        if (item != null)
        {
            item.LastUpdated = DateTime.Now;

            _mapper.Map(itemDto, item);
            _context.SaveChanges();
        }
    }

    public bool DeleteTodoItemById(int id)
    {
        _logger.LogInformation($"Deleting todo item with id {id}.");
        var item = _context.TodoItems.Find(id);
        if (item == null) return false;

        _context.TodoItems.Remove(item);
        return _context.SaveChanges() > 0;
    }


    public IEnumerable<TodoItemDto> GetItemsByCategoryId(int categoryId)
    {
        _logger.LogInformation($"Fetching todo items for category with id {categoryId}.");
        var todoItems = _context.TodoItems.Where(t => t.CategoryId == categoryId).ToList();
        return _mapper.Map<IEnumerable<TodoItemDetailDto>>(todoItems);
    }

    public IEnumerable<TodoItemDto> GetItemsByPriorityId(int priorityId)
    {
        _logger.LogInformation($"Fetching todo items for priority with id {priorityId}.");
        var todoItems = _context.TodoItems.Where(t => t.PriorityId == priorityId).ToList();
        return _mapper.Map<IEnumerable<TodoItemDetailDto>>(todoItems);
    }

    public IEnumerable<TodoItemDto> GetTodoItemsByUserId(int userId)
    {
        _logger.LogInformation($"Fetching todo items for user with id {userId}.");
        var todoItems = _context.TodoItems.Where(t => t.UserId == userId).ToList();
        return _mapper.Map<IEnumerable<TodoItemDetailDto>>(todoItems);
    }

    public IEnumerable<TodoItemDto> GetTodoItemsByCategoryAndUser(int categoryId, int userId)
    {
        // Kategori ve kullanıcıya göre görevleri filtrele
        var todoItems = _context.TodoItems
            .Where(t => t.CategoryId == categoryId && t.UserId == userId)
            .ToList();

        return _mapper.Map<IEnumerable<TodoItemDetailDto>>(todoItems); 
    }




}
