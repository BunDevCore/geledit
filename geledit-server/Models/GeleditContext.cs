using Microsoft.EntityFrameworkCore;

namespace geledit_server.Models;

public class GeleditContext : DbContext
{
    public GeleditContext(DbContextOptions<GeleditContext> options)
        : base(options)
    {
    }

    public DbSet<Note> Notes { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
}