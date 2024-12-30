using TodoList.Business.Dtos;

namespace TodoList.Business.Abstract;

public interface IRoleService
{
    bool CreateRole(CreateRoleDto dto);
    bool DeleteRoleById(int id);

    RoleDetailDto GetRoleNameByUserId(int userId);
}
