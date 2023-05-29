using Microsoft.AspNetCore.Mvc;
using whatcha_drinking.Repositories;

namespace whatcha_drinking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkRepository _drinkRepository;

        public DrinkController(IDrinkRepository drinkRepository)
        {
            _drinkRepository = drinkRepository;
        }

        [HttpGet("drinks")]
        public IActionResult GetAllDrinks()
        {
            return Ok(_drinkRepository.GetAllDrinks());
        }
    }
}
