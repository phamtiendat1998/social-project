using DAL.Common;
using Helper.TempModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class UserAccountController : BaseApiController
    {
        DAL.Controllers.AccountController dc = new DAL.Controllers.AccountController();

        [Route("api/useraccount/getaccount")]
        [HttpGet]
        public HttpResponseMessage GetAccount(string idUser)
        {
            if (!String.IsNullOrEmpty(idUser))
            {
                var account = dc.Get(idUser);
                return Request.CreateResponse<UserSignUp>(HttpStatusCode.OK, account);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "id user");
        }

        [Route("api/useraccount/updateinfoaccount")]
        [HttpPost]
        public HttpResponseMessage UpdateInfoAccount([FromBody]UserSignUp account)
        {
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "id user");
        }

        [Route("api/useraccount/getfriends")]
        [HttpGet]
        public JsonResult GetFriends(string idUser, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["ListFriend-Big-pageSize"]) :
                                           Convert.ToInt32(ConfigurationManager.AppSettings["ListFriend-Small-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Friends"))
                {
                    foreach (var item in header.GetValues("Paging-Friends"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetFriends(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/useraccount/getfriendssuggest")]
        [HttpGet]
        public JsonResult GetFriendsSuggest(string idUser, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["SuggestFriend-Big-pageSize"]) :
                                       Convert.ToInt32(ConfigurationManager.AppSettings["SuggestFriend-Small-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Friends-Suggest"))
                {
                    foreach (var item in header.GetValues("Paging-Friends-Suggest"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetFriendSuggest(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                var listFriends = data.Item2;

                result = new JsonResult { Data = listFriends, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/useraccount/getquantityrequestfriend")]
        [HttpGet]
        public JsonResult GetQuantityRequestFriend(string idUser)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!String.IsNullOrEmpty(idUser))
            {
                result = new JsonResult { Data = dc.QuantityRequestFriend(idUser) };
            }

            return result;
        }

        [Route("api/useraccount/getquantityfriend")]
        [HttpGet]
        public JsonResult GetQuantityFriend(string idUser)
        {
            return new JsonResult { Data = dc.QuantityFriend(idUser) };
        }

        [Route("api/useraccount/createrequestfriend")]
        [HttpPost]
        public JsonResult CreateRequestFriend(RequestFriends friend)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserRequest)))
            {
                result = dc.InsertRequestFriend(friend) == true ? new JsonResult { Data = "created request friend" } : new JsonResult { Data = "failed create request friend" };
            }

            return result;
        }

        [Route("api/useraccount/removerequestfriend")]
        [HttpPost]
        public JsonResult RemoveRequestFriend(RequestFriends friend)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserRequest)))
            {
                result = dc.RemoveRequestFriend(friend) == true ? new JsonResult { Data = "removed request friend" } : new JsonResult { Data = "failed remove request friend" };
            }

            return result;
        }

        [Route("api/useraccount/createfriend")]
        [HttpPost]
        public JsonResult CreateFriend(Friends friend)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserFriend)))
            {
                result = dc.CreateFriend(friend) == true ? new JsonResult { Data = "created friend" } : new JsonResult { Data = "failed create friend" };
            }

            return result;
        }

        [Route("api/useraccount/removefriend")]
        [HttpPost]
        public JsonResult RemoveFriend(Friends friend)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(friend.IdUser) && String.IsNullOrEmpty(friend.IdUserFriend)))
            {
                result = dc.RemoveFriend(friend) == true ? new JsonResult { Data = "removed friend" } : new JsonResult { Data = "failed remove friend" };
            }

            return result;
        }

        [Route("api/useraccount/createfollows")]
        [HttpPost]
        public JsonResult CreateFollows([FromBody]Follows follow)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest)))
            {
                result = dc.CreateFollows(follow) == true ? new JsonResult { Data = "created follow" } : new JsonResult { Data = "failed follows" };
            }

            return result;
        }

        [Route("api/useraccount/isfollowing")]
        [HttpPost]
        public JsonResult IsFollowing([FromBody]Follows follow)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest)))
            {
                result = dc.IsFollowing(follow) ? new JsonResult { Data = true } : new JsonResult { Data = false };
            }

            return result;
        }

        [Route("api/useraccount/isfriend")]
        [HttpPost]
        public JsonResult IsFriend([FromBody]Friends data)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(data.IdUser) && String.IsNullOrEmpty(data.IdUserFriend)))
            {
                result = dc.IsFriend(data) ? new JsonResult { Data = true } : new JsonResult { Data = false };
            }

            return result;
        }

        [Route("api/useraccount/removefollow")]
        [HttpPost]
        public JsonResult RemoveFollow(Follows follow)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(follow.IdUser) && String.IsNullOrEmpty(follow.IdUserRequest)))
            {
                result = dc.RemoveFollows(follow) == true ? new JsonResult { Data = "removed follow" } : new JsonResult { Data = "failed remove follow" };
            }

            return result;
        }

        [Route("api/useraccount/getquantityfollowers")]
        [HttpGet]
        public JsonResult GetQuantityFollowers(string idUser)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!String.IsNullOrEmpty(idUser))
            {
                result = new JsonResult { Data = dc.QuantityFollowers(idUser) };
            }

            return result;
        }

        [Route("api/useraccount/getfollowers")]
        [HttpGet]
        public JsonResult GetFollowers(string idUser, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;

            var result = new JsonResult { Data = "failed" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["ListFollowers-Big-pageSize"]) :
                                       Convert.ToInt32(ConfigurationManager.AppSettings["ListFollowers-Big-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Followers"))
                {
                    foreach (var item in header.GetValues("Paging-Followers"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetFollowers(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/useraccount/getrequestfriends")]
        [HttpGet]
        public JsonResult GetRequestFriends(string idUser, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "" };

            if (!string.IsNullOrEmpty(idUser))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["RequestFriend-Big-pageSize"]) :
                                          Convert.ToInt32(ConfigurationManager.AppSettings["RequestFriend-Small-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Friends-Request"))
                {


                    foreach (var item in header.GetValues("Paging-Friends-Request"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetRequestFriends(idUser, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/useraccount/getusersexclude")]
        [HttpPost]
        public JsonResult GetUsersExclude([FromBody]UsersExclude userExclude, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "" };

            if (!string.IsNullOrEmpty(userExclude.IdUser))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["RequestFriend-Big-pageSize"]) :
                                          Convert.ToInt32(ConfigurationManager.AppSettings["RequestFriend-Small-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Users-Exclude"))
                {
                    foreach (var item in header.GetValues("Paging-Users-Exclude"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetUserExclude(userExclude, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="status">1 : exclude suggest</param>
        /// <param name="status">2 : block</param>
        /// <returns></returns>
        [Route("api/useraccount/createusersexclude")]
        [HttpPost]
        public JsonResult CreateUsersExclude([FromBody]UsersExclude usersExclude)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(usersExclude.IdUser) && String.IsNullOrEmpty(usersExclude.IdUserExclude)))
            {
                result = dc.CreateUsersExclude(usersExclude) == true ? new JsonResult { Data = "created exclude" } : new JsonResult { Data = "failed exlude" };
            }

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="status">1 : exclude suggest</param>
        /// <param name="status">2 : block</param>
        /// <returns></returns>
        [Route("api/useraccount/removeusersexclude")]
        [HttpPost]
        public JsonResult RemoveUsersExclude([FromBody]UsersExclude usersExclude)
        {
            var result = new JsonResult { Data = "userId not exist" };

            if (!(String.IsNullOrEmpty(usersExclude.IdUser) && String.IsNullOrEmpty(usersExclude.IdUserExclude)))
            {
                result = dc.RemoveUsersExclude(usersExclude) == true ? new JsonResult { Data = "created exclude" } : new JsonResult { Data = "failed exlude" };
            }

            return result;
        }

        [Route("api/useraccount/getinfouserparallel")]
        [HttpPost]
        public JsonResult GetInfoUserParallel([FromBody]UserParallel user, bool isBig = false)
        {
            var request = Request;
            var header = request.Headers;
            var result = new JsonResult { Data = "" };

            if (!(string.IsNullOrEmpty(user.IdUser) && string.IsNullOrEmpty(user.IdUserParallel)))
            {
                var pageSize = isBig ? Convert.ToInt32(ConfigurationManager.AppSettings["UserParallel-Big-pageSize"]) :
                                       Convert.ToInt32(ConfigurationManager.AppSettings["UserParallel-Small-pageSize"]);

                PagingMetaData pagingData = null;

                if (header.Contains("Paging-Users-Parallel"))
                {
                    foreach (var item in header.GetValues("Paging-Users-Parallel"))
                    {
                        pagingData = JsonConvert.DeserializeObject<PagingMetaData>(item);
                    }
                }

                var data = dc.GetUserParallel(user, PagingModel.AutomaticPaging(pagingData, pageSize));

                result = new JsonResult { Data = data.Item2, ContentType = JsonConvert.SerializeObject(data.Item1) };
            }

            return result;
        }

        [Route("api/useraccount/quantityfriendparallel")]
        [HttpPost]
        public JsonResult QuantityFriendParallel([FromBody]UserParallel users)
        {
            var result = new JsonResult { Data = "enter input data" };

            if (!(String.IsNullOrEmpty(users.IdUser) && String.IsNullOrEmpty(users.IdUserParallel)))
            {
                result = new JsonResult { Data = dc.QuantityFriendsParallel(users) };
            }

            return result;
        }

        [Route("api/useraccount/quantityuserexcluded")]
        [HttpGet]
        public JsonResult QuantityUserExcluded(string idUser)
        {
            var result = new JsonResult { Data = "enter input data" };

            if (!string.IsNullOrEmpty(idUser))
            {
                result = new JsonResult { Data = dc.QuantityUserExcluded(idUser) };
            }

            return result;
        }

        [Route("api/useraccount/quantityfollowers")]
        [HttpGet]
        public JsonResult QuantityFollowers(string idUser)
        {
            var result = new JsonResult { Data = "enter input data" };

            if (!string.IsNullOrEmpty(idUser))
            {
                result = new JsonResult { Data = dc.QuantityFollowers(idUser) };
            }

            return result;
        }
    }
}