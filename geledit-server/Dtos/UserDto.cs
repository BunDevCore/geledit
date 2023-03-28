namespace geledit_server.Dtos;

public class UserDto
{
    public string Username { get; set; }
    public List<ReturnNoteDto> OwnedNotes { get; set; }
}