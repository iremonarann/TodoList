using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TodoList.Business.Abstract;
using TodoList.Business.Data.Contexts;
using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Concrete;
public class PriorityBusiness : IPriorityService
{
    private readonly TodoContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private readonly ILogger<PriorityBusiness> _logger;

    public PriorityBusiness(TodoContext context, IMapper mapper, ILogger<PriorityBusiness> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public bool CreatePriority(CreatePriorityDto dto)
    {
        _logger.LogInformation("Yeni bir öncelik oluşturuluyor.");
        var priority = _mapper.Map<Priority>(dto); 
        _context.Priority.Add(priority);
        return _context.SaveChanges() > 0;
    }

    public IEnumerable<PriorityDto> GetAllPriorities()
    {
        _logger.LogInformation("Tüm öncelikler getiriliyor.");
        var priorities = _context.Priority.ToList();
        return _mapper.Map<IEnumerable<PriorityDto>>(priorities);
    }

    public PriorityDto GetPriorityById(int id)
    {
        _logger.LogInformation($"ID {id} ile öncelik getiriliyor.");
        var priority = _context.Priority.Find(id);
        return _mapper.Map<PriorityDto>(priority);
    }

    public void UpdatePriority(UpdatePriorityDto dto)
    {
        var prio = _context.Priority.SingleOrDefault(t => t.Id == dto.Id);

        _mapper.Map(dto, prio);
        _context.SaveChanges();
    }
}

