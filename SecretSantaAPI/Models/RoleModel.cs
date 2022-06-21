using System.ComponentModel.DataAnnotations;

namespace SecretSantaAPI.Models
{
    public class RoleModel
    {
        public RoleModel(string roleName)
        {
            RoleName = roleName;
        }

        [Key]
        public int Id { get; set; }
        public string RoleName { get; set; }

        
    }
    public enum RoleType
    {
        Admin = 0,
        User = 1
    }
}
