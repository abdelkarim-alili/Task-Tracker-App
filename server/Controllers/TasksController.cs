using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTrackerApp.Data;
using TaskTrackerApp.Models;

namespace TaskTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TasksController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetTasks(int page = 1, int pageSize = 10)
        {
            try
            {
                var tasks = await _context.TaskItems
                    .OrderByDescending(t => t.CreatedAt)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
                var totalTasks = await _context.TaskItems.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalTasks / pageSize);

                return Ok(new
                {
                    TotalTasks = totalTasks,
                    TotalPages = totalPages,
                    CurrentPage = page,
                    PageSize = pageSize,
                    Tasks = tasks
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while retrieving tasks", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TaskItem task)
        {
            try
            {
                _context.TaskItems.Add(task);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Task added successfully.", data = task });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while adding the task.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskItem task)
        {
            try
            {
                var existingTask = await _context.TaskItems.FindAsync(id);
                if (existingTask == null)
                {
                    return NotFound(new { message = "Task not found." });
                }

                existingTask.TaskName = task.TaskName;
                existingTask.Description = task.Description;
                existingTask.IsCompleted = task.IsCompleted;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Task updated successfully.", data = existingTask });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while updating the task.", details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.TaskItems.FindAsync(id);
                if (task == null)
                {
                    return NotFound(new { message = "Task not found." });
                }

                _context.TaskItems.Remove(task);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Task deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while deleting the task.", details = ex.Message });
            }
        }
    }
}
