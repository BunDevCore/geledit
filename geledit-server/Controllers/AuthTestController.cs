using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geledit_server.Controllers
{
    [ApiController]
    public class AuthTestController : ControllerBase
    {
        [HttpGet("/public")]
        public string Public()
        {
            return "public endpoint";
        }

        [HttpGet("/private")]
        [Authorize]
        public string Private()
        {

            return String.Join(", ", User.Claims.ToList());
        }
    }
}
