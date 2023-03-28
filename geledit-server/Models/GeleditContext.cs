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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Note>()
            .HasMany(n => n.Guests)
            .WithMany(u => u.IsGuestIn);

        modelBuilder.Entity<Note>()
            .HasOne(n => n.Owner);

        modelBuilder.Entity<Note>()
            .HasOne(n => n.CurrentEditor);

        modelBuilder.Entity<User>()
            .HasMany(u => u.OwnedNotes);
    }
}