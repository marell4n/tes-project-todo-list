using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Policy CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// Adds the database context to the DI container.
builder.Services.AddDbContext<TodoContext>(opt => 
    opt.UseInMemoryDatabase("TodoList")); // Specifies that the database context will use an in-memory database.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // If you still want to use /openapi/v1/openapi.json like .NET 9 or bellow,
    // You are need to add spesific route to the JSON file.
    // app.MapOpenApi("/openapi/v1/openapi.json");

    /*
    app.UseSwaggerUi(options => 
    {
        // options.DocumentPath = "/openapi/v1/openapi.json"; 
        // Because this project using .NET 10, the default route are /openapi/v1.json
        options.DocumentPath = "/openapi/v1.json"; 
    });
    */

    // Or using Scalar UI (alternative), if Swagger UI error
    // I'm using Scalar because I can't try GET by id with Swagger UI, it always give 404 error.
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// Middleware CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
