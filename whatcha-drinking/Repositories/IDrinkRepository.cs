﻿using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IDrinkRepository
    {
        List<Drink> GetAllDrinks();
        UserDrink AddUserDrink(UserDrink userdrink);
        Drink GetById(int id);
        UserDrink GetByDrinkId(int drinkId); 
        void UpdateUserDrinks(UserDrink userdrink);
        public Drink MostRecent(string drinkId);
    }
}