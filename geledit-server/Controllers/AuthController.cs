using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using geledit_server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace geledit_server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController
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
    public async Task<string> Login()
    {
        var u = new User()
        {
            OwnedNotes = new List<Note>(),
        };

        var token = await NewJwt(u);
        return token;
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