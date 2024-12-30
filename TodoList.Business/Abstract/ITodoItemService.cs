using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Abstract;

public interface ITodoItemService
{
    bool CreateTodoItem(CreateTodoItemDto dto);
    void UpdateTodoItem(UpdateTodoItemDto dto);
    bool DeleteTodoItemById(int id);
    IEnumerable<TodoItemDetailDto> GetAllTodoItems();
    TodoItemDto GetItemById(int id);
    IEnumerable<TodoItemDto> GetTodoItemsByUserId(int userId);
    IEnumerable<TodoItemDto> GetItemsByCategoryId(int categoryId);
    IEnumerable<TodoItemDto> GetItemsByPriorityId(int priorityId);
    IEnumerable<TodoItemDto> GetTodoItemsByCategoryAndUser(int categoryId, int userId);
}





