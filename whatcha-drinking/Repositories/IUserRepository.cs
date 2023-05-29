using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IUserRepository
    {
        NewUserDetails AddUser(NewUserDetails nud);
        User GetByFirebaseId(string firebaseId);
        List<string> GetExistingFirebaseId();
        UserUsername GetByUsername(string username);
        UserEmail GetByEmail(string email);
    }
}