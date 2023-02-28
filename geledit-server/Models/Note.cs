namespace geledit_server.Models;

public class Note
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public User Owner { get; set; }
}