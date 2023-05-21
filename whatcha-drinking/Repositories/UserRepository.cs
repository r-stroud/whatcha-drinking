using whatcha_drinking.Model;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public NewUserDetails AddUser(NewUserDetails nud)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    NewUserDetails user= new NewUserDetails();
                    cmd.CommandText = @"
                                        INSERT INTO [WhatchaDrinking].[dbo].[user]
                                        (firebaseId,firstName,lastName, username)
                                        OUTPUT inserted.id
                                        VALUES (@firebaseId,@firstName,@lastName, @username)";

                    DbUtils.AddParameter(cmd, "@firebaseId", nud.FirebaseId);
                    DbUtils.AddParameter(cmd, "@firstName", nud.FirstName);
                    DbUtils.AddParameter(cmd,"@lastName",nud.LastName);
                    DbUtils.AddParameter(cmd, "@username", nud.Username);
                    
                    user.FirebaseId= nud.FirebaseId;
                    user.FirstName = nud.FirstName;
                    user.LastName = nud.LastName;
                    user.Username= nud.Username;
                    user.Id = (int)cmd.ExecuteScalar();

                    return user;
                }
            }
        }

        public NewUser GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd =conn.CreateCommand())
                {
                    
                    cmd.CommandText = @"
                                        SELECT [id],[firebaseId] 
                                        FROM [WhatchaDrinking].[dbo].[user]
                                        WHERE [firebaseId] = @firebaseId";
                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    var reader = cmd.ExecuteReader();
                    NewUser user = null;
                    if (reader.Read())
                    {
                        user = new NewUser()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId")

                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }
    }
}
