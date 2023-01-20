using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Homework8.Models;
using System.Text.RegularExpressions;

namespace Homework8.Controllers;

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
        var dataFile = Path.Combine(_env.ContentRootPath, "Models", "names.txt");
        String line;
      using (StreamReader reader = new StreamReader(dataFile))
    {
    while ((line = reader.ReadLine()) != null)
    {
        
        arr.Add(line);
        
    }
    
        //Console.WriteLine(arr);
        ViewData["names"] =  arr;
    

    }
    

        return View();

    }


    [HttpGet]
    [Route("submitform")]
     public IActionResult Results(MyModel model){

        String textInput = model.textInput;
        //Console.WriteLine(textInput);

     List<String> arr = new List<string>{};
        var dataFile = Path.Combine(_env.ContentRootPath, "Models", "names.txt");
        String line;
      using (StreamReader reader = new StreamReader(dataFile))
    {
    while ((line = reader.ReadLine()) != null)
    {
        
        bool isMatch = Regex.IsMatch(line, "(?i)^" + textInput + ".*");
       
        if(isMatch){
        Console.WriteLine(isMatch+ " "+line);
        arr.Add(line);

        }

    }
    
        
        ViewData["res"] =  arr;
    

    }
 
        return View();
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
