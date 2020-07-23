using Helper.TempModel;
using Model.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Controllers
{
    public class UserTokenController : BaseController<UserInfoController>
    {
        public List<UserToken> Get(string idUser)
        {
            List<UserToken> result = null;

            if (!String.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser))
            {
                result = UserTokenContext.Instance.GetByIdUser(idUser).Select(n => new UserToken
                {
                    ContentToken = n.ContentToken,
                    CreatedTS = n.CreatedTS,
                    IdToken = n.IdToken,
                    IdUser = n.IdUser

                }).ToList();
            }

            return result;
        }

        public bool HasToken(string idUser, string token)
        {
            if (!(String.IsNullOrEmpty(idUser) && String.IsNullOrEmpty(token)) && UserContext.Instance.IsExistUserId(idUser))
                return UserTokenContext.Instance.HasToken(idUser, token);
            return false;
        }
    }
}