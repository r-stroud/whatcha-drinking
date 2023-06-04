using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IDrinkTypeRepository
    {
        List<DrinkType> GetAllDrinkTypes();
        DrinkType GetDrinkTypeById(int drinkTypeId);
        DrinkType CheckPreferredDrinkType(int drinkTypeId, string userId);
    }
}