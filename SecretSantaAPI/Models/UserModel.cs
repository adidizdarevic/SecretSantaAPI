using System.ComponentModel.DataAnnotations;

namespace SecretSantaAPI.Models
{
    public class UserModel
    {
        public UserModel(string userName, string password, string roleName)
        {
            UserName = userName;
            Password = password;
            RoleName = roleName;
        }

        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }



    }
}
