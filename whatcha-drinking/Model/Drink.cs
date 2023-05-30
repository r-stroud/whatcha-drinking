namespace whatcha_drinking.Model
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int? TimesTried { get; set; } = null;
        public DateTime DateTime { get; set; }
        public string Image { get; set; }
    }

    public class UserDrink 
    { 
        public int Id { get; set; }
        public string UserId { get; set; }
        public int DrinkId { get; set; }
        public int TimesTried { get; set; }
        public DateTime DateTime { get; set; }
    }

}
