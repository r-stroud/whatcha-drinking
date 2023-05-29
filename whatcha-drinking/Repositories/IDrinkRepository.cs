using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IDrinkRepository
    {
        List<Drink> GetAllDrinks();
    }
}