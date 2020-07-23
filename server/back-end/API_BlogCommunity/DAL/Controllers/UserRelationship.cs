using Model.DataContext;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace DAL.Controllers
{
    public class UserRelationship : BaseController<UserRelationship>
    {
        private UserRelationshipContext dc = new UserRelationshipContext();
        private UserContext userdc = new UserContext();

        public Helper.TempModel.UserRelationship Get(string idInfo)
        {
            // if(!string.IsNullOrEmpty(idInfo) && )
            var relationship = dc.Get(idInfo);
            return new Helper.TempModel.UserRelationship()
            {
                CreatedTs = relationship.CreatedDate,
                IdRelationship = relationship.IdUserRelationship,
                IdInfo = relationship.IdInfo,
                Status = relationship.StatusRelationship,
            };
        }

        public bool Update(Helper.TempModel.UserRelationship relationship)
        {
            bool isUpdate = false;

            if (!string.IsNullOrEmpty(relationship.IdInfo) && userdc.IsExistIDInfo(relationship.IdInfo))
            {
                var data = new USERRELATIONSHIP()
                {
                    IdInfo = relationship.IdInfo,
                    IdUserRelationship = relationship.IdInfo,
                    StatusRelationship = relationship.Status
                };

                isUpdate = dc.Update(data) > 0 ? true : false;
            }

            return isUpdate;
        }

        public bool Delete(string idRelation)
        {
            bool isRemove = false;

            if (!string.IsNullOrEmpty(idRelation) && dc.IsExistIDRelation(idRelation))
            {
                isRemove = dc.Delete(idRelation) > 0 ? true : false;
            }

            return isRemove;
        }
    }
}