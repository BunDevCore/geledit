using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace geledit_server.Models;

public class User : IdentityUser
{
    public ICollection<Note> OwnedNotes { get; set; }
}