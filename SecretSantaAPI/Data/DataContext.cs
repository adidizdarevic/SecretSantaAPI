using Microsoft.EntityFrameworkCore;
using SecretSantaAPI.Models;

namespace SecretSantaAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserModel> UserModels { get; set; }
        public DbSet<RoleModel> RoleModels { get; set; }
        public DbSet<PairModel> PairModels { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlServer()
    }
}
