using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using Helper.Helper.Common;
using Newtonsoft.Json;

namespace Model.DataContext
{
    public class UserStoriesContext : DataContextCoreBase<UserStoriesContext>
    {
        NewFeedPostContext postdc = new NewFeedPostContext();

        public string InsertStory(USERSTORIES data)
        {
            DbContext.USERSTORIES.Add(data);
            DbContext.SaveChanges();
            return data.IdStory;
        }

        public bool IsHasStory(string idStory)
        {
            return DbContext.USERSTORIES.Any(n => n.IdStory == idStory);
        }

        public bool IsStoryOwn(string idStory, string idUser)
        {
            return DbContext.USERSTORIES.Any(n => n.IdStory == idStory && n.IdUser == idUser);
        }

        public bool IsHasStoryOfUser(string idUser, string idStory)
        {
            return DbContext.USERSTORIES.Any(n => n.IdStory == idStory && n.IdUser == idUser);
        }

        public int DeleteStory(string idStory)
        {
            var current = DbContext.USERSTORIES.Find(idStory);

            if (current != null)
            {
                var storySeen = DbContext.STORYSEEN.Where(n => n.IdStory == idStory).AsQueryable();

                if (storySeen.Count() > 0)
                {
                    DbContext.STORYSEEN.RemoveRange(storySeen);
                }


                Thread threadDelete = new Thread(() => UploadFile.DeleteImageDrive(JsonConvert.DeserializeObject<List<string>>(current.Content)));
                threadDelete.Start();

                DbContext.USERSTORIES.Remove(current);
            }

            return DbContext.SaveChanges();
        }

        public List<USERSTORIES> GetListStoryOfUser(string idUser)
        {
            var dateTimeNow = DateTime.UtcNow;
            return DbContext.USERSTORIES.SqlQuery($"exec Get_Story_Of_User @idUser = '{idUser}'").ToList();
        }

        public int InsertNewSeen(STORYSEEN data)
        {
            if (!DbContext.STORYSEEN.Any(n => n.IdStory == data.IdStory && n.IdUser == data.IdUser) && !IsStoryOwn(data.IdStory, data.IdUser))
            {
                DbContext.STORYSEEN.Add(data);
                return DbContext.SaveChanges();
            }

            return 0;
        }

        public long GetQuantityUserSeenStory(string idStory)
        {
            return DbContext.STORYSEEN.LongCount(n => n.IdStory == idStory);
        }

        public List<USERINFO> GetInfoUserSeenStory(string idStory)
        {
            var listIdUserSeenStory = DbContext.STORYSEEN.Where(n => n.IdStory == idStory).Select(n => n.IdUser).AsQueryable();
            return DbContext.USERINFOes.Where(n => listIdUserSeenStory.Contains(n.IdUser)).ToList();
        }

        public List<WRAPPERSTORIES> GetStoryOfFriends(string idUserParams)
        {
            List<WRAPPERSTORIES> result = null;

            List<WRAPPERSTORIES> IdStoryOfFriends = DbContext.WRAPPERSTORIES
                .SqlQuery($"exec Get_Story_Of_Friends @idUserParams = '{idUserParams}'").OrderBy(n => n.CreatedTS).ToList();

            if (IdStoryOfFriends.Any() && IdStoryOfFriends.Count() > 0)
            {
                result = new List<WRAPPERSTORIES>();

                foreach (var itemStory in IdStoryOfFriends)
                {
                    if (!result.Any(n => n.IdUser == itemStory.IdUser))
                    {
                        result.Add(new WRAPPERSTORIES()
                        {
                            IdUser = itemStory.IdUser,
                            Avatar = itemStory.Avatar,
                            Content = itemStory.Content,
                            FirstName = itemStory.FirstName,
                            LastName = itemStory.LastName,
                            TypeContent = itemStory.TypeContent,
                            CreatedTS = itemStory.CreatedTS,
                            IdStory = itemStory.IdStory,
                            IdInfo = itemStory.IdInfo,
                            Status = itemStory.Status
                        });
                    }
                }

                var tempIDStory = IdStoryOfFriends.Select(n => n.IdStory);

                var storyNotSeen = DbContext.STORYSEEN
                    .Where(n => !tempIDStory.Contains(n.IdStory) && n.IdUser != idUserParams)
                    .Select(m => m.IdStory).ToList();

                var resultIdStory = IdStoryOfFriends.Select(m => m.IdStory).Except(storyNotSeen).ToList();

                return result.Where(n => resultIdStory.Contains(n.IdStory)).ToList();
            }

            return result;
        }
    }
}