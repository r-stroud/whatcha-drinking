using System.Security.Cryptography;
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
                                        (firebaseId,
                                        firstName,
                                        lastName, 
                                        username, 
                                        email, 
                                        profilePic)
                                        OUTPUT inserted.id
                                        VALUES (@firebaseId,
                                        @firstName,
                                        @lastName, 
                                        @username, 
                                        @email, 
                                        @profilePic)";

                    DbUtils.AddParameter(cmd, "@firebaseId", nud.FirebaseId);
                    DbUtils.AddParameter(cmd, "@firstName", nud.FirstName);
                    DbUtils.AddParameter(cmd,"@lastName",nud.LastName);
                    DbUtils.AddParameter(cmd, "@username", nud.Username);
                    DbUtils.AddParameter(cmd, "@email", nud.Email);
                    DbUtils.AddParameter(cmd, "@profilePic", nud.ProfilePic);
                    
                    user.FirebaseId= nud.FirebaseId;
                    user.FirstName = nud.FirstName;
                    user.LastName = nud.LastName;
                    user.Username= nud.Username;
                    user.Email= nud.Email;
                    user.ProfilePic= nud.ProfilePic;
                    user.Id = (int)cmd.ExecuteScalar();

                    return user;
                }
            }
        }

        public User GetByFirebaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd =conn.CreateCommand())
                {
                    
                    cmd.CommandText = @"
                                        SELECT [id],[firebaseId], [email], [username],[firstName],[lastName],[address],[profilePic]
                                        FROM [WhatchaDrinking].[dbo].[user]
                                        WHERE [firebaseId] = @firebaseId";
                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    var reader = cmd.ExecuteReader();
                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            Email = DbUtils.GetString(reader,"email"),
                            Username= DbUtils.GetString(reader,"username"),
                            FirstName = DbUtils.GetString(reader,"firstName"),
                            LastName = DbUtils.GetString(reader,"lastName"),
                            Address = DbUtils.GetString(reader,"address"),
                            ProfilePic = DbUtils.GetString(reader,"profilePic")
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public List<string> GetExistingFirebaseId() 
        { 
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd =conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT [id],[firebaseId] 
                                        FROM [WhatchaDrinking].[dbo].[user]";
                    var reader = cmd.ExecuteReader();
                    List<string> firebaseIds= new List<string>();
                    UserFirebaseId user = null;
                    while (reader.Read())
                    {
                        user = new UserFirebaseId()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId")
                        };

                        firebaseIds.Add(user.FirebaseId);
                        
                    }
                    reader.Close();
                    return firebaseIds;
                }
            }
        }

        public UserUsername GetByUsername(string username)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd =conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT [username]
                                        FROM [WhatchaDrinking].[dbo].[user]
                                        WHERE [username] = @username";
                    DbUtils.AddParameter(cmd, "@username", username);
                    var reader = cmd.ExecuteReader();
                    UserUsername user = null;
                    if(reader.Read())
                    {
                        user = new UserUsername()
                        {
                            Username = DbUtils.GetString(reader, "username")
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public UserEmail GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd =conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT [email]
                                        FROM [WhatchaDrinking].[dbo].[user]
                                        WHERE [email] = @email";
                    DbUtils.AddParameter(cmd, "@email", email);
                    var reader = cmd.ExecuteReader();
                    UserEmail user = null;
                    if(reader.Read())
                    {
                        user = new UserEmail() 
                        { 
                            Email = DbUtils.GetString(reader, "email")
                        };

                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd =conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT [id],[firebaseId], [email], [username],[firstName],[lastName],[address],[profilePic]
                                        FROM [WhatchaDrinking].[dbo].[user]
                                        WHERE [id] = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirebaseId = DbUtils.GetString(reader, "firebaseId"),
                            Email = DbUtils.GetString(reader, "email"),
                            Username = DbUtils.GetString(reader, "username"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            Address = DbUtils.GetString(reader, "address"),
                            ProfilePic = DbUtils.GetString(reader, "profilePic")
                        };
                    }
                    reader.Close() ;
                    return user;
                }
            }
        }
    }
}
