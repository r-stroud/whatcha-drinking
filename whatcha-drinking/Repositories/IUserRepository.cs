using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IUserRepository
    {
        NewUserDetails AddUser(NewUserDetails nud);
        NewUser GetByFirebaseId(string firebaseId);
        UserUsername GetByUsername(string username);
        UserEmail GetByEmail(string email);
    }
}