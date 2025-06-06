using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using wandermate.backened.Models;
using Wandermate.Models;

namespace Wandermate.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Hotel> Hotel { get; set; }
        public DbSet<TravelPackages> TravelPackage { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<User> User { get; set; }

        public DbSet<Booking> Booking { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<Review>()
            //             .HasOne(r => r.User)
            //             .WithMany(u => u.Reviews)
            //             .HasForeignKey(r => r.UserId);


            // modelBuilder.Entity<Review>()
            // .HasOne(r => r.Hotel)
            // .WithMany(h => h.Review)
            // .HasForeignKey(r => r.HotelId);

            // modelBuilder.Entity<Hotel>()
            //     .HasMany(h => h.Review)
            //     .WithOne(i => i.Hotel)
            //     .HasForeignKey(i => i.HotelId)
            //     .OnDelete(DeleteBehavior.Cascade);
        }

        internal async Task SaveChangesAddAsync()
        {
            throw new NotImplementedException();
        }
    }
}
