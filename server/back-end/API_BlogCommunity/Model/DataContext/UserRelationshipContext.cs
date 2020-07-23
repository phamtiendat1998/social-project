using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserRelationshipContext : DataContextCoreBase<UserRelationshipContext>
    {
        public IEnumerable<USERRELATIONSHIP> Get()
        {
            return DbContext.USERRELATIONSHIPs.ToList();
        }

        public bool IsExistIDRelation(string idRelation)
        {
            return DbContext.USERRELATIONSHIPs.Any(n => n.IdUserRelationship == idRelation);
        }

        public USERRELATIONSHIP GetRelationByIdUser(string idUser)
        {
            return DbContext.USERRELATIONSHIPs.FirstOrDefault(n => n.IdUserRelationship == idUser);
        }

        public USERRELATIONSHIP Get(string idInfo)
        {
            return DbContext.USERRELATIONSHIPs.FirstOrDefault(n => n.IdInfo == idInfo);
        }

        public void Create(USERRELATIONSHIP userrelationship)
        {
            DbContext.USERRELATIONSHIPs.Add(userrelationship);
            DbContext.SaveChanges();
        }

        public int Update(USERRELATIONSHIP relationship)
        {
            var current = !string.IsNullOrEmpty(relationship.IdUserRelationship) ?
               DbContext.USERRELATIONSHIPs.FirstOrDefault(n => n.IdUserRelationship == relationship.IdUserRelationship) :
               DbContext.USERRELATIONSHIPs.FirstOrDefault(n => n.IdInfo == relationship.IdInfo);

            current.StatusRelationship = relationship.StatusRelationship;

            DbContext.USERRELATIONSHIPs.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int Delete(string idRelationship)
        {
            var current = DbContext.USERRELATIONSHIPs.Find(idRelationship);
            DbContext.USERRELATIONSHIPs.Remove(current);
            return DbContext.SaveChanges();
        }
    }
}