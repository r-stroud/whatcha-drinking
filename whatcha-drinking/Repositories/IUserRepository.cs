﻿using whatcha_drinking.Model;

namespace whatcha_drinking.Repositories
{
    public interface IUserRepository
    {
        NewUserDetails AddUser(NewUserDetails nud);
        User GetByFirebaseId(string firebaseId);
        User GetById(string userId);
        List<string> GetExistingFirebaseId();
        UserUsername GetByUsername(string username);
        UserEmail GetByEmail(string email);
        void UpdateUser(User user);
        public UserFriend AddFriend(UserFriend userFriend);
        public List<FriendRequest> GetFriendRequests(string userId);
        public List<FriendRequest> GetFriends(string userId);
    }
}