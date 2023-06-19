namespace whatcha_drinking.Model
{
    public class User
    {
        public string FirebaseId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string ProfilePic { get; set; }
    }

    public class UserFirebaseId
    {

        public string FirebaseId { get; set; }
    }

    public class NewUserDetails
    {
        public string FirebaseId { get; set; }
        public string ProfilePic { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        
    }

    public class UserUsername 
    { 
        public string Username { get; set; }
    }

    public class UserEmail
    {
        public string Email { get; set; }
    }

    public class UserFriend 
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FriendId { get; set; }
        public bool IsApproved { get; set; }

    }

    public class FriendRequest
    {

        public string FirebaseId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePic { get; set; }
        public bool IsApproved { get; set; }

    }


}
