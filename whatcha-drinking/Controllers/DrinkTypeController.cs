
using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkTypeController :ControllerBase
    {
        private readonly IDrinkTypeRepository _drinkTypeRepository;
        private readonly IUserRepository _userRepository;

        public DrinkTypeController(IDrinkTypeRepository drinkTypeRepository, IUserRepository userRepository)
        {
            _drinkTypeRepository = drinkTypeRepository;
            _userRepository = userRepository;
        }

        [HttpGet("drink_types")]
        public IActionResult GetAllDrinkTypes()
        {
            return Ok(_drinkTypeRepository.GetAllDrinkTypes());
        }

        [HttpGet("drink_types{drinkTypeId}")]
        public IActionResult GetDrinkTypeById(int drinkTypeId)
        {
            if(_drinkTypeRepository.GetDrinkTypeById(drinkTypeId) == null)
            {
                return BadRequest();
            }

            return Ok(_drinkTypeRepository.GetDrinkTypeById(drinkTypeId));
        }

        [HttpGet("check_preferred")]
        public IActionResult CheckPreferred(int drinkTypeId, string userId) 
        {
            if (_drinkTypeRepository.GetDrinkTypeById(drinkTypeId) == null)
            {
                return BadRequest();
            }

            if(_userRepository.GetByFirebaseId(userId) == null)
            {
                return BadRequest();
            }

            return Ok(_drinkTypeRepository.CheckPreferredDrinkType(drinkTypeId, userId));

        }

    }
}
