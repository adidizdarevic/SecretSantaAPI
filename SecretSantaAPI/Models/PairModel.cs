using System.ComponentModel.DataAnnotations;

namespace SecretSantaAPI.Models
{
    public class PairModel
    {
        [Key]
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

    }
}
