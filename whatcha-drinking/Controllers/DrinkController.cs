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

            if (_drinkRepository.GetByDrinkId(userdrink.DrinkId) == null)
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

           var exisistinguserdrinks = _drinkRepository.GetByDrinkId(userdrink.DrinkId);
            exisistinguserdrinks.TimesTried = exisistinguserdrinks.TimesTried + 1;
            exisistinguserdrinks.DateTime = DateTime.Now;
            _drinkRepository.UpdateUserDrinks(exisistinguserdrinks);
            return Ok();
         
        }

        [HttpGet("most_recent")]
        public IActionResult MostRecent(string userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }

            return Ok(_drinkRepository.MostRecent(userId));
        }
    }
}
