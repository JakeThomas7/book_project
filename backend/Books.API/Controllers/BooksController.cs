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
    public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, string sort = "asc", [FromQuery] List<string>? categories = null)
    {
        var query = _booksContext.Books.AsQueryable();
        
        if (categories is not null)
        {
            query = query.Where(c => categories.Contains(c.Category));
        }

        if (sort == "asc")
        {
            query = query.OrderBy(c => c.Title);
        }
        else if (sort == "desc")
        {
            query = query.OrderByDescending(c => c.Title);
        }
        
        var books = query
            .Skip((pageNum-1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumBooks = query.Count();

        return Ok(new { Books = books, totalNumBooks = totalNumBooks });
    }

    [HttpGet("Categories")]
    public IActionResult GetBookCategories()
    {
        var bookCategories = _booksContext.Books
            .Select(bc => bc.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookCategories);
    }

}