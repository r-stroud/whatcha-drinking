using whatcha_drinking.Model;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public NewUser Add(NewUser user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [WhatchaDrinking].[dbo].[user](firebaseId)
                                        OUTPUT inserted.firebaseId
                                        VALUES (@firebaseId)";

                    user.FirebaseId = (int)cmd.ExecuteScalar();

                    return user;
                }
            }
        }
    }
}
