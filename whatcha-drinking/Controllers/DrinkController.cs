using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Model;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkRepository _drinkRepository;
        private readonly IUserRepository _userRepository;

        public DrinkController(IDrinkRepository drinkRepository, IUserRepository userRepository)
        {
            _drinkRepository = drinkRepository;
            _userRepository = userRepository;
        }

        [HttpGet("drinks")]
        public IActionResult GetAllDrinks()
        {
            return Ok(_drinkRepository.GetAllDrinks());
        }

        [HttpPost("add_drink")]
        public IActionResult AddUserDrink(UserDrink userdrink)
        {
            if (_userRepository.GetById(userdrink.UserId) == null || _drinkRepository.GetById(userdrink.DrinkId) == null)
            {
                return BadRequest();
            }

            if (_drinkRepository.GetUserDrinkById(userdrink.DrinkId, userdrink.UserId) == null)
            {
                userdrink.DateTime = DateTime.Now;
                userdrink.TimesTried = 1;
                 _drinkRepository.AddUserDrink(userdrink);
                return Ok(new
                {
                Message = "Created",
                UserDrink = userdrink
                });
            }

           var exisistinguserdrinks = _drinkRepository.GetUserDrinkById(userdrink.DrinkId, userdrink.UserId);
            exisistinguserdrinks.TimesTried = exisistinguserdrinks.TimesTried + 1;
            exisistinguserdrinks.DateTime = DateTime.Now;
            _drinkRepository.UpdateUserDrinks(exisistinguserdrinks);
            return Ok(new
            {
                Message = "Created",
                UserDrink = exisistinguserdrinks
            });
         
        }

        [HttpGet("most_recent")]
        public IActionResult MostRecent(string userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }
            if (_drinkRepository.MostRecent(userId)==null)
            {
                return Ok(new
                {
                    Id = "",
                    Name = "",
                    Type = "",
                    TimesTried = "",
                    DateTime = "",
                });
            }

            return Ok(_drinkRepository.MostRecent(userId));
        }

        [HttpGet("times_tried")]
        public IActionResult TimesTried(string userId, int drinkId)
        {

            if (_userRepository.GetById(userId) == null || _drinkRepository.GetById(drinkId) == null)
            {
                return BadRequest();
            }

            if(_drinkRepository.GetTimesTried(userId, drinkId) == null)
            {
                TimesDrank times = new TimesDrank()
                {
                    TimesTried = 0
                };
            return Ok(times);
            }

            return Ok(_drinkRepository.GetTimesTried(userId,drinkId));
        }
    }
}
