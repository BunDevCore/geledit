using System.Data.Common;
using System.Net;
using geledit_server.Models;
using Microsoft.AspNetCore.Mvc;

namespace geledit_server.Controllers;

[ApiController]
[Route("[controller]")]

public class NoteController : ControllerBase
{

    private readonly ILogger<NoteController> _logger;
    private readonly GeleditContext _db;
    
    public NoteController(ILogger<NoteController> logger, GeleditContext db)
    {
        _logger = logger;
        _db = db;
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
        var note = _db.Notes.Find(id);
        if (note == null)
        {
            return NotFound("note is nonexistent");
        }

        return Ok(note);
    }
    
    // [HttpPost("new")]
    // public string AddNote()
    // {
    //     Note notatka = new Note   // [HttpPost("new")]
    // public string AddNote()
    // {
    //     Note notatka = new Note
    //     {
    //         Id = 1,
    //         Name = "Notatka",
    //         Content = "afahfafhahfiuah Czyli co jest wewnątrz notatki",
    //         Owner = new User
    //         {
    //             Id = 1,
    //             Username = "XYZ",
    //             PwdHash = "To be hashed or not to be hashed?",
    //             OwnedNotes = new List<Note>(),
    //         },
    //     };
    //     
    //     Notes.Add(notatka);
    //
    //     return "Dodano nową notatkę";
    //
    // }
    //     {
    //         Id = 1,
    //         Name = "Notatka",
    //         Content = "afahfafhahfiuah Czyli co jest wewnątrz notatki",
    //         Owner = new User
    //         {
    //             Id = 1,
    //             Username = "XYZ",
    //             PwdHash = "To be hashed or not to be hashed?",
    //             OwnedNotes = new List<Note>(),
    //         },
    //     };
    //     
    //     Notes.Add(notatka);
    //
    //     return "Dodano nową notatkę";
    //
    // }
}