using geledit_server.Dtos;
using geledit_server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geledit_server.Controllers;

[ApiController]
[Route("{controller}")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly GeleditContext _db;

    public UserController(UserManager<User> userManager, GeleditContext db)
    {
        _userManager = userManager;
        _db = db;
    }

    [HttpGet]
    [Route("byUsername/{username}")]
    [ProducesResponseType(200, Type = typeof(UserDto))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> ByUsername(string username)
    {
        var userId = _userManager.GetUserId(User);
        var dbUser = await _db.Users.FirstOrDefaultAsync(x => x.UserName == userId);
        if (dbUser == null)
        {
            return NotFound();
        }

        return new OkObjectResult(new UserDto
        {
            Username = username,
            OwnedNotes = dbUser.OwnedNotes.Select(x => ReturnNoteDto.FromNote(x, false)).ToList()
        });
    }
}