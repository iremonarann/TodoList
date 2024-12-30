using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var res = _categoryService.GetAllCategories();
        return Ok(res);
    }

    [HttpGet("{id:int}")]
    public IActionResult Get(int id) 
    {
        var res = _categoryService.GetCategoryById(id);
        if(res == null) return NotFound();
        return Ok(res);
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreateCategoryDto category)
    {
        var res = _categoryService.CreateCategory(category);
        if(res) return Ok(res);
        return BadRequest("Category could not be created!");
    }

    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] UpdateCategoryDto category)
    {
        category.Id = id;
        _categoryService.UpdateCategory(category);

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var res = _categoryService.DeleteCategoryById(id);
        if(res) return Ok();
        return BadRequest("Category could not be deleted!");
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetUserCategories(int userId)
    {
        var categories = _categoryService.GetUserCategories(userId);
        return Ok(categories);
    }
}

