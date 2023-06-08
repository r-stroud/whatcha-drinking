using Microsoft.Identity.Client;
using System.Xml.Serialization;
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
                                        D.[picture],
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
                            Image = DbUtils.GetString(reader,"picture"),
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

        public UserDrink GetUserDrinkById(int drinkId, string userId)
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
                                        WHERE [drinkId] = @drinkId
                                        AND [userId] = @userId";
                    DbUtils.AddParameter(cmd, "@drinkId", drinkId);
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    var reader = cmd.ExecuteReader();
                    UserDrink drink = null;
                    if (reader.Read())
                    {
                        drink = new UserDrink()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetString(reader,"userId"),
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

        public Drink MostRecent(string userId) 
        { 
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT TOP (1) 
                                        D.[id],
                                        D.[name],
                                        D.[picture],
                                        DT.[type],
                                        UD.[timesTried],
                                        UD.[dateTime]
                                        FROM [drink] D
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]
                                        LEFT JOIN [userDrinks] UD
                                        ON UD.[drinkId] = D.[id]
                                        WHERE UD.[userId] = @userId
                                        ORDER BY UD.[dateTime] DESC";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    var reader = cmd.ExecuteReader();
                    Drink drink = null;
                    if(reader.Read())
                    {
                        drink = new Drink()
                        {
                            Id = DbUtils.GetInt(reader,"id"),
                            Name= DbUtils.GetString(reader,"name"),
                            Type = DbUtils.GetString(reader,"type"),
                            TimesTried = DbUtils.GetInt(reader,"timesTried"),
                            DateTime = DbUtils.GetDateTime(reader,"dateTime"),
                            Image= DbUtils.GetString(reader,"picture"),
                        };
                    }
                    reader.Close();
                    return drink;
                }
            }
        }

        public TimesDrank GetTimesTried(string userId, int drinkId) 
        
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                        UD.[timesTried]
                                        FROM [drink] D
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]
                                        LEFT JOIN [userDrinks] UD
                                        ON UD.[drinkId] = D.[id]
                                        LEFT JOIN [user] U
                                        ON U.[firebaseId] = UD.[userId]
                                        WHERE U.[firebaseId] = @firebaseId
                                        AND D.[id] = @drinkId";

                    DbUtils.AddParameter(cmd, "@firebaseId", userId);
                    DbUtils.AddParameter(cmd, "@drinkId", drinkId);
                    var reader = cmd.ExecuteReader();
                    TimesDrank times = null;
                    if (reader.Read())
                    {
                        times = new TimesDrank()
                        {
                            TimesTried = DbUtils.GetInt(reader,"timesTried")
                        };
                    }

                    reader.Close();
                    return times;
                }
                
            }
        }

        public DrinkPreference AddPreference(DrinkPreference drinkPreference)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [preferredDrink]
                                        ([userId],
                                        [drinkTypeId],
                                        [preferenceTypeId])
                                        OUTPUT INSERTED.id
                                        VALUES (@userId, @drinkTypeId, @preferenceTypeId)";
                    DbUtils.AddParameter(cmd, "@userId", drinkPreference.UserId);
                    DbUtils.AddParameter(cmd, "@drinkTypeId", drinkPreference.DrinkTypeId);
                    DbUtils.AddParameter(cmd, "@preferenceTypeId", drinkPreference.PreferenceTypeId);
                    drinkPreference.Id = (int)cmd.ExecuteScalar();
                    return drinkPreference;
                }
            }
        }

        public List<DrinkPreference> DrinkPreferencesByUserID(string userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT PD.[id], PD.[userId], PD.[drinkTypeId], PD.[preferenceTypeId], DT.[type]
                                        FROM [preferredDrink] PD
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = PD.[drinkTypeId]
                                        WHERE [userId] = @userId";
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    List<DrinkPreference> drinkPreferences = new List<DrinkPreference>();
                    DrinkPreference drinkPreference = null;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        drinkPreference = new DrinkPreference()
                        {
                            Id= DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetString(reader, "userId"),
                            DrinkTypeId = DbUtils.GetInt(reader,"drinkTypeId"),
                            PreferenceTypeId = DbUtils.GetInt(reader,"preferenceTypeId"),
                            Type = DbUtils.GetString(reader, "type")
                        };
                        drinkPreferences.Add(drinkPreference);
                    }

                    reader.Close();
                    return drinkPreferences;
                }
            }
        }

        public PreferenceType GetPreferenceTypeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT [id], [preferenceType]
                                        FROM [preferenceType]
                                        WHERE [id] = @id";
                    DbUtils.AddParameter(cmd,"@id", id);
                    PreferenceType preferenceType = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        preferenceType = new PreferenceType()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Preference = DbUtils.GetString(reader,"preferenceType")
                        };
                    }
                    reader.Close();
                    return preferenceType;
                }
            }
        }

        public DrinkPreference GetDrinkPreferenceById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT PD.[id], PD.[userId], PD.[drinkTypeId], PD.[preferenceTypeId], DT.[type]
                                        FROM [preferredDrink] PD
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = PD.[drinkTypeId]
                                        WHERE PD.[id] = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DrinkPreference preference = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        preference = new DrinkPreference()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetString(reader, "userId"),
                            DrinkTypeId = DbUtils.GetInt(reader, "drinkTypeId"),
                            PreferenceTypeId = DbUtils.GetInt(reader, "preferenceTypeId"),
                            Type = DbUtils.GetString(reader, "type")

                        };
                    }

                    reader.Close();
                    return preference;

                }
            }
        }


        public void RemoveDrinkPreference(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      DELETE FROM [preferredDrink] WHERE [id] = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int? GetDrinkPreferenceId(string userId, int drinkTypeId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT PD.[id] AS preferredID
                                        FROM [preferredDrink] PD
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = PD.[drinkTypeId]
                                        WHERE [userId] = @userId
                                        AND [drinkTypeId] =@drinkTypeId";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@drinkTypeId", drinkTypeId);

                    var reader = cmd.ExecuteReader();
                    int? drinkPreferenceId = null;
                    if(reader.Read())
                    {
                        drinkPreferenceId = DbUtils.GetInt(reader, "preferredID");
                    }
                    reader.Close();
                    return drinkPreferenceId;
                    
                }
            }
        }



    }
}
