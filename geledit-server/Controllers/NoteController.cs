using System.Data.Common;
using System.Net;
using geledit_server.Dtos;
using geledit_server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geledit_server.Controllers;

[ApiController]
[Route("[controller]")]
public class NoteController : ControllerBase
{
    private readonly ILogger<NoteController> _logger;
    private readonly GeleditContext _db;
    private readonly UserManager<User> _userManager;

    public NoteController(ILogger<NoteController> logger, GeleditContext db, UserManager<User> userManager)
    {
        _logger = logger;
        _db = db;
        _userManager = userManager;
    }

    [HttpGet]
    public IEnumerable<ReturnNoteDto> Get()
    {
        return _db.Notes.Select(note => new ReturnNoteDto
        {
            Content = null,
            Id = note.Id,
            Owner = note.Owner.UserName,
            Title = note.Title
        });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetNote([FromRoute] long id)
    {
        var note = _db.Notes.Include(x => x.Owner).FirstOrDefault(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        _logger.LogInformation(note.Owner.ToString());

        return Ok(new ReturnNoteDto
        {
            Content = note.Content,
            Id = note.Id,
            Owner = note.Owner.UserName,
            Title = note.Title
        });
    }

    [Authorize]
    [HttpPost("new")]
    public async Task<long> CreateNewNote([FromBody] AddNoteDto noteDto)
    {
        var userId = _userManager.GetUserId(User);
        _logger.LogInformation(userId);
        var dbUser = await _db.Users.FirstAsync(x => x.UserName == userId);
        _logger.LogInformation(dbUser?.ToString());

        var newNote = new Note
        {
            Content = "",
            Title = noteDto.Title,
            Owner = dbUser!
        };

        _db.Notes.Add(newNote);
        _db.SaveChanges();

        _logger.LogInformation(newNote.Owner.ToString());

        return newNote.Id;
    }

    [Authorize]
    [HttpPost("{id}/addGuest")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddGuestToNote([FromRoute] long id, [FromBody] string username)
    {
        var note = await _db.Notes.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        var guest = await _db.Users.FirstOrDefaultAsync(x => x.UserName == username);
        if (guest == null)
        {
            return NotFound("user does not exist");
        }

        var userId = _userManager.GetUserId(User);
        if (note.Owner.UserName != userId)
        {
            return Unauthorized("you are not owner of this note");
        }

        note.Guests.Add(guest);
        await _db.SaveChangesAsync();

        return Ok(new Note
        {
            Id = note.Id,
            Content = note.Content,
            Title = note.Title,
            Owner = note.Owner,
            Guests = note.Guests,
        });
    }

    [Authorize]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteNote([FromRoute] long id)
    {
        var note = await _db.Notes.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        _db.Notes.Remove(note);
        _db.SaveChanges();

        return Ok();
    }


}