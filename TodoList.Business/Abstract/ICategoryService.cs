using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Abstract;

public interface ICategoryService
{
    bool CreateCategory(CreateCategoryDto dto);
    void UpdateCategory(UpdateCategoryDto dto);
    bool DeleteCategoryById(int id);
    IEnumerable<CategoryDto> GetAllCategories();
    CategoryDto GetCategoryById(int id);
    IEnumerable<CategoryDto> GetUserCategories(int userId);
}

