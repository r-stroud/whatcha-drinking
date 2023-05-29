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

        [HttpPost("add-drink/{drinkId}")]
        public IActionResult AddUserDrink(int userId, int drinkId)
        {
            if (_userRepository.GetById(userId) == null || _drinkRepository.GetById(drinkId) == null)
            {
                return BadRequest();
            }

            if (_drinkRepository.GetByDrinkId(drinkId) == null)
            {
                    UserDrink userdrink = new UserDrink()
                    {
                    UserId = userId,
                    DrinkId = drinkId,
                    DateTime = DateTime.Now,
                    TimesTried = 1
                    };
                 _drinkRepository.AddUserDrink(userdrink);
                return Ok(new
                {
                Message = "Created",
                UserDrink = userdrink
                });
            }

           var exisistinguserdrinks = _drinkRepository.GetByDrinkId(drinkId);
            exisistinguserdrinks.TimesTried = exisistinguserdrinks.TimesTried + 1;
            exisistinguserdrinks.DateTime = DateTime.Now;
            _drinkRepository.UpdateUserDrinks(exisistinguserdrinks);
            return Ok();
         
        }
    }
}
