using Microsoft.AspNetCore.Mvc;
using System.Reflection.PortableExecutable;
using whatcha_drinking.Model;
using whatcha_drinking.Repositories;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkRepository _drinkRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDrinkTypeRepository _drinkTypeRepository;

        public DrinkController(IDrinkRepository drinkRepository, IUserRepository userRepository, IDrinkTypeRepository drinkTypeRepository)
        {
            _drinkRepository = drinkRepository;
            _userRepository = userRepository;
            _drinkTypeRepository = drinkTypeRepository;
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
                    Image = ""
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

        [HttpPut("drink_preference")]
        public IActionResult AddPreference(DrinkPreference drinkPreference)
        {
            
            if (_userRepository.GetById(drinkPreference.UserId) == null)
            {
                return BadRequest();
            }

            if(_drinkTypeRepository.GetDrinkTypeById(drinkPreference.DrinkTypeId) == null)
            {
                return BadRequest();
            }
            if(_drinkTypeRepository.CheckPreferredDrinkType(drinkPreference.DrinkTypeId, drinkPreference.UserId) != null)
            {
                return BadRequest();
            }
            if(_drinkRepository.GetPreferenceTypeById(drinkPreference.PreferenceTypeId)== null)
            {
                return BadRequest();
            }

            return Ok(_drinkRepository.AddPreference(drinkPreference));
        }

        [HttpGet("drink_preferences")]
        public IActionResult DrinkPreferencesByUserId(string userId)
        {
            if(_userRepository.GetById(userId)== null)
            {
                return BadRequest();
            }

            return Ok(_drinkRepository.DrinkPreferencesByUserID(userId));
        }

        [HttpGet("drink_preference_id")]
        public IActionResult GetDrinkPreferenceId(string userId, int drinkTypeId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }
            if (_drinkTypeRepository.GetDrinkTypeById(drinkTypeId) == null)
            {
                return BadRequest();
            }

           return Ok( _drinkRepository.GetDrinkPreferenceId(userId, drinkTypeId));

        }

        [HttpGet("most_tried")]
        public IActionResult MostTried(string userId)
        {
            if(_userRepository.GetById(userId)==null)
            {
                return BadRequest();
            }

            if(_drinkRepository.MostTried(userId) == null)
            {
                return Ok(new
                {
                    Id = "",
                    Name = "",
                    Image = "",
                    Type = "",
                    TimesTried = "",
                    DateTime = ""
                });
            }

            return Ok(_drinkRepository.MostTried(userId));
        }

        [HttpDelete("remove_preference/{id}")]
        public IActionResult Remove(int id)
        {
            if(_drinkRepository.GetDrinkPreferenceById(id) == null)
            {
                return BadRequest();
            }

            _drinkRepository.RemoveDrinkPreference(id);

            return NoContent();
        }
        [HttpGet("user_drinks")]
        public IActionResult UserDrinks(string userId)
        {
            if (_userRepository.GetById(userId) == null)
            {
                return BadRequest();
            }

            return Ok(_drinkRepository.UserDrinks(userId));
        }

    }
}
