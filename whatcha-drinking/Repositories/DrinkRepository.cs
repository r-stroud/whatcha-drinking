using whatcha_drinking.Model;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Repositories
{
    public class DrinkRepository : BaseRepository, IDrinkRepository
    {
        public DrinkRepository(IConfiguration configuration) : base(configuration) { }

        public List<Drink> GetAllDrinks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        D.[id] AS drinkId, 
                                        D.[name],
                                        DT.[type]
                                        FROM [drink] D
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]";
                    var reader = cmd.ExecuteReader();
                    List<Drink> drinks = new List<Drink>();
                    Drink drink = null;
                    while (reader.Read())
                    {
                        drink = new Drink()
                        {
                            Id = DbUtils.GetInt(reader, "drinkId"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetString(reader, "type"),
                        };
                        drinks.Add(drink);
                    }
                    reader.Close();
                    return drinks;
                }
            }
        }
    }
}
