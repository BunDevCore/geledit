namespace geledit_server.Models;

public class Note
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public User Owner { get; set; }
    public ICollection<User> Guests { get; set; }
    public User? CurrentEditor { get; set; }
    public DateTime ReservedUntil { get; set; }
}