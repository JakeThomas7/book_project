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

    [HttpPost("Add")]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _booksContext.Books.Add(newBook);
        _booksContext.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("Update/{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var existingBook = _booksContext.Books.Find(id);

        if (existingBook == null)
        {
            return NotFound($"Book with ID {id} not found.");
        }

        // Update book fields
        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _booksContext.Books.Update(existingBook);
        _booksContext.SaveChanges();

        return Ok(existingBook);
    }

    [HttpDelete("Delete/{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _booksContext.Books.Find(id);
        _booksContext.Books.Remove(book);
        
        _booksContext.SaveChanges();
        return NoContent();
    }

}