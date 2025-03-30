using System.Runtime.InteropServices.JavaScript;
using Microsoft.EntityFrameworkCore;
using Books.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BooksDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("booksConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBooks", policy =>
    {
        policy.AllowAnyOrigin()   // Allow any origin
            .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
            .AllowAnyHeader();  // Allow any headers
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBooks");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();