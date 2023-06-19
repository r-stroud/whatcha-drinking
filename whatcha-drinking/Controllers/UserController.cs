using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("GetExistingFirebaseId")]
        public IActionResult GetExistingFirebaseId()
        {
            return Ok(_userRepository.GetExistingFirebaseId());
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
        [HttpPut("update_user")]
        public IActionResult UpdateUser(User user)
        {
            if(user.Username== null)
            {
                return BadRequest();
            }

            if (_userRepository.GetByFirebaseId(user.FirebaseId) == null)
            {
                return BadRequest();
            }

            _userRepository.UpdateUser(user);
            return Ok(new
            {
                Message = "Updated",
                User = user
            });
        }
        [HttpPost("add_friend")]
        public IActionResult AddFriend(UserFriend userFriend)
        {
            if(_userRepository.GetById(userFriend.UserId) == null || _userRepository.GetById(userFriend.FriendId)==null)
            {
                return BadRequest();
            }
            return Ok(_userRepository.AddFriend(userFriend));
        }

        [HttpGet("friend_requests")]
        public IActionResult FriendRequests(string userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }

           return Ok( _userRepository.GetFriendRequests(userId));
        }

        [HttpGet("friends")]
        public IActionResult GetFriends(string userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }

            return Ok(_userRepository.GetFriends(userId));
        }
    }
}
