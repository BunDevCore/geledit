using System.ComponentModel.DataAnnotations;

namespace geledit_server.Dtos;

public class RegisterDto
{
    [Required(ErrorMessage = "Username required!", AllowEmptyStrings = false)]
    [MinLength(4)]
    [MaxLength(30)]
    public string UserName { get; set; }
    
    [Required(ErrorMessage = "Password required!", AllowEmptyStrings = false)]
    public string Password { get; set; }
}