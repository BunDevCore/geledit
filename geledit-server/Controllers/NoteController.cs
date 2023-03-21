using System.Data.Common;
using System.Net;
using geledit_server.Dtos;
using geledit_server.Models;
using Microsoft.AspNetCore.Authorization;
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
    public IEnumerable<Note> Get()
    {
        return _db.Notes;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetNote([FromRoute]long id)
    {
        var note = _db.Notes.Include(x => x.Owner).FirstOrDefault(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        return Ok(new ReturnNoteDto
        {
            Content = note.Content,
            Id = note.Id,
            Owner = note.Owner.UserName!,
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
}