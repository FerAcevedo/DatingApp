using API.Extensions;
using API.Interfaces;
using API.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddApplicationServices(builder.Configuration);

        builder.Services.AddCors();
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddIdentityServices(builder.Configuration);
        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseCors(build => build
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("https://localhost:4200"));

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}