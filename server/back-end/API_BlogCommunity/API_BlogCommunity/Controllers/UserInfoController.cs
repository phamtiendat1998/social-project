using Helper.TempModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class UserInfoController : BaseApiController
    {
        private DAL.Controllers.UserInfoController dc = new DAL.Controllers.UserInfoController();
        private DAL.Controllers.UserContactController contactdc = new DAL.Controllers.UserContactController();

        [Route("api/userinfo/getinfo")]
        [HttpGet]
        public JsonResult GetInfo(string idUser)
        {
            if (!String.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.Get(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/createinfo")]
        [HttpPost]
        public JsonResult CreateInfo([FromBody]UserInfo info)
        {
            if (!(string.IsNullOrEmpty(info.IdUser) && string.IsNullOrEmpty(info.FirstName) && string.IsNullOrEmpty(info.LastName)))
            {
                return dc.Create(info) ? new JsonResult { Data = "Created success" } : new JsonResult { Data = "Creat failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/updateinfo")]
        [HttpPost]
        public JsonResult UpdateInfo([FromBody]UserInfo info)
        {
            if (!(string.IsNullOrEmpty(info.IdInfo) && string.IsNullOrEmpty(info.IdUser)))
            {
                return dc.Update(info) ? new JsonResult { Data = "Updated succsess" } : new JsonResult { Data = "Update failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getcontact")]
        [HttpGet]
        public JsonResult GetContact(string idUser)
        {
            if (!String.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = contactdc.Get(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/createcontact")]
        [HttpPost]
        public JsonResult CreateContact([FromBody]UserContact contact)
        {
            if (!(string.IsNullOrEmpty(contact.IdUser) && (string.IsNullOrEmpty(contact.Email) || string.IsNullOrEmpty(contact.PhoneNumber))))
            {
                return contactdc.Create(contact) ? new JsonResult { Data = "Created success" } : new JsonResult { Data = "Creat failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/updatecontact")]
        [HttpPost]
        public JsonResult UpdateContact([FromBody]UserContact contact)
        {
            if (!(string.IsNullOrEmpty(contact.IdUser) && string.IsNullOrEmpty(contact.IdContact)))
            {
                return contactdc.Update(contact) ? new JsonResult { Data = "Updated succsess" } : new JsonResult { Data = "Update failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/insertaddress")]
        [HttpPost]
        public JsonResult InsertAddress([FromBody]UserAddress data)
        {
            if (!string.IsNullOrEmpty(data.IdUser))
            {
                return new JsonResult { Data = dc.InsertAddress(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/updateaddress")]
        [HttpPost]
        public JsonResult UpdateAddress([FromBody]UserAddress data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdUserAddress))
            {
                return dc.UpdateAddress(data) ? new JsonResult { Data = "Updated adrress succsess" } : new JsonResult { Data = "Update adrress failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getaddressofuser")]
        [HttpGet]
        public JsonResult GetAddressOfUser(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.ListAddress(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getaddressofuserpublic")]
        [HttpGet]
        public JsonResult GetAddressOfUserPublic(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.ListAddressPublic(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/deleteaddress")]
        [HttpPost]
        public JsonResult DeleteAddress([FromBody] UserAddress data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdUserAddress))
            {
                return dc.DeleteAddress(data) ? new JsonResult { Data = "Deleted address" } : new JsonResult { Data = "Delete address failed" };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getintroworking")]
        [HttpGet]
        public JsonResult GetIntroWorking(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetIntroWorking(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getintroworkingpublic")]
        [HttpGet]
        public JsonResult GetIntroWorkingPublic(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetIntroWorkingPublic(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getintrostudy")]
        [HttpGet]
        public JsonResult GetIntroStudy(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetIntroStudies(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getintrostudypublic")]
        [HttpGet]
        public JsonResult GetIntroStudyPublic(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetIntroStudiesPublic(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/insertintrostudy")]
        [HttpPost]
        public JsonResult InsertIntroStudy([FromBody]IntroStudy data)
        {
            if (!string.IsNullOrEmpty(data.Studying) && !string.IsNullOrEmpty(data.IdUserIntro))
            {
                return new JsonResult { Data = dc.CreateIntroStudy(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/insertintroworking")]
        [HttpPost]
        public JsonResult InsertIntroWorking([FromBody]IntroWorking data)
        {
            if (!string.IsNullOrEmpty(data.WorkingAt) && !string.IsNullOrEmpty(data.IdUserIntro))
            {
                return new JsonResult { Data = dc.CreateIntroWorking(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/updateintroworking")]
        [HttpPost]
        public JsonResult UpdateIntroWorking([FromBody]IntroWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdUserIntro) && !string.IsNullOrEmpty(data.IdWorking))
            {
                return new JsonResult { Data = dc.UpdateIntroWorking(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/updateintrostudy")]
        [HttpPost]
        public JsonResult UpdateIntroStudy([FromBody]IntroStudy data)
        {
            if (!string.IsNullOrEmpty(data.IdUserIntro) && !string.IsNullOrEmpty(data.IdStudy))
            {
                return new JsonResult { Data = dc.UpdateIntroStudy(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/deleteintrostudy")]
        [HttpPost]
        public JsonResult DeleteIntroStudy([FromBody]IntroStudyWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdStudy) && !string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdIntro))
            {
                return new JsonResult { Data = dc.DeleteIntroStudy(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/deleteintroworking")]
        [HttpPost]
        public JsonResult DeleteIntroWorking([FromBody]IntroStudyWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdWorking) && !string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdIntro))
            {
                return new JsonResult { Data = dc.DeleteIntroWorking(data) };
            }

            return new JsonResult { Data = "enter data" };
        }

        [Route("api/userinfo/getbasicinfo")]
        [HttpGet]
        public JsonResult GetBasicInfo(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                return new JsonResult { Data = dc.GetBasicInfo(idUser) };
            }

            return new JsonResult { Data = "enter data" };
        }
    }
}
