using System.Security.Cryptography;
using whatcha_drinking.Model;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Repositories
{
    public class DrinkTypeRepository : BaseRepository, IDrinkTypeRepository
    {
        public DrinkTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<DrinkType> GetAllDrinkTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT [id],[type]
                                        FROM [drinkType]";

                    var reader = cmd.ExecuteReader();
                    List<DrinkType> drinkTypes = new List<DrinkType>();
                    DrinkType type = null;
                    while (reader.Read())
                    {
                        type = new DrinkType()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Type = DbUtils.GetString(reader, "type")
                        };
                        drinkTypes.Add(type);
                    }
                    reader.Close();
                    return drinkTypes;
                }
            }
        }

    }
}
