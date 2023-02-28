using System.ComponentModel.DataAnnotations;

namespace geledit_server.Models;

public class User
{
    public long Id { get; set; }
    [MinLength(3)]
    [MaxLength(30)]
    public string Username { get; set; }
    public string PwdHash { get; set; }
    public ICollection<Note> OwnedNotes { get; set; }
}