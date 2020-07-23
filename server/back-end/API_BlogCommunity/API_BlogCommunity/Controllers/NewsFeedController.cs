using COMMON;
using DAL.Common;
using Helper.Helper.Common;
using Helper.TempModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API_BlogCommunity.Controllers
{
    [EnableCors("*", "*", "*")]
    public class NewsFeedController : ApiController
    {
        static string PrefixGG = ConfigurationManager.AppSettings["GoogleDriveFullImagePrefix"];
        string ParentComment = ConfigurationManager.AppSettings["Comment"];
        DAL.Controllers.NewsFeedController dc = new DAL.Controllers.NewsFeedController();

        [Route("api/newsfeed/postnews")]
        [HttpPost]
        public JsonResult PostNews([FromBody]NewsFeed news)
        {
            var result = new JsonResult { Data = "enter data" };

            if (!(string.IsNullOrEmpty(news.IdUser) && string.IsNullOrEmpty(news.IdCategory.ToString())))
            {
                result = dc.PostNews(news) == true ? new JsonResult { Data = "success" } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/updatenews")]
        [HttpPost]
        public JsonResult UpdateNews([FromBody]NewsFeed news)
        {
            var result = new JsonResult { Data = "enter data" };

            if (!(string.IsNullOrEmpty(news.IdUser) && string.IsNullOrEmpty(news.IdCategory.ToString())))
            {
                result = dc.UpdateNews(news) == true ? new JsonResult { Data = "success" } : new JsonResult { Data = "failed" };
            }
            return result;
        }

        [Route("api/newsfeed/quantitynewsbyuser")]
        [HttpGet]
        public JsonResult QuantityNewsByUser(string idUser)
        {
            return new JsonResult { Data = dc.QuantityPostNewsByUserID(idUser) };
        }

        [Route("api/newsfeed/getnews")]
        [HttpGet]
        public JsonResult GetNews(string idUser)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-NewsFeed"))
                {
                    foreach (var item in header.GetValues("Paging-NewsFeed"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetNewsFeed(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data?.Item2, ContentType = JsonConvert.SerializeObject(data?.Item1) };
            }

            return result;
        }

        [Route("api/newsfeed/getpostofuser")]
        [HttpGet]
        public JsonResult GetPostOfUser(string idUser)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-NewsFeed"))
                {
                    foreach (var item in header.GetValues("Paging-NewsFeed"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetAllNewFeedsOfUser(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data?.Item2, ContentType = JsonConvert.SerializeObject(data?.Item1) };
            }

            return result;
        }

        [Route("api/newsfeed/getnewsbyuserid")]
        [HttpGet]
        public JsonResult GetNewsByUserID(string idUser)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-NewsFeed"))
                {
                    foreach (var item in header.GetValues("Paging-NewsFeed"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetNewsFeedByUserID(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));
                result = new JsonResult { Data = data?.Item2, ContentType = JsonConvert.SerializeObject(data?.Item1) };
            }

            return result;
        }

        [Route("api/newsfeed/getcomments")]
        [HttpGet]
        public JsonResult GetComments(string idPost)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idPost))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Comments"))
                {
                    foreach (var item in header.GetValues("Paging-Comments"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetComments(idPost, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/newsfeed/getreplycomments")]
        [HttpGet]
        public JsonResult GetReplyComments(string idComment)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idComment))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Reply-Comments"))
                {
                    foreach (var item in header.GetValues("Paging-Reply-Comments"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetReplyComments(idComment, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data?.Item2, ContentType = JsonConvert.SerializeObject(data?.Item1) };
            }

            return result;
        }


        [Route("api/newsfeed/createcomment")]
        [HttpPost]
        public JsonResult CreateComment([FromBody]Comment comment)
        {
            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(comment.Content) && !string.IsNullOrEmpty(comment.IdPost) && !string.IsNullOrEmpty(comment.IdUser))
            {
                if (!string.IsNullOrEmpty(comment.Base64String))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(comment.Base64String);
                    var Images = UploadFile.UploadFileToDrive(listBase64Image, comment.IdUser, ParentComment);

                    comment.Image = JsonConvert.SerializeObject(Images);
                }

                string idComment = dc.CreateComment(comment);

                result = !string.IsNullOrEmpty(idComment) ? new JsonResult { Data = idComment } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/updatecomment")]
        [HttpPost]
        public JsonResult UpdateComment([FromBody]Comment comment)
        {
            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(comment.Content) && !string.IsNullOrEmpty(comment.IdComment) && !string.IsNullOrEmpty(comment.IdUser))
            {
                result = dc.UpdateComment(comment) ? new JsonResult { Data = "success" } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/removecomment")]
        [HttpPost]
        public JsonResult RemoveComment([FromBody]Comment comment)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(comment.IdComment) && string.IsNullOrEmpty(comment.IdUser)))
            {
                result = dc.RemoveComment(comment) ? new JsonResult { Data = "Deleted comment" } : new JsonResult { Data = "Delete failed" };
            }

            return result;
        }

        [Route("api/newsfeed/createlike")]
        [HttpPost]
        public JsonResult CreateLike([FromBody]LikePost likePost)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(likePost.IdPost) && string.IsNullOrEmpty(likePost.IdUser)))
            {
                result = dc.CreateLike(likePost) ? new JsonResult { Data = "liked" } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/removelike")]
        [HttpPost]
        public JsonResult RemoveLike([FromBody]LikePost likePost)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(likePost.IdPost) && string.IsNullOrEmpty(likePost.IdUser)))
            {
                result = dc.RemoveLike(likePost) ? new JsonResult { Data = "removed" } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/quantitylike")]
        [HttpGet]
        public JsonResult QuantityLike(string idPost)
        {
            var result = new JsonResult { Data = "enter idPost" };

            if (!string.IsNullOrEmpty(idPost))
            {
                result = new JsonResult { Data = dc.QuantityLike(idPost) };
            }

            return result;
        }

        [Route("api/newsfeed/getuserslikeofpost")]
        [HttpGet]
        public JsonResult GetUsersLikeOfPost(string idPost)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idPost))
            {
                var pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["NewsFeed-pageSize"]);
                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Users-Like"))
                {
                    foreach (var item in header.GetValues("Paging-Users-Like"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetUserLikeOfPost(idPost, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/newsfeed/createreplycomment")]
        [HttpPost]
        public JsonResult CreateReplyComment([FromBody]ReplyComment reply)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(reply.Content) && string.IsNullOrEmpty(reply.IdComment) && string.IsNullOrEmpty(reply.IdUser)))
            {
                if (!string.IsNullOrEmpty(reply.Base64String))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(reply.Base64String);
                    reply.Image = JsonConvert.SerializeObject(UploadFile.UploadFileToDrive(listBase64Image, reply.IdUser, ParentComment));
                }

                string idComment = dc.CreateReplyComment(reply);

                result = !string.IsNullOrEmpty(idComment) ? new JsonResult { Data = idComment } : new JsonResult { Data = "failed" };
            }

            return result;
        }

        [Route("api/newsfeed/updatereplycomment")]
        [HttpPost]
        public JsonResult UpdateReplyComment([FromBody]ReplyComment reply)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(reply.Content) && string.IsNullOrEmpty(reply.IdReply) && string.IsNullOrEmpty(reply.IdUser)))
            {
                result = dc.UpdateReplyComment(reply) ? new JsonResult { Data = "updated succsess" } : new JsonResult { Data = "failed reply" };
            }

            return result;
        }

        [Route("api/newsfeed/removereplycomment")]
        [HttpPost]
        public JsonResult RemoveReplyComment([FromBody]ReplyComment reply)
        {
            var result = new JsonResult { Data = "failed" };

            if (!(string.IsNullOrEmpty(reply.IdReply) && string.IsNullOrEmpty(reply.IdUser)))
            {
                result = dc.RemoveReplyComment(reply) ? new JsonResult { Data = "removed succsess" } : new JsonResult { Data = "failed remove" };
            }

            return result;
        }

        [Route("api/newsfeed/getimagesofpost")]
        [HttpPost]
        public JsonResult GetImagesOfPost([FromBody]ImagePostParams data)
        {
            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(data.IdUser))
            {
                result = new JsonResult { Data = dc.ListImageOfPost(data) };
            }

            return result;
        }
    }
}
