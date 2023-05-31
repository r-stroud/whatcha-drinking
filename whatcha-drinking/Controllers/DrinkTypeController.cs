
using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkTypeController :ControllerBase
    {
        private readonly IDrinkTypeRepository _drinkTypeRepository;

        public DrinkTypeController(IDrinkTypeRepository drinkTypeRepository)
        {
            _drinkTypeRepository= drinkTypeRepository;
        }

        [HttpGet("drink_types")]
        public IActionResult GetAllDrinkTypes()
        {
            return Ok(_drinkTypeRepository.GetAllDrinkTypes());
        }

    }
}
