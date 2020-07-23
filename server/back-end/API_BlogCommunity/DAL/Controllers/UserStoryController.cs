using COMMON;
using DAL.Common;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.DataContext;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DAL.Controllers
{
    public class UserStoryController : BaseController<UserRelationship>
    {
        UserStoriesContext dc = UserStoriesContext.Instance;

        public string InsertStory(UserStory data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && data.TypeContent != 0 && !string.IsNullOrEmpty(data.Content))
            {
                var base64Content = JsonConvert.DeserializeObject<List<string>>(data.Content);
                var newContent = UploadFile.UploadFileToDrive(base64Content, data.IdUser, CommonInstants.ParentImage);
                data.Content = JsonConvert.SerializeObject(newContent);

                if (newContent.Any() && newContent.Count() > 0)
                {
                    return dc.InsertStory(new Model.Model_CodeFirst.USERSTORIES
                    {
                        Content = data.Content,
                        CreatedTS = UtcNow.Utc(),
                        IdStory = GUID.UUID(),
                        IdUser = data.IdUser,
                        TypeContent = data.TypeContent
                    });
                }
            }

            return null;
        }

        public int DeleteStory(UserStory data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdStory) && dc.IsHasStoryOfUser(data.IdUser, data.IdStory))
            {
                return dc.DeleteStory(data.IdStory);
            }

            return 0;
        }

        public List<UserInfo> GetInfoUserSeenStory(string idStory)
        {
            if (!string.IsNullOrEmpty(idStory) && dc.IsHasStory(idStory))
            {
                return dc.GetInfoUserSeenStory(idStory).Select(n => new UserInfo
                {
                    Avatar = UploadFile.ConCatImageString(n.Avatar)?.First(),
                    FirstName = n.FirstName,
                    LastName = n.LastName,
                    IdUser = n.IdUser

                }).ToList();

            }

            return null;
        }

        public List<UserStory> GetStoryOfFriends(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser))
            {
                var result = dc.GetStoryOfFriends(idUser);
                return result != null ? result.Select(n => new UserStory()
                {
                    Content = UploadFile.ConCatImageString(n.Content)?.First(),
                    CreatedTS = n.CreatedTS,
                    IdStory = n.IdStory,
                    IdUser = n.IdUser,
                    TypeContent = n.TypeContent,
                    MinuteOfTime = DateTime.UtcNow.Subtract(n.CreatedTS).TotalMinutes,
                    UserInfo = new UserInfo
                    {
                        LastName = n.LastName,
                        FirstName = n.FirstName,
                        Avatar = UploadFile.ConCatImageString(n.Avatar)?.First(),
                    }

                }).ToList() : null;

            }

            return null;
        }

        public long GetQuantityUserSeenStory(string idStory)
        {
            return string.IsNullOrEmpty(idStory) == false ? dc.GetQuantityUserSeenStory(idStory) : 0;
        }

        public int InsertNewSeen(StorySeen data)
        {
            if (!string.IsNullOrEmpty(data.IdStory) && !string.IsNullOrEmpty(data.IdUser) && dc.IsHasStory(data.IdStory))
            {
                return dc.InsertNewSeen(new Model.Model_CodeFirst.STORYSEEN
                {
                    IdStory = data.IdStory,
                    IdUser = data.IdUser
                });
            }

            return 0;
        }

        public List<UserStory> GetListStoryOfUser(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser))
            {
                var data = dc.GetListStoryOfUser(idUser);

                if (data.Count() > 0)
                {
                    List<UserStory> result = new List<UserStory>();

                    foreach (var item in data)
                    {
                        result.Add(new UserStory
                        {
                            Content = UploadFile.ConCatImageString(item.Content)?.First(),
                            CreatedTS = item.CreatedTS,
                            IdStory = item.IdStory,
                            IdUser = item.IdUser,
                            TypeContent = item.TypeContent,
                            MinuteOfTime = DateTime.UtcNow.Subtract(item.CreatedTS).TotalMinutes,
                        });
                    }

                    return result;
                }
            }

            return null;
        }
    }
}