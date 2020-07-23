using COMMON;
using DAL.Common;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;

namespace DAL.Controllers
{
    public class NewsFeedController : BaseController<NewsFeedController>
    {
        private UserContext userdc = new UserContext();
        private NewFeedPostContext dc = new NewFeedPostContext();
        private LikePostContext likedc = new LikePostContext();

        public bool PostNews(NewsFeed news)
        {
            bool isPost = false;

            if (!string.IsNullOrEmpty(news.IdUser) && userdc.IsExistUserId(news.IdUser))
            {
                List<ImagePost> listImgPost = new List<ImagePost>();
                List<string> ImagesOfDrive = null;
                if (!string.IsNullOrEmpty(news.Images))
                {
                    var listBase64Image = JsonConvert.DeserializeObject<List<string>>(news.Images);

                    ImagesOfDrive = new List<string>(UploadFile.UploadFileToDrive(listBase64Image, news.IdUser, CommonInstants.FolderInDrive));
                }

                var newsFeed = new NEWFEEDPOST()
                {
                    IdPost = news.IdPost,
                    IdUser = news.IdUser,
                    Content = news.Content,
                    Emotion = news.Emotion,
                    CreatedTS = news.CreatedTS,
                    Location = news.Location,
                    IdCategory = news.IdCategory,
                    TimeStampSort = news.TimeStampSort,
                    Status = news.StatusSocial,
                    SharePost = news.SharePost
                };

                if (ImagesOfDrive != null)
                {
                    foreach (var item in ImagesOfDrive)
                    {
                        listImgPost.Add(new ImagePost()
                        {
                            IdPost = newsFeed.IdPost,
                            ImagesUrl = item
                        });
                    }
                }

                isPost = dc.Create(newsFeed) > 0 ? true : false;

                if (isPost)
                {
                    var isUploadImag = dc.InsertImagePost(listImgPost.Select(n => new IMAGEPOST()
                    {
                        IdImage = n.IdImage,
                        IdPost = n.IdPost,
                        ImagesUrl = n.ImagesUrl
                    }).ToList());
                }
            }

            return isPost;
        }

        public bool UpdateNews(NewsFeed news)
        {
            bool isUpdate = false;
            List<string> listImageNew = null;
            List<ImagePost> listImage = null;

            if (news != null)
            {
                if (!string.IsNullOrEmpty(news.UpdateImages))
                {
                    listImage = new List<ImagePost>();

                    listImageNew = new List<string>(JsonConvert.DeserializeObject<List<string>>(news.UpdateImages))
                        .Select(n => n.Split(new string[] { "id=" }, StringSplitOptions.None)?[1]).ToList();

                    var listImgDB = dc.GetImageUrl(news.IdPost);
                    var countImageChanged = GetImageNotChange(listImgDB, listImageNew);

                    Thread thread = new Thread(() => MediaContext.Instance.DeleteImageDrive(countImageChanged));
                    thread.Start();

                    var listNewImg = listImageNew.Concat(JsonConvert.DeserializeObject<List<string>>(news.UpdateImages)).ToList();
                    listImageNew = UploadFile.UploadFileToDrive(listNewImg, news.IdUser, CommonInstants.ParentComment);
                }

                var updateNewsFeed = new NEWFEEDPOST()
                {
                    IdPost = news.IdPost,
                    Content = news.Content,
                    IdUser = news.IdUser,
                    Images = news.Images,
                    UploadedTS = news.CreatedTS,
                    IdCategory = news.IdCategory,
                    Emotion = news.Emotion,
                    Location = news.Location,
                    Status = news.StatusSocial
                };

                if (listImageNew != null && listImageNew.Any() && listImageNew.Count() > 0)
                {
                    foreach (var item in listImageNew)
                    {
                        listImage.Add(new ImagePost()
                        {
                            IdPost = updateNewsFeed.IdPost,
                            ImagesUrl = item
                        });
                    }

                    var isUploadImag = dc.UpdateImagePost(listImage.Select(n => new IMAGEPOST()
                    {
                        IdImage = n.IdImage,
                        IdPost = n.IdPost,
                        ImagesUrl = n.ImagesUrl
                    }).ToList());
                }

                isUpdate = dc.Update(updateNewsFeed) > 0 ? true : false;
            }

            return isUpdate;
        }

        public Tuple<PagingMetaData, List<NewsFeed>> GetNewsFeed(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<NewsFeed>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.Get(idUser, pagingparametermodel);

                var newsFeed = data?.Item2?.Select(n => new NewsFeed
                {
                    Category = new Category { IdCategory = n.IdCategory, NameCategory = n.CATEGORY.NameCategory },
                    IdPost = n.IdPost,
                    QuantityLike = n.LIKEPOSTs.LongCount(),
                    QuantityComment = n.COMMENTs.LongCount(),
                    IdUser = n.IdUser,
                    Emotion = n.Emotion,
                    Location = n.Location,
                    Content = n.Content,
                    CreatedTS = n.CreatedTS,
                    UploadedTS = n.UploadedTS,
                    Liked = n.LIKEPOSTs.Any(m => m.IdUser == idUser),
                    ListImages = UploadFile.ConCatLinkDirve(n.IMAGEPOSTs.Select(m => m.ImagesUrl).ToList()),
                    StatusSocial = n.Status,
                    UserInfo = new UserInfo
                    {
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").FirstName,
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar)?.First(),
                    }

                }).ToList();

                result = new Tuple<PagingMetaData, List<NewsFeed>>(data.Item1, newsFeed);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<NewsFeed>> GetAllNewFeedsOfUser(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<NewsFeed>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetAllPostOfUser(idUser, pagingparametermodel);

                var newsFeed = data?.Item2?.Select(n => new NewsFeed
                {
                    Category = new Category { IdCategory = n.IdCategory, NameCategory = n.CATEGORY.NameCategory },
                    IdPost = n.IdPost,
                    QuantityLike = n.LIKEPOSTs.LongCount(),
                    QuantityComment = n.COMMENTs.LongCount(),
                    IdUser = n.IdUser,
                    Emotion = n.Emotion,
                    Location = n.Location,
                    Content = n.Content,
                    CreatedTS = n.CreatedTS,
                    UploadedTS = n.UploadedTS,
                    Liked = n.LIKEPOSTs.Any(m => m.IdUser == idUser),
                    ListImages = UploadFile.ConCatLinkDirve(n.IMAGEPOSTs.Select(m => m.ImagesUrl).ToList()),
                    StatusSocial = n.Status,
                    UserInfo = new UserInfo
                    {
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").FirstName,
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar)?.First(),
                    }

                }).ToList();

                result = new Tuple<PagingMetaData, List<NewsFeed>>(data.Item1, newsFeed);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<NewsFeed>> GetNewsFeedByUserID(string idUser, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<NewsFeed>> result = null;

            if (!String.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var data = dc.GetByUserID(idUser, pagingparametermodel);

                var newsFeed = data?.Item2?.Select(n => new NewsFeed
                {
                    Category = new Category { IdCategory = n.IdCategory, NameCategory = n.CATEGORY.NameCategory },
                    IdPost = n.IdPost,
                    QuantityLike = n.LIKEPOSTs.LongCount(),
                    QuantityComment = n.COMMENTs.LongCount(),
                    IdUser = n.IdUser,
                    Emotion = n.Emotion,
                    ListImages = UploadFile.ConCatLinkDirve(n.IMAGEPOSTs.Select(m => m.ImagesUrl).ToList()),
                    Location = n.Location,
                    Content = n.Content,
                    CreatedTS = n.CreatedTS,
                    UploadedTS = n.UploadedTS,
                    Liked = n.LIKEPOSTs.Any(m => m.IdUser == idUser),
                    UserInfo = new UserInfo
                    {
                        LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").LastName,
                        FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").FirstName,
                        Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar)?.First(),
                    }

                }).ToList();

                result = new Tuple<PagingMetaData, List<NewsFeed>>(data.Item1, newsFeed);
            }

            return result;
        }

        public string CreateComment(Comment comment)
        {
            string idComment = string.Empty;

            if (!string.IsNullOrEmpty(comment.IdPost) && !string.IsNullOrEmpty(comment.IdUser) && !string.IsNullOrEmpty(comment.Content)
                && userdc.IsExistUserId(comment.IdUser) && dc.HasNewsFeed(comment.IdPost))
            {
                var data = new COMMENT()
                {
                    IdPost = comment.IdPost,
                    IdUser = comment.IdUser,
                    Content = comment.Content,
                    Images = comment.Image,
                    CreatedTS = comment.CreatedTS,
                    IdComment = comment.IdComment,
                };

                idComment = dc.CreateComment(data);
            }

            return idComment;
        }

        public bool UpdateComment(Comment comment)
        {
            bool isUpdated = false;

            if (userdc.IsExistUserId(comment.IdUser))
            {
                if (!string.IsNullOrEmpty(comment.Base64String))
                {
                    var currentImg = comment.Images.Select(n => n.Split(new string[] { CommonInstants.PrefixGG }, StringSplitOptions.None)?[1]).ToList();

                    var listImgDB = JsonConvert.DeserializeObject<List<string>>(dc.ListImageReplyComment(comment.IdComment));
                    Thread thread = new Thread(() => MediaContext.Instance.DeleteImageDrive(GetImageNotChange(listImgDB, currentImg)));
                    thread.Start();

                    var listNewImg = comment.Images.Concat(JsonConvert.DeserializeObject<List<string>>(comment.Base64String)).ToList();
                    comment.Image = JsonConvert.SerializeObject(UploadFile.UploadFileToDrive(listNewImg, comment.IdUser, CommonInstants.ParentComment));
                }

                var data = new COMMENT()
                {
                    IdPost = comment.IdPost,
                    IdUser = comment.IdUser,
                    Content = comment.Content,
                    CreatedTS = comment.CreatedTS,
                    IdComment = comment.IdComment,
                    Images = comment.Image
                };

                isUpdated = dc.UpdateComment(data) > 0 ? true : false;
            }

            return isUpdated;
        }

        public bool RemoveComment(Comment comment)
        {
            bool isRemove = false;

            if (!string.IsNullOrEmpty(comment.IdUser) && userdc.IsExistUserId(comment.IdUser) && dc.IsCommentOfUser(comment.IdUser, comment.IdComment))
            {
                isRemove = dc.DeleteComment(comment.IdComment) > 0 ? true : false;
            }

            return isRemove;
        }

        public bool RemoveCommentByUserOfPost(Comment comment)
        {
            bool isRemove = false;

            if (!string.IsNullOrEmpty(comment.IdPost) && !string.IsNullOrEmpty(comment.IdUser) && !string.IsNullOrEmpty(comment.Content)
                && userdc.IsExistUserId(comment.IdUser) && dc.IsCommentId(comment.IdComment))
            {
                isRemove = dc.DeleteComment(comment.IdComment) > 0 ? true : false;
            }

            return isRemove;
        }

        public Tuple<PagingMetaData, List<Comment>> GetComments(string idPost, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<Comment>> result = null;

            if (!string.IsNullOrEmpty(idPost) && dc.HasNewsFeed(idPost))
            {
                var data = dc.GetComments(idPost, pagingparametermodel);
                var comments = data?.Item2?
                    .Select(n => new Comment
                    {
                        IdPost = n.IdPost,
                        Content = n.Content,
                        Images = UploadFile.ConCatImageString(n.Images),
                        IdComment = n.IdComment,
                        IdUser = n.IdUser,
                        CreatedTS = n.CreatedTS,
                        ReplyComments = n.REPLYCOMMENTs.LongCount(),
                        UserInfo = new UserInfo
                        {
                            LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").LastName,
                            FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").FirstName,
                            Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar)?.First(),
                        }

                    }).ToList();

                result = new Tuple<PagingMetaData, List<Comment>>(data?.Item1, comments);
            }

            return result;
        }

        public Tuple<PagingMetaData, List<ReplyComment>> GetReplyComments(string idComment, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<ReplyComment>> result = null;

            if (!string.IsNullOrEmpty(idComment) && dc.HasComment(idComment))
            {
                var data = dc.GetReplyComments(idComment, pagingparametermodel);
                var comments = data?.Item2?
                    .Select(n => new ReplyComment
                    {
                        IdReply = n.IdReply,
                        Content = n.Content,
                        Images = UploadFile.ConCatImageString(n.Images),
                        IdComment = n.IdComment,
                        IdUser = n.IdUser,
                        CreatedTS = n.CreatedTS,
                        UserInfo = new UserInfo
                        {
                            LastName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").LastName,
                            FirstName = n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "").FirstName,
                            Avatar = UploadFile.ConCatImageString(n.USERACCOUNT.USERINFOes.FirstOrDefault(m => m.IdUser != "")?.Avatar)?.First(),
                        }

                    }).ToList();

                result = new Tuple<PagingMetaData, List<ReplyComment>>(data?.Item1, comments);
            }

            return result;
        }

        public bool CreateLike(LikePost likePost)
        {
            var isCreate = false;

            if (!(string.IsNullOrEmpty(likePost.IdPost) && string.IsNullOrEmpty(likePost.IdUser)
                && likedc.IsLike(likePost.IdPost, likePost.IdUser)))
            {
                var data = new LIKEPOST()
                {
                    IdPost = likePost.IdPost,
                    IdUser = likePost.IdUser,
                    Status = likePost.Status
                };

                isCreate = likedc.Insert(data) > 0 ? true : false;
            }

            return isCreate;
        }

        public bool RemoveLike(LikePost likePost)
        {
            var isRemove = false;

            if (!(string.IsNullOrEmpty(likePost.IdPost) && string.IsNullOrEmpty(likePost.IdUser))
                && likedc.IsLike(likePost.IdPost, likePost.IdUser))
            {
                var data = new LIKEPOST()
                {
                    IdPost = likePost.IdPost,
                    IdUser = likePost.IdUser
                };

                isRemove = likedc.Remove(data) > 0 ? true : false;
            }

            return isRemove;
        }

        public Tuple<PagingMetaData, List<UserInfo>> GetUserLikeOfPost(string idPost, PagingParameterModel pagingparametermodel)
        {
            Tuple<PagingMetaData, List<UserInfo>> result = null;

            if (!string.IsNullOrEmpty(idPost) && dc.HasNewsFeed(idPost))
            {
                var data = likedc.GetUserLikeOfPost(idPost, pagingparametermodel);

                var listUserInfo = data.Item2.Select(n => new UserInfo
                {
                    IdInfo = n.IdInfo,
                    IdUser = n.IdUser,
                    Avatar = UploadFile.ConCatImageString(n.Avatar)?.First(),
                    LastName = n.LastName,
                    FirstName = n.FirstName

                }).ToList();

                result = new Tuple<PagingMetaData, List<UserInfo>>(data.Item1, listUserInfo);
            }

            return result;
        }

        public long QuantityLike(string idPost)
        {
            return likedc.GetQuantityOfPost(idPost);
        }

        public long QuantityComment(string idPost)
        {
            return dc.QuantityComment(idPost);
        }

        public long QuantityPostNewsByUserID(string idUser)
        {
            long result = 0;

            if (!string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                result = dc.QuantityNewsFeedByUserID(idUser);
            }

            return result;
        }

        public string CreateReplyComment(ReplyComment reply)
        {
            string idReply = string.Empty;

            if (!(string.IsNullOrEmpty(reply.IdComment) && string.IsNullOrEmpty(reply.IdUser) && string.IsNullOrEmpty(reply.Content))
                && userdc.GetAccountByID(reply.IdUser) && dc.HasComment(reply.IdComment))
            {
                var data = new REPLYCOMMENT
                {
                    IdComment = reply.IdComment,
                    IdUser = reply.IdUser,
                    CreatedTS = reply.CreatedTS,
                    IdReply = reply.IdReply,
                    Content = reply.Content,
                    Images = reply.Image
                };

                idReply = dc.InsertReplyComment(data);
            }

            return idReply;
        }

        private List<string> GetImageNotChange(List<string> current, List<string> old)
        {
            return current.Except(old).ToList();
        }

        public bool UpdateReplyComment(ReplyComment reply)
        {
            bool isUpdate = false;

            if (!(string.IsNullOrEmpty(reply.IdReply) && string.IsNullOrEmpty(reply.IdUser) && string.IsNullOrEmpty(reply.Content))
                && userdc.GetAccountByID(reply.IdUser) && dc.HasCommentReply(reply.IdReply) && dc.IsCommentReplyOfUser(reply.IdUser, reply.IdReply))
            {
                if (!string.IsNullOrEmpty(reply.Base64String))
                {
                    var currentImg = reply.Images.Select(n => n.Split(new string[] { CommonInstants.PrefixGG }, StringSplitOptions.None)?[1]).ToList();

                    var listImgDB = JsonConvert.DeserializeObject<List<string>>(dc.ListImageReplyComment(reply.IdReply));
                    Thread thread = new Thread(() => MediaContext.Instance.DeleteImageDrive(GetImageNotChange(listImgDB, reply.Images)));
                    thread.Start();

                    var listNewImg = reply.Images.Concat(JsonConvert.DeserializeObject<List<string>>(reply.Base64String)).ToList();
                    reply.Image = JsonConvert.SerializeObject(UploadFile.UploadFileToDrive(listNewImg, reply.IdUser, CommonInstants.ParentComment));
                }

                var data = new REPLYCOMMENT
                {
                    IdUser = reply.IdUser,
                    UpdatedTS = reply.UpdatedTS,
                    IdReply = reply.IdReply,
                    Content = reply.Content,
                    Images = reply.Image
                };

                isUpdate = dc.UpdateReplyComment(data) > 0 ? true : false;
            }

            return isUpdate;
        }

        public bool RemoveReplyComment(ReplyComment reply)
        {
            bool isCreate = false;

            if (!(string.IsNullOrEmpty(reply.IdReply) && string.IsNullOrEmpty(reply.IdUser)) && userdc.GetAccountByID(reply.IdUser)
                && dc.HasCommentReply(reply.IdReply) && dc.IsCommentReplyOfUser(reply.IdUser, reply.IdReply))
            {
                isCreate = dc.RemoveReplyComment(reply.IdReply) > 0 ? true : false;
            }

            return isCreate;
        }

        public List<ImagePost> ListImageOfPost(ImagePostParams data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && userdc.IsExistUserId(data.IdUser))
            {
                return dc.GetImageOfPost(data.IdUser, data.Status).Select(n => new ImagePost
                {
                    IdPost = n.IdPost,
                    ImagesUrl = UploadFile.ConCatImageString(n.ImagesUrl)?.First(),
                    Post = new NewsFeed
                    {
                        Content = n.NEWFEEDPOST.Content,
                        QuantityComment = n.NEWFEEDPOST.COMMENTs.LongCount(),
                        QuantityLike = n.NEWFEEDPOST.LIKEPOSTs.LongCount(),
                        CreatedTS = n.NEWFEEDPOST.CreatedTS,
                    }
                }).ToList();
            }

            return null;
        }
    }
}