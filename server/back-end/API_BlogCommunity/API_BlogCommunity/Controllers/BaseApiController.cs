using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API_BlogCommunity.Controllers
{
    [App_Start.Authorization()]
    [EnableCors("*", "*", "*")]
    public class BaseApiController : ApiController
    {

    }
}
