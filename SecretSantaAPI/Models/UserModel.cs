using System.ComponentModel.DataAnnotations;

namespace SecretSantaAPI.Models
{
    public class UserModel
    {
        public UserModel(string username, string passwordHash)
        {
            Username = username;
            Password = passwordHash;
            RoleName = "User";
        }
        public UserModel(string username, string passwordHash, string role)
        {
            Username = username;
            Password = passwordHash;
            RoleName = role;
        }

        public UserModel() { }
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }



    }
}
