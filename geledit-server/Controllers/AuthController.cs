using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using geledit_server.Dtos;
using geledit_server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace geledit_server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly UserManager<User> _userManager;

    public AuthController(IConfiguration config, UserManager<User> userManager)
    {
        _config = config;
        _userManager = userManager;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var user = await _userManager.FindByNameAsync(dto.UserName);
        if (user == null)
        {
            return BadRequest();
        }

        if (await _userManager.CheckPasswordAsync(user, dto.Password))
        {
            var token = await NewJwt(user);
            return new OkObjectResult(token);
        }

        return BadRequest();


    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!Regex.IsMatch(dto.UserName, "^[a-zA-Z0-9.-_]{4,30}$", RegexOptions.CultureInvariant | RegexOptions.Singleline))
        {
            return BadRequest("Usernames can only consist of letters, numbers and .-_ and be between 4 and 30 characters");
        }

        var newUser = new User
        {
            UserName = dto.UserName,
            OwnedNotes = new List<Note>()
        };
        
        var result = await _userManager.CreateAsync(newUser, dto.Password);

        if (result.Succeeded)
        {
            return new OkObjectResult(await NewJwt(newUser));
        }
        else
        {
            return UnprocessableEntity(result.Errors.Select(e => e.Code));
        }
    }

    private async Task<string> NewJwt(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? "test"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTKey"]));
        var token = new JwtSecurityToken(issuer: "geledit",
            audience: "geledit-frontend",
            expires: DateTime.UtcNow.AddHours(3),
            claims: claims,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        var serialized = new JwtSecurityTokenHandler().WriteToken(token);
        return serialized;
    }
}