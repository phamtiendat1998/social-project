using Helper.Helper.Common;
using Helper.TempModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API_BlogCommunity.Controllers
{
    public class CategoryNewsFeedController : BaseApiController
    {
        DAL.Controllers.CategoryNewsFeedController dc = new DAL.Controllers.CategoryNewsFeedController();

        [Route("api/categorynewsfeed/create")]
        [HttpPost]
        public JsonResult Create([FromBody]Category category)
        {
            var result = new JsonResult();
            var folderInDriveId = ConfigurationManager.AppSettings["ImagesCategorySystemFolderId"];
            FileUploadData fileUpload = new FileUploadData(Convert.FromBase64String(category.Base64String),
                "image/png", "", $"{category.NameCategory}", new List<string> { folderInDriveId });

            var reponse = GoogleDriveFilesRepository.FileUpload(fileUpload);

            if (!String.IsNullOrEmpty(reponse))
            {
                category.CoverCategoryUrl = reponse;
            }

            if (dc.Create(category))
            {
                result.Data = 200;
            }
            else
            {
                result.Data = 501;
            }

            return result;
        }
    }
}
