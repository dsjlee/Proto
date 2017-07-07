﻿using System;
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

            for (int i = 0; i < 1000; i++)
            {
                list.Add(new { Title = "some title" + i, Content = "some content" + i});
            }

            ViewBag.Payload = Newtonsoft.Json.JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.Indented);

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

        [HttpGet]
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
            return Content(String.Format("data: {0}%\n\n", percent), "text/event-stream");
        }
    }
}