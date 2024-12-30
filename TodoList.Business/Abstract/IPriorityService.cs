using TodoList.Business.Data.Entities;
using TodoList.Business.Dtos;

namespace TodoList.Business.Abstract;

public interface IPriorityService
{
    PriorityDto GetPriorityById(int id); 
    bool CreatePriority(CreatePriorityDto dto); 
    IEnumerable<PriorityDto> GetAllPriorities(); 

    void UpdatePriority(UpdatePriorityDto dto);
}


