using Helper.TempModel;
using Model.Common;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class LikePostContext : DataContextCoreBase<LikePostContext>
    {
        public int Insert(LIKEPOST likePost)
        {
            DbContext.LIKEPOSTs.Add(likePost);
            return DbContext.SaveChanges();
        }

        public int Remove(LIKEPOST likePost)
        {
            var current = DbContext.LIKEPOSTs.FirstOrDefault(n => n.IdPost == likePost.IdPost && n.IdUser == likePost.IdUser);

            DbContext.LIKEPOSTs.Remove(current);
            return DbContext.SaveChanges();
        }

        public bool IsLike(string idPost, string idUser)
        {
            return DbContext.LIKEPOSTs.Any(n => n.IdPost == idPost && n.IdUser == idUser);
        }

        public long GetQuantityOfPost(string idPost)
        {
            return DbContext.LIKEPOSTs.LongCount(n => n.IdPost == idPost);
        }

        public Tuple<PagingMetaData, List<USERINFO>> GetUserLikeOfPost(string idPost, PagingParameterModel paging)
        {
            var listUserLikePost = DbContext.NEWFEEDPOSTs.FirstOrDefault(n => n.IdPost == idPost).LIKEPOSTs.Select(m => m.IdUser).AsQueryable();
            var source = DbContext.USERINFOes.Where(n => listUserLikePost.Contains(n.IdUser))
                .Select(m => new USERINFO
                {
                    IdUser = m.IdUser,
                    IdInfo = m.IdInfo,
                    Avatar = m.Avatar,
                    FirstName = m.FirstName,
                    LastName = m.LastName,

                }).AsQueryable();

            return ApiPaging<USERINFO>.Paging(source, paging);
        }

    }
}