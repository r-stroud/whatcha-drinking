using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IPostRepository
    {
        Post AddPost(Post post);
        List<DetailedPost> GetAllPosts();
        void RemovePost(int postId);
        DetailedPost GetById(int postId);
        void UpdatePost(Post post);
    }
}