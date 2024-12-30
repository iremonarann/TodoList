using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Concrete;

public class CategoryBusiness : ICategoryService
{
    private readonly TodoContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly ILogger<CategoryBusiness> _logger;

    public CategoryBusiness(TodoContext context, IMapper mapper, ILogger<CategoryBusiness> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public bool CreateCategory(CreateCategoryDto dto)
    {
        _logger.LogInformation("Yeni bir kategori oluşturuluyor.");
        var category = _mapper.Map<Category>(dto); 
        _context.Categories.Add(category);
        return _context.SaveChanges() > 0;
    }

    public bool DeleteCategoryById(int id)
    {
        _logger.LogInformation($"ID {id} ile kategori siliniyor.");
        var category = _context.Categories.Find(id);
        if (category == null) return false;

        _context.Categories.Remove(category);
        return _context.SaveChanges() > 0;
    }

    public IEnumerable<CategoryDto> GetAllCategories()
    {
        _logger.LogInformation("Tüm kategoriler getiriliyor.");
        var categories = _context.Categories.ToList();
        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

    public CategoryDto GetCategoryById(int id)
    {
        _logger.LogInformation($"ID {id} ile kategori getiriliyor.");
        var category = _context.Categories.Find(id);
        return _mapper.Map<CategoryDto>(category);
    }

    public void UpdateCategory(UpdateCategoryDto dto)
    {
        var category = _context.Categories.SingleOrDefault(t => t.Id == dto.Id);

        _mapper.Map(dto, category);
        _context.SaveChanges();

    }

    public IEnumerable<CategoryDto> GetUserCategories(int userId)
    {
        _logger.LogInformation($"Kullanıcıya ait kategoriler getiriliyor. UserId: {userId}");

        var categories = _context.Categories
                                 .Join(_context.TodoItems,
                                       c => c.Id,
                                       t => t.CategoryId,
                                       (c, t) => new { c, t })
                                 .Where(ct => ct.t.UserId == userId)
                                 .Select(ct => ct.c)
                                 .Distinct()
                                 .ToList();

        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

}
