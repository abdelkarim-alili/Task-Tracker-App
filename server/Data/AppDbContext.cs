using System;
using Microsoft.EntityFrameworkCore;
using TaskTrackerApp.Models;

namespace TaskTrackerApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<TaskItem> TaskItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(e => e.Id);
            });
        }

        public async Task<int> SaveChangesAsync()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is TaskItem && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var taskItem = (TaskItem)entry.Entity;

                if (entry.State == EntityState.Added)
                {
                    taskItem.CreatedAt = DateTime.UtcNow;
                }

                taskItem.UpdatedAt = DateTime.UtcNow;
            }

            return await base.SaveChangesAsync();
        }
    }
}
