using System.ComponentModel.DataAnnotations;

namespace TaskTrackerApp.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        public required string TaskName { get; set; }

        public required string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public TaskItem()
        {
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
