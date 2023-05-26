﻿using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Model;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetByUsername")]
        public IActionResult GetByUsername(string username)
        {
            if(username == null)
            {
                return BadRequest();
            }else if (_userRepository.GetByUsername(username) == null)
            {
                return Ok("{}");
            }
 
            return Ok(_userRepository.GetByUsername(username));
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            if(email == null)
            {
                return BadRequest();
            }else if (_userRepository.GetByEmail(email)== null)
            {
                return Ok("{email: none}");
            }
            return Ok(_userRepository.GetByEmail(email));
        }


        [HttpGet("GetByFirebaseId")]
        public IActionResult GetByFirebaseId(string firebaseId)
        {
            if (firebaseId == null)
            {
                return BadRequest();
            } else
            {
                return Ok(_userRepository.GetByFirebaseId(firebaseId));
            }
        }

        [HttpPost("new-user")]
        public IActionResult AddUser(NewUserDetails nud)
        {
            if (nud.FirebaseId == null)
            {
                return BadRequest();
            } else if(_userRepository.GetByFirebaseId(nud.FirebaseId) != null)
            {
                return Ok();
            }else
            {
              
                return Ok(new
                {
                    message = "Created",
                    newUser = _userRepository.AddUser(nud)
                }); 
            }
        }
    }
}
