using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class TodoItemsController : ControllerBase
{

    private readonly ITodoItemService _todoItemService;

    public TodoItemsController(ITodoItemService todoItemService)
    {
        _todoItemService = todoItemService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var res = _todoItemService.GetAllTodoItems();
        return Ok(res);
    }

    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        var res = _todoItemService.GetItemById(id);
        if(res == null) return NotFound();
        return Ok(res);
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreateTodoItemDto item)
    {
        var res = _todoItemService.CreateTodoItem(item);
        if(res) return Ok(res);
        return BadRequest("Todo item could not be created!");
    }

    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] UpdateTodoItemDto item )
    {
        item.Id = id;
        _todoItemService.UpdateTodoItem(item);

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var res = _todoItemService.DeleteTodoItemById(id);
        if(res) return Ok();
        return BadRequest("Todo item could not be deleted!");
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetTodoItemsByUserId(int userId)
    {
        var res = _todoItemService.GetTodoItemsByUserId(userId);
        return Ok(res);
    }

    [HttpGet("category/{categoryId}")]
    public IActionResult GetItemsByCategoryId(int categoryId)
    {
        var res = _todoItemService.GetItemsByCategoryId(categoryId);
        return Ok(res);
    }

    [HttpGet("priority/{priorityId}")]
    public IActionResult GetItemsByPriorityId(int priorityId)
    {
        var res = _todoItemService.GetItemsByPriorityId(priorityId);
        return Ok(res);
    }

    [HttpGet("category/{categoryId}/user/{userId}")]
    public IActionResult GetTodoItemsByCategoryAndUser(int categoryId, int userId)
    {
        var todoItems = _todoItemService.GetTodoItemsByCategoryAndUser(categoryId, userId);

        if (todoItems == null || !todoItems.Any())
        {
            return NotFound("Belirtilen kategori ve kullanıcı için görev bulunamadı.");
        }

        return Ok(todoItems);  
    }

}
