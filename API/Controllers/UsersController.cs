using API.DTOs;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


[Authorize]
public class UsersController: BaseApiController
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsersAsync()
    {
        var users = await  _userRepository.GetMembersAsync();
        return Ok(users);         
    }

    [HttpGet("{username}")] // api/users/john
    public async Task<ActionResult<MemberDto>> GetUserAsync(string username)
    {
        return await _userRepository.GetMemberAsync(username);   
    }
}
