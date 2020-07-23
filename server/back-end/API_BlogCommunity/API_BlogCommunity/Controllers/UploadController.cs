using DAL.Common;
using DAL.Controllers;
using Helper.Helper.Common;
using Helper.TempModel;
using System;
using System.Collections.Generic;
using System.Configuration;
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
    public class UploadController : ApiController
    {
        UserController dcUser = new UserController();
        DAL.Controllers.UserInfoController dcInfo = new DAL.Controllers.UserInfoController();

        /// <summary>
        /// Upload  User Info
        /// </summary>
        /// <param name="IdUser">string</param>
        /// <param name="Cover or Avatar">base64 string</param>
        /// <param name="Content">string</param>
        /// <returns></returns>
        [Route("api/upload/uploadavatarOrcover")]
        [HttpPost]
        public JsonResult UploadAvatarOrCover(UserInfo userinfo)
        {
            string parentAvatar = ConfigurationManager.AppSettings["Avatar"];
            string parentCover = ConfigurationManager.AppSettings["Cover"];

            var result = new JsonResult { Data = "enter data" };

            if (!((String.IsNullOrEmpty(userinfo.Avatar) || String.IsNullOrEmpty(userinfo.Cover)) && String.IsNullOrEmpty(userinfo.IdUser)
                && String.IsNullOrEmpty(parentAvatar) && String.IsNullOrEmpty(parentCover)) && dcUser.IsExistIDUser(userinfo.IdUser))
            {
                var isUpload = !String.IsNullOrEmpty(userinfo.Avatar) ?
                    dcInfo.UploadAvatarOrCover(userinfo, parentAvatar) :
                    dcInfo.UploadAvatarOrCover(userinfo, parentCover);

                return isUpload == true ? new JsonResult { Data = "success" } : new JsonResult { Data = "failed" };
            }

            return result;
        }
    }
}
