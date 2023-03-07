using System.Data.Common;
using System.Net;
using geledit_server.Models;
using Microsoft.AspNetCore.Mvc;

namespace geledit_server.Controllers;

[ApiController]
[Route("[controller]")]

public class NoteController : ControllerBase
{
    private List<Note> Notes = new List<Note>() {
        new Note
        {
            Id = 0,
            Content = "0content0",
            Name = "0test0",
            Owner = new User
            {
                Id = 0,
                Username = "0user0",
                PwdHash = "0hash0",
                OwnedNotes = new List<Note>(),
            },
        }
    };
    
    private readonly ILogger<NoteController> _logger;
    
    public NoteController(ILogger<NoteController> logger)
    {
        _logger = logger;
    }
    
    [HttpGet]
    public List<Note> Get()
    {
        return Notes;
        //return Enumerable.Range(1, Notes.Count).Select(index => Notes[index - 1]);
    }

    [HttpGet("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetNote([FromRoute]int Id)
    {
        Note notatka;
        try
        {
            notatka = Notes[Id];
        } catch (ArgumentOutOfRangeException e)
        {
            return NotFound($"Index {Id} is out of range");
        }
        return Ok(notatka);
    }

    [HttpPost("new")]
    public string AddNote()
    {
        Note notatka = new Note
        {
            Id = 1,
            Name = "Notatka",
            Content = "afahfafhahfiuah Czyli co jest wewnątrz notatki",
            Owner = new User
            {
                Id = 1,
                Username = "XYZ",
                PwdHash = "To be hashed or not to be hashed?",
                OwnedNotes = new List<Note>(),
            },
        };
        
        Notes.Add(notatka);

        return "Dodano nową notatkę";

    }
}