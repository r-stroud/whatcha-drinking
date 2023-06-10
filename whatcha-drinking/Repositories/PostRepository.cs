using Microsoft.Identity.Client;
using System.Xml.Serialization;
using whatcha_drinking.Model;
using whatcha_drinking.Utils;

namespace whatcha_drinking.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public Post AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO [post]
                                        ([userId],
                                        [drinkId],
                                        [dateTime],
                                        [picture],
                                        [message])
                                        OUTPUT INSERTED.id
                                        VALUES (@userId,@drinkId, @dateTime, @picture, @message)";

                    DbUtils.AddParameter(cmd, "@userId", post.UserId);
                    DbUtils.AddParameter(cmd, "@drinkId", post.DrinkId);
                    DbUtils.AddParameter(cmd, "@dateTime", post.DateTime);
                    DbUtils.AddParameter(cmd, "@picture", post.Picture);
                    DbUtils.AddParameter(cmd, "@message", post.Message);
                    post.Id = (int)cmd.ExecuteScalar();
                    return post;

                }
            }
        }

        public List<DetailedPost> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                        P.[id] AS postId,
                                        P.[userId],
                                        P.[drinkId],
                                        P.[dateTime],
                                        P.[picture] AS postPic,
                                        P.[message],
                                        D.[name],
                                        D.[picture] AS drinkPic,
                                        DT.[type],
                                        U.[username],
                                        U.[firstName],
                                        U.[lastName],
                                        U.[profilePic]
                                        FROM [post] P
                                        LEFT JOIN [drink] D
                                        ON D.[id] = P.[drinkId]
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]
                                        LEFT JOIN [user] U
                                        ON U.[firebaseId] = P.[userId]
                                        ";
                    var reader = cmd.ExecuteReader();
                    List<DetailedPost> detailedPosts= new List<DetailedPost>();
                    DetailedPost post = null;
                    while (reader.Read())
                    {
                        post = new DetailedPost()
                        {
                            Id = DbUtils.GetInt(reader, "postId"),
                            UserId = DbUtils.GetString(reader, "userId"),
                            DrinkId = DbUtils.GetInt(reader,"drinkId"),
                            DateTime = DbUtils.GetDateTime(reader,"dateTime"),
                            Picture = DbUtils.GetString(reader,"postPic"),
                            Message = DbUtils.GetString(reader, "message"),
                            DrinkName = DbUtils.GetString(reader,"name"),
                            DrinkPic = DbUtils.GetString(reader,"drinkPic"),
                            DrinkType = DbUtils.GetString(reader,"type"),
                            Username = DbUtils.GetString(reader,"username"),
                            UserFirstName = DbUtils.GetString(reader, "firstName"),
                            UserLastName = DbUtils.GetString(reader,"lastName"),
                            UserPic = DbUtils.GetString(reader, "profilePic")

                        };
                        detailedPosts.Add(post);
                    }

                    reader.Close();
                    return detailedPosts;

                }
            }
        }

        public void RemovePost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand()) 
                {
                    cmd.CommandText = @"
                                        DELETE FROM [post] WHERE [id] = @id";
                    DbUtils.AddParameter(cmd, "@id", postId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public DetailedPost GetById(int postId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT 
                                        P.[id] AS postId,
                                        P.[userId],
                                        P.[drinkId],
                                        P.[dateTime],
                                        P.[picture] AS postPic,
                                        P.[message],
                                        D.[name],
                                        D.[picture] AS drinkPic,
                                        DT.[type],
                                        U.[username],
                                        U.[firstName],
                                        U.[lastName],
                                        U.[profilePic]
                                        FROM [post] P
                                        LEFT JOIN [drink] D
                                        ON D.[id] = P.[drinkId]
                                        LEFT JOIN [drinkType] DT
                                        ON DT.[id] = D.[drinkTypeId]
                                        LEFT JOIN [user] U
                                        ON U.[firebaseId] = P.[userId]
                                        WHERE P.[id] = @postId
                                        ";

                    DbUtils.AddParameter(cmd, "@postId", postId);
                    var reader = cmd.ExecuteReader();
                    DetailedPost post = null;
                    if (reader.Read())
                    {
                        post = new DetailedPost()
                        {
                            Id = DbUtils.GetInt(reader, "postId"),
                            UserId = DbUtils.GetString(reader, "userId"),
                            DrinkId = DbUtils.GetInt(reader, "drinkId"),
                            DateTime = DbUtils.GetDateTime(reader, "dateTime"),
                            Picture = DbUtils.GetString(reader, "postPic"),
                            Message = DbUtils.GetString(reader, "message"),
                            DrinkName = DbUtils.GetString(reader, "name"),
                            DrinkPic = DbUtils.GetString(reader, "drinkPic"),
                            DrinkType = DbUtils.GetString(reader, "type"),
                            Username = DbUtils.GetString(reader, "username"),
                            UserFirstName = DbUtils.GetString(reader, "firstName"),
                            UserLastName = DbUtils.GetString(reader, "lastName"),
                            UserPic = DbUtils.GetString(reader, "profilePic")
                        };
                    }
                    reader.Close();
                    return post;
                }
            }
        }
    }
}
