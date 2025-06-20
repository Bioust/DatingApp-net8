using API.Data;
using API.Extensions;
using API.MiddleWare;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleWare>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","http://localhost:4200").WithExposedHeaders("Pagination"));
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();   //Middleware to map controllers
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUser(context);
}
catch (Exception ex)
{
     var logger = services.GetRequiredService<ILogger<Program>>();
     logger.LogError("An Error Occured During Migration");
}

app.Run();
