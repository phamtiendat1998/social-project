using Helper.Enum;
using Helper.TempModel;
using Model.Common;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Model.DataContext
{
    public class NewFeedPostContext : DataContextCoreBase<NewFeedPostContext>
    {
        public long QuantityNewsFeedByUserID(string idUser)
        {
            return DbContext.NEWFEEDPOSTs.LongCount(n => n.IdUser == idUser);
        }

        public IQueryable<string> GetIdListFriends(string idUser)
        {
            return DbContext.FRIENDS.Where(m => m.IdUser == idUser).Select(m => m.IdUserFriend).AsQueryable();
        }

        public IQueryable<string> GetIdListFollowers(string idUser)
        {
            return DbContext.FOLLOWS.Where(m => m.IdUser == idUser).Select(m => m.IdUserRequest).AsQueryable();
        }

        public Tuple<PagingMetaData, List<NEWFEEDPOST>> Get(string idUser, PagingParameterModel paging)
        {
            var listUserFollows = DbContext.FOLLOWS.Where(m => m.IdUser == idUser).Select(m => m.IdUserRequest).AsQueryable();
            var listUserFriends = DbContext.FRIENDS.Where(m => m.IdUser == idUser).Select(m => m.IdUserFriend).AsQueryable();

            var source = DbContext.NEWFEEDPOSTs
                .Where(n => (listUserFollows.Concat(listUserFriends).Contains(n.IdUser) || n.IdUser == idUser) && n.Status != null && n.Status != (byte)StatusSocial.Private)
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Include(n => n.CATEGORY)
                .Include(n => n.LIKEPOSTs)
                .Include(n => n.COMMENTs)
                .Include(n => n.IMAGEPOSTs)
                .OrderByDescending(n => n.TimeStampSort)
                .AsQueryable();

            return ApiPaging<NEWFEEDPOST>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<NEWFEEDPOST>> GetByUserID(string idUser, PagingParameterModel paging, string idUserFriend = null)
        {
            byte statusSocial = (byte)StatusSocial.Public;
            if (!string.IsNullOrEmpty(idUserFriend))
            {
                var typeUser = AccountContext.Instance.GetTypeUser(idUser, idUserFriend);
                switch (typeUser)
                {
                    case TypeUser.Friend:
                        statusSocial = (byte)StatusSocial.ForFriends;
                        break;

                    case TypeUser.Follower:
                        statusSocial = (byte)StatusSocial.ForFollower;
                        break;

                    case TypeUser.Anonymous:
                        statusSocial = (byte)StatusSocial.ForAnonymous;
                        break;

                    case TypeUser.Exclude:
                        statusSocial = (byte)StatusSocial.ForExclude;
                        break;
                }
            }

            var source = DbContext.NEWFEEDPOSTs.Where(n => n.IdUser == idUser && n.Status != null && n.Status == statusSocial)
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Include(n => n.CATEGORY)
                .Include(n => n.LIKEPOSTs)
                .OrderByDescending(n => n.CreatedTS)
                .AsQueryable();

            return ApiPaging<NEWFEEDPOST>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<COMMENT>> GetComments(string idPost, PagingParameterModel paging)
        {
            var source = DbContext.COMMENTs.Where(n => n.IdPost == idPost)
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Include(n => n.REPLYCOMMENTs)
                .OrderBy(n => n.CreatedTS)
                .AsQueryable();

            return ApiPaging<COMMENT>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<REPLYCOMMENT>> GetReplyComments(string idComment, PagingParameterModel paging)
        {
            var source = DbContext.REPLYCOMMENTs.Where(n => n.IdComment == idComment)
                .Include(n => n.USERACCOUNT.USERINFOes)
                .OrderBy(n => n.CreatedTS)
                .AsQueryable();

            return ApiPaging<REPLYCOMMENT>.Paging(source, paging);
        }

        public Tuple<PagingMetaData, List<NEWFEEDPOST>> GetAllPostOfUser(string idUser, PagingParameterModel paging)
        {
            var source = DbContext.NEWFEEDPOSTs
                .Where(n => n.IdUser == idUser)
                .Include(n => n.USERACCOUNT.USERINFOes)
                .Include(n => n.CATEGORY)
                .Include(n => n.LIKEPOSTs)
                .Include(n => n.COMMENTs)
                .Include(n => n.IMAGEPOSTs)
                .OrderByDescending(n => n.TimeStampSort)
                .AsQueryable();

            return ApiPaging<NEWFEEDPOST>.Paging(source, paging);
        }

        public NEWFEEDPOST Detail(string idNewFeed)
        {
            return DbContext.NEWFEEDPOSTs.FirstOrDefault(n => n.IdPost == idNewFeed);
        }

        public bool HasNewsFeed(string idNews)
        {
            return DbContext.NEWFEEDPOSTs.Any(n => n.IdPost == idNews);
        }

        public bool IsCommentOfUser(string idUser, string idComment)
        {
            return DbContext.COMMENTs.Any(n => n.IdUser == idUser && n.IdComment == idComment);
        }

        public bool IsCommentId(string idComment)
        {
            return DbContext.COMMENTs.Any(n => n.IdComment == idComment);
        }

        public int Create(NEWFEEDPOST post)
        {
            DbContext.NEWFEEDPOSTs.Add(post);
            return DbContext.SaveChanges();
        }

        public int Update(NEWFEEDPOST newFeed)
        {
            var currentNews = DbContext.NEWFEEDPOSTs.Find(newFeed.IdPost);
            currentNews.Images = !string.IsNullOrEmpty(newFeed.Images) ? newFeed.Images : currentNews.Images;
            currentNews.Content = !string.IsNullOrEmpty(newFeed.Content) ? newFeed.Content : currentNews.Content;
            currentNews.IdCategory = newFeed.IdCategory > 0 ? newFeed.IdCategory : currentNews.IdCategory;
            currentNews.TimeStampSort = newFeed.TimeStampSort;
            currentNews.UploadedTS = newFeed.UploadedTS;
            currentNews.Emotion = newFeed.Emotion;
            currentNews.Status = newFeed.Status;
            DbContext.NEWFEEDPOSTs.Add(currentNews);
            DbContext.Entry(currentNews).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int Delete(NEWFEEDPOST newFeed)
        {
            DbContext.NEWFEEDPOSTs.Remove(newFeed);
            return DbContext.SaveChanges();
        }

        public List<string> GetImage(string idPost)
        {
            var stringUrl = DbContext.NEWFEEDPOSTs.FirstOrDefault(n => n.IdPost == idPost);
            return JsonConvert.DeserializeObject<List<string>>(stringUrl.Images);
        }

        public string GetStringUrlImage(string idPost)
        {
            return DbContext.NEWFEEDPOSTs.FirstOrDefault(n => n.IdPost == idPost).Images;
        }

        public string GetStringImageComment(string idComment)
        {
            return DbContext.COMMENTs.FirstOrDefault(n => n.IdComment == idComment).Images;
        }

        public string CreateComment(COMMENT comment)
        {
            string idComment = string.Empty;
            DbContext.COMMENTs.Add(comment);
            return DbContext.SaveChanges() > 0 ? idComment = comment.IdComment : idComment;
        }

        public bool HasComment(string idComment)
        {
            return DbContext.COMMENTs.Any(n => n.IdComment == idComment);
        }

        public bool HasCommentReply(string idCommentReply)
        {
            return DbContext.REPLYCOMMENTs.Any(n => n.IdReply == idCommentReply);
        }

        public string ListImageReplyComment(string idReplyComment)
        {
            return DbContext.REPLYCOMMENTs.Find(idReplyComment).Images;
        }

        public bool IsCommentReplyOfUser(string idUser, string idCommentReply)
        {
            return DbContext.REPLYCOMMENTs.Any(n => n.IdReply == idCommentReply && n.IdUser == idUser);
        }

        public int UpdateComment(COMMENT comment)
        {
            var current = DbContext.COMMENTs.Find(comment.IdComment);

            current.Content = comment.Content;
            current.UpdatedTS = comment.UpdatedTS;

            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int DeleteComment(string idComment)
        {
            var current = DbContext.COMMENTs.Find(idComment);

            DbContext.COMMENTs.Remove(current);
            return DbContext.SaveChanges();
        }

        public long QuantityComment(string idPost)
        {
            return DbContext.COMMENTs.LongCount(n => n.IdPost == idPost);
        }

        public bool IsReply(string idComment, string idReply)
        {
            return DbContext.REPLYCOMMENTs.Any(n => n.IdComment == idComment && n.IdReply == idReply);
        }

        public string InsertReplyComment(REPLYCOMMENT reply)
        {
            string idReply;
            DbContext.REPLYCOMMENTs.Add(reply);
            return DbContext.SaveChanges() > 0 ? idReply = reply.IdReply : idReply = "";
        }

        public int UpdateReplyComment(REPLYCOMMENT reply)
        {
            var current = DbContext.REPLYCOMMENTs.Find(reply.IdReply);
            current.Content = reply.Content;
            current.UpdatedTS = reply.UpdatedTS;
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int RemoveReplyComment(string idReply)
        {
            var current = DbContext.REPLYCOMMENTs.Find(idReply);
            DbContext.REPLYCOMMENTs.Remove(current);
            return DbContext.SaveChanges();
        }

        public int InsertImagePost(List<IMAGEPOST> data)
        {
            DbContext.IMAGEPOSTs.AddRange(data);
            return DbContext.SaveChanges();
        }

        public int UpdateImagePost(List<IMAGEPOST> data)
        {
            foreach (var item in data)
            {
                var current = DbContext.IMAGEPOSTs.Find(data.Select(n => n.IdPost));
                current.ImagesUrl = item.ImagesUrl;

                DbContext.IMAGEPOSTs.Add(current);
                DbContext.Entry(current).State = EntityState.Modified;
            }

            return DbContext.SaveChanges();
        }

        public List<string> GetImageUrl(string idPost)
        {
            return DbContext.IMAGEPOSTs.Where(n => n.IdPost == idPost).Select(n => n.ImagesUrl).ToList();
        }

        public List<IMAGEPOST> GetImageOfPost(string idUser, byte status)
        {
            return DbContext.IMAGEPOSTs.SqlQuery($"EXEC List_Image_In_Post @IdUserParams = N'{idUser}', @StatusParams = {status}").ToList();
        }

        public long QuantityImagePost(string idUser)
        {
            return 0;
        }
    }
}