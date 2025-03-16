using Books.API.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Books.API.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{

    private BooksDbContext _booksContext;

    public BooksController(BooksDbContext temp)
    {
        _booksContext = temp;
    }
    
    [HttpGet("AllBooks")]
    public IActionResult GetProjects(int pageSize = 10, int pageNum = 1)
    {
        var books = _booksContext.Books
            .Skip((pageNum-1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumBooks = _booksContext.Books.Count();

        return Ok(new { Books = books, totalNumBooks = totalNumBooks });
    }

}