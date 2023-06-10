using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Model;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDrinkRepository _drinkRepository;

        public PostController(IPostRepository postRepository, IUserRepository userRepository, IDrinkRepository drinkRepository)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
            _drinkRepository= drinkRepository;
        }

        [HttpPost("create_post")]
        public IActionResult createPost(Post post)
        {
            if( _userRepository.GetById(post.UserId) == null || _drinkRepository.GetById(post.DrinkId) == null)
            {
                return BadRequest();
            }
            post.DateTime = DateTime.Now;
            _postRepository.AddPost(post);

            return Ok(new
            {
                Message = "Created",
                Post = post
            });

        }
        [HttpGet("get_posts")]
        public IActionResult getAllPosts()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpDelete("remove_post/{id}")]
        public IActionResult removePost(int id)
        {
            if(_postRepository.GetById(id)== null)
            {
                return BadRequest();
            }
            _postRepository.RemovePost(id);

            return NoContent();
        }

        [HttpGet("get_post_by_id")]
        public IActionResult getPostById(int id) 
        {
            if(_postRepository.GetById(id) == null)
            {
                return BadRequest();
            }

            return Ok(_postRepository.GetById(id));
        }
    }
}
