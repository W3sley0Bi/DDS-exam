using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Tutorial8.Models;



namespace Tutorial8.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IWebHostEnvironment _env;
    public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env)
    {
        _logger = logger;
        _env = env;
    }
    
    public IActionResult Index()
    {
        List<String> arr = new List<string>{};
        var dataFile = Path.Combine(_env.ContentRootPath, "Models", "Name.txt");
        String line;
      using (StreamReader reader = new StreamReader(dataFile))
    {
    while ((line = reader.ReadLine()) != null)
    {
        
        arr.Add(line);
        
    }
    
        //Console.WriteLine(arr);
        ViewData["Data"] =  arr;
    

    }
    

        return View();

    }

    [HttpPost]
    [Route("submitform")]
     public IActionResult PostingHandler(MyModel model){

        String TextBox = model.textBox;
        Console.WriteLine(TextBox);

       var dataFile = Path.Combine(_env.ContentRootPath, "Models", "Name.txt");
        using (StreamWriter sw = new StreamWriter(dataFile, append:true))
            {
             

                    sw.WriteLine(TextBox);
                
            }
       
       
    
        
        return RedirectToAction("Index");
     }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
