﻿namespace whatcha_drinking.Model
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int? TimesTried { get; set; } = null;
        public string Image { get; set; }
    }

    public class UserDrink 
    { 
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DrinkId { get; set; }
        public int TimesTried { get; set; }
        public DateTime DateTime { get; set; }
    }

}
