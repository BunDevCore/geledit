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

    [AllowAnonymous]
    [HttpGet]
    public IEnumerable<ReturnNoteDto> Get()
    {
        var username = _userManager.GetUserId(User);
        if (username == null)
        {
            _logger.LogWarning("username is null");
            return Enumerable.Empty<ReturnNoteDto>();
        }

        var owned = _db.Notes.Where(n => n.Owner.UserName == username);
        var dbUser = _db.Users.Include(u => u.IsGuestIn).ThenInclude(n => n.Owner).FirstOrDefault(u => u.UserName == username);
        _logger.LogInformation(dbUser.ToString());
        var guestIn = dbUser.IsGuestIn;
        _logger.LogInformation(guestIn.ToString());
        foreach (var note in guestIn)
        {
            _logger.LogInformation(note.Id.ToString());
        }
        return Enumerable.Concat(owned, guestIn).Select(note => new ReturnNoteDto
        {
            Content = null,
            Id = note.Id,
            Owner = note.Owner.UserName,
            Title = note.Title
        });
    }
    
    [AllowAnonymous]
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetNote([FromRoute] long id)
    {
        var username = _userManager.GetUserId(User);
        var note = await _db.Notes.Include(x => x.Owner).Include(n => n.Guests).FirstOrDefaultAsync(x => x.Id == id);

        if (note == null || (!note.Guests.Select(g => g.UserName).Contains(username) && note.Owner.UserName != username))
        {
            return NotFound("note is nonexistent");
        }

        

        return Ok(ReturnNoteDto.FromNote(note, true));
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
            Owner = dbUser!,
            Guests = new HashSet<User>()
        };

        _db.Notes.Add(newNote);
        _logger.LogInformation("n.g = {NoteGuests}", newNote.Guests);
        await _db.SaveChangesAsync();

        _logger.LogInformation(newNote.Owner.ToString());

        return newNote.Id;
    }

    [Authorize]
    [HttpPost("{id}/guest")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddGuestToNote([FromRoute] long id, [FromBody] UsernameDto usernameDto)
    {
        _logger.LogInformation("username = {Username}", usernameDto.username);
        var note = await _db.Notes.Include(x => x.Owner).Include(n => n.Guests).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        var guest = await _db.Users.FirstOrDefaultAsync(x => x.UserName == usernameDto.username);
        if (guest == null)
        {
            return NotFound("user does not exist");
        }

        _logger.LogInformation("guest = {Guest}", guest);

        var userId = _userManager.GetUserId(User);
        if (note.Owner.UserName != userId)
        {
            return Unauthorized("you are not owner of this note");
        }

        _logger.LogInformation("note.Guests = {NoteGuests}", note.Guests);
        note.Guests.Add(guest);
        _logger.LogInformation("after add");
        await _db.SaveChangesAsync();

        return Ok(ReturnNoteDto.FromNote(note, true));
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
        await _db.SaveChangesAsync();

        return Ok();
    }

    [Authorize]
    [HttpDelete("{id}/guest")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> DeleteGuest([FromRoute] long id, [FromBody] UsernameDto usernameDto)
    {
        var note = await _db.Notes.Include(x => x.Owner).Include(n => n.Guests).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        var guest = await _db.Users.FirstOrDefaultAsync(x => x.UserName == usernameDto.username);
        if (guest == null)
        {
            return NotFound("user does not exist");
        }

        var userId = _userManager.GetUserId(User);
        if (note.Owner.UserName != userId)
        {
            return Unauthorized("you are not owner of this note");
        }

        note.Guests.Remove(guest);
        await _db.SaveChangesAsync();

        return Ok(ReturnNoteDto.FromNote(note, true));
    }

    [Authorize]
    [HttpPost("{id}/refresh")]
    public async Task<IActionResult> RefreshOwnership(long id)
    {
        var note = await _db.Notes.Include(x => x.Owner).Include(n => n.Guests).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        var userId = _userManager.GetUserId(User);
        _logger.LogInformation("entering refresh for note {NoteId}, username = {Username}", note.Id, userId);
        _logger.LogInformation("uname: {UserId} owner: {OwnerUserName} >>", userId, note?.Owner.UserName);


        if (userId != note?.Owner.UserName && note?.Guests.FirstOrDefault(x => x.UserName == userId) == null)
        {
            return Unauthorized("you have no write permissions for this note");
        }

        // at this point the note is valid, the user is authorized, let's go
        var dbUser = await _db.Users.FirstAsync(x => x.UserName == userId);
        if (note.CurrentEditor != null && note.CurrentEditor.Id != dbUser.Id && note.ReservedUntil > DateTime.UtcNow)
        {
            _logger.LogInformation("conflict..");
            return Conflict("write access to this note is already taken!");
        }

        note.CurrentEditor = dbUser;
        note.ReservedUntil = DateTime.UtcNow + TimeSpan.FromSeconds(20);
        _logger.LogInformation("reserved until {ReservedUntil}", note.ReservedUntil);
        await _db.SaveChangesAsync();
        return Ok(ReturnNoteDto.FromNote(note, true));
    }

    [HttpPost("{id}")]
    [Authorize]
    public async Task<IActionResult> ChangeContent(long id, [FromBody] UpdateNoteDto updateNoteDto)
    {
        var note = await _db.Notes.Include(x => x.Owner).Include(n => n.Guests).FirstOrDefaultAsync(x => x.Id == id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        var userId = _userManager.GetUserId(User);

        _logger.LogWarning("uname: {UserId} owner: {OwnerUserName} change content>>", userId, note?.Owner.UserName);
        if (userId != note?.Owner.UserName && note?.Guests.FirstOrDefault(x => x.UserName == userId) == null)
        {
            return Unauthorized("you have no write permissions for this note");
        }

        // potencjalnie śmieszne race condition tu może być ale idc
        if (note.CurrentEditor == null || note.CurrentEditor.UserName == userId || note.ReservedUntil < DateTime.UtcNow)
        {
            var dbUser = await _db.Users.FirstAsync(x => x.UserName == userId);
            await RefreshOwnership(id);
            note.Content = updateNoteDto.Content;
            note.Title = updateNoteDto.Title;
            await _db.SaveChangesAsync();
            return Ok();
        }

        return Conflict("could not take write access to the note");
    }
}