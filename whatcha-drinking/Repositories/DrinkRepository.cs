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

        public UserDrink AddUserDrink(UserDrink userdrink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd= conn.CreateCommand())
                {
                    DateTime dateTime= DateTime.Now;
                    cmd.CommandText = @"INSERT INTO [userDrinks]
                                        ([userId],
                                        [drinkId],
                                        [dateTime],
                                        [timesTried])
                                        OUTPUT INSERTED.id
                                        VALUES (@userId, @drinkId,@dateTime,@timesTried)";
                    DbUtils.AddParameter(cmd, "@userId", userdrink.UserId);
                    DbUtils.AddParameter(cmd,"@drinkId",userdrink.DrinkId);
                    DbUtils.AddParameter(cmd, "@dateTime", userdrink.DateTime);
                    DbUtils.AddParameter(cmd, "timesTried", userdrink.TimesTried);
                    userdrink.Id = (int)cmd.ExecuteScalar();
                    return userdrink;
                }
            }
        }

        public Drink GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd= conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        D.[id] AS drinkId, 
                                        D.[name],
                                        DT.[type]
                                        FROM [drink] D
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]
                                        WHERE D.[id] = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Drink drink = null;
                    if (reader.Read())
                    {
                        drink = new Drink()
                        {
                            Id = DbUtils.GetInt(reader, "drinkId"),
                            Name = DbUtils.GetString(reader, "name"),
                            Type = DbUtils.GetString(reader, "type"),
                        };
                    }
                    reader.Close();
                    return drink;
                }
            }
        }

        public UserDrink GetByDrinkId(int drinkId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        [id], 
                                        [userId],
                                        [drinkId],
                                        [timesTried],
                                        [dateTime]
                                        FROM [userDrinks]
                                        WHERE [drinkId] = @drinkId";
                    DbUtils.AddParameter(cmd, "@drinkId", drinkId);
                    var reader = cmd.ExecuteReader();
                    UserDrink drink = null;
                    if (reader.Read())
                    {
                        drink = new UserDrink()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader,"userId"),
                            DrinkId = DbUtils.GetInt(reader,"drinkId"),
                            TimesTried = DbUtils.GetInt(reader,"timesTried"),
                            DateTime =DbUtils.GetDateTime(reader,"dateTime")
                        };
                    }
                    reader.Close();
                    return drink;
                }
            }
        } 

        public void UpdateUserDrinks(UserDrink userdrink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE [userDrinks]
                                        SET [timesTried] = @timesTried,
                                        [dateTime] = @dateTime
                                        WHERE [userId] = @userId AND [drinkId] = @drinkId";
                    DbUtils.AddParameter(cmd, "@timesTried", userdrink.TimesTried);
                    DbUtils.AddParameter(cmd,"@dateTime",userdrink.DateTime);
                    DbUtils.AddParameter(cmd, "@userId", userdrink.UserId);
                    DbUtils.AddParameter(cmd, "@drinkId", userdrink.DrinkId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

    }
}
