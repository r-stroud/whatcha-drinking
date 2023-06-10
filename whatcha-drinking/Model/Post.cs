namespace whatcha_drinking.Model
{
    public class Post
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int DrinkId { get; set; }

        public DateTime DateTime { get; set; }
        public string? Picture { get; set; } = null;
        public string Message { get; set; }
    }

    public class DetailedPost
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserPic { get; set; }
        public int DrinkId { get; set; }
        public string DrinkName { get; set; }
        public string DrinkPic { get; set; }
        public string DrinkType { get; set; }
        public DateTime DateTime { get; set; }
        public string? Picture { get; set; } = null;
        public string Message { get; set; }
    }
}
