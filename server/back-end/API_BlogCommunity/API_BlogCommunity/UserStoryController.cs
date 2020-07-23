using Helper.TempModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API_BlogCommunity.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UserStoryController : BaseApiController
    {
        DAL.Controllers.UserStoryController dc = new DAL.Controllers.UserStoryController();

        [Route("api/userstory/create")]
        [HttpPost]
        public JsonResult Create([FromBody]UserStory data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && data.TypeContent != 0 && !string.IsNullOrEmpty(data.Content))
            {
                return new JsonResult { Data = dc.InsertStory(data) };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/getstory")]
        [HttpGet]
        public JsonResult GetStory(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetListStoryOfUser(idUser) };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/deletestory")]
        [HttpPost]
        public JsonResult DeleteStory([FromBody]UserStory data)
        {
            if (!string.IsNullOrEmpty(data.IdStory) && !string.IsNullOrEmpty(data.IdUser))
            {
                return dc.DeleteStory(data) > 0 ? new JsonResult { Data = "Deleted Story" } : new JsonResult { Data = "Delete failed" };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/quantityseen")]
        [HttpGet]
        public JsonResult QuantitySeen(string idStory)
        {
            if (!string.IsNullOrEmpty(idStory))
            {
                return new JsonResult { Data = dc.GetQuantityUserSeenStory(idStory) };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/createseen")]
        [HttpPost]
        public JsonResult CreateSeen([FromBody]StorySeen data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdStory))
            {
                return dc.InsertNewSeen(data) > 0 ? new JsonResult { Data = "Created seen" } : new JsonResult { Data = "failed" };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/getstoryoffriends")]
        [HttpGet]
        public JsonResult GetStoryOfFriends(string idUser, int take)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetStoryOfFriends(idUser) };
            }

            return new JsonResult { Data = "failed" };
        }

        [Route("api/userstory/getinfouserseenstory")]
        [HttpGet]
        public JsonResult GetInfoUserSeenStory(string idStory)
        {
            if (!string.IsNullOrEmpty(idStory))
            {
                return new JsonResult { Data = dc.GetInfoUserSeenStory(idStory) };
            }

            return new JsonResult { Data = "failed" };
        }
    }
}