using Newtonsoft.Json;
using Proto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Proto.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Panels()
        {
            return View();
        }

        public ActionResult About()
        {
            var list = Enumerable.Empty<object>()
             .Select(r => new { Title = "", Content = "" }) // prototype of anonymous type
             .ToList();

            for (int i = 0; i < 10; i++)
            {
                list.Add(new { Title = "some title" + i, Content = "some content" + i});
            }

            ViewBag.Payload = JsonConvert.SerializeObject(list, Formatting.Indented);

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Delay()
        {
            await Task.Delay(5000);

            return Json(new { message = "Hello" });
        }

        public ActionResult Progress()
        {
            var percent = Session["percent"];
            if (percent == null)
            {
                percent = 0;
                Session["percent"] = 0;
            }
            else if ((int)percent < 100)
            {
                percent = (int)percent + 10;
                Session["percent"] = percent;
            }
            else
            {
                Session["percent"] = null;
            }
            return Content(String.Format($"data: {percent}%\n\n"), "text/event-stream");
        }

        public async Task ProgressAsync()
        {
            Response.ContentType = "text/event-stream";
            Response.BufferOutput = false;

            int percent = 0;
            while (percent <= 100)
            {               
                Response.Write(String.Format($"data: {percent}%\n\n"));
                await Response.FlushAsync();

                percent += 10;
                await Task.Delay(1000);
            }

            Response.Close();
        }

        public ActionResult Broadcast(string message)
        {
            Helper.Broadcast = message;

            return new EmptyResult();
        }

        public ActionResult ServerEvent()
        {
            return Content(String.Format($"data: {Helper.Broadcast}\n\n"), "text/event-stream");
        }

        public ActionResult ServerMessage()
        {
            return View();
        }
    }
}