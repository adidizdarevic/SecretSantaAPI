using System.ComponentModel.DataAnnotations;

namespace SecretSantaAPI.Models
{
    public class PairModel
    {
        public PairModel(int x, int y)
        {
            X = x;
            Y = y;
        }

        [Key]
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }


    }
}
