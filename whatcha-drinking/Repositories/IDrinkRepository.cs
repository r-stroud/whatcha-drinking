using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IDrinkRepository
    {
        List<Drink> GetAllDrinks();
        UserDrink AddUserDrink(UserDrink userdrink);
        Drink GetById(int id);
        UserDrink GetUserDrinkById(int drinkId, string userId); 
        void UpdateUserDrinks(UserDrink userdrink);
        public Drink MostRecent(string drinkId);
        public TimesDrank GetTimesTried(string userId, int drinkId);
        public DrinkPreference AddPreference(DrinkPreference drinkPreference);
        public DrinkPreference UpdatePreference(DrinkPreference drinkPreference);
        public List<DrinkPreference> DrinkPreferencesByUserID(string userId);
        public PreferenceType GetPreferenceTypeById(int id);
        public DrinkPreference GetDrinkPreferenceById(int id);
        public void RemoveDrinkPreference(int id);
        public int? GetDrinkPreferenceId(string userId, int drinkTypeId);
        public Drink MostTried(string userId);
        public List<Drink> UserDrinks(string userId);


    }
}