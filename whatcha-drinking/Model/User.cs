namespace whatcha_drinking.Model
{
    public class User
    {
        public int FirebaseId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string ProfilePic { get; set; }
    }

    public class NewUser
    {
        public int FirebaseId { get; set; }
    }
}
