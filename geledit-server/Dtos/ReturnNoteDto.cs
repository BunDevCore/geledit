using geledit_server.Models;

namespace geledit_server.Dtos;

public class ReturnNoteDto
{
    public long Id { get; set; }
    public string Owner { get; set; }
    public string Title { get; set; }
    public string? Content { get; set; }
    public IEnumerable<string?> Guests { get; set; }
    public string? CurrentEditor { get; set; }

    public static ReturnNoteDto FromNote(Note note, bool includeContent)
    {
        return new ReturnNoteDto
        {
            Content = includeContent ? note.Content : null,
            Id = note.Id,
            Owner = note.Owner.UserName!,
            Title = note.Title,
            Guests = note.Guests.Select(u => u.UserName),
            CurrentEditor = note.CurrentEditor?.UserName
        };
    }
}