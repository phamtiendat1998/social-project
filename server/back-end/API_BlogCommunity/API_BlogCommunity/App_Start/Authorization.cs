using CACHE_SYSTEM.MemoryCaching;
using DAL.Controllers;
using Helper.Helper.Common;
using Helper.TempModel;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace API_BlogCommunity.App_Start
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class Authorization : AuthorizationFilterAttribute
    {
        UserTokenController dc = new UserTokenController();
        bool Active = true;

        public Authorization()
        { }

        public Authorization(bool active)
        {
            Active = active;
            //TODO: Check active in OnAuthorizeUser()
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            //var header = actionContext.Request.Headers;

            //if (header.Contains("headers-token-social"))
            //{
            //    var token = DecodeToken(header.GetValues("headers-token-social").ToString());

            //    if (token != null && IsAvaiableToken(token.IdUser, token.ContentToken))
            //    {
            //        base.OnAuthorization(actionContext);
            //        // return;
            //    }
            //}
            //else if (actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any())
            //{
            //    base.OnAuthorization(actionContext);
            //}
            //else
            //{
            //    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            //}

            base.OnAuthorization(actionContext);
        }

        protected virtual bool OnAuthorizeUser(string username, string password, HttpActionContext actionContext)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return false;

            return true;
        }

        private UserToken DecodeToken(string tokenHeader)
        {
            UserToken result = null;

            if (!String.IsNullOrEmpty(tokenHeader))
            {
                var dataString = GenerateTokenKey.Decode(tokenHeader, ConfigurationManager.AppSettings["tokenKey"]);
                result = JsonConvert.DeserializeObject<UserToken>(dataString);
            }

            return result;
        }

        public void SaveTokenInCache(string idUser, string Token)
        {
            Caching_Memory.Add(Token, idUser, DateTimeOffset.UtcNow.AddMonths(1));
        }

        private bool IsAvaiableToken(string idUser, string token)
        {
            bool isAvaiable = false;

            if (!(string.IsNullOrEmpty(idUser) && string.IsNullOrEmpty(token))
                && (Caching_Memory.GetValue(token).ToString() == idUser || dc.HasToken(idUser, token)))
            {
                SaveTokenInCache(idUser, token);
                isAvaiable = true;
            }

            return isAvaiable;
        }

    }
}