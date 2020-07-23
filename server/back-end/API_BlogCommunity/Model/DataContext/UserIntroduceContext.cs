using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserIntroduceContext : DataContextCoreBase<UserInformationContext>
    {
        public IEnumerable<USERINTRO> Get()
        {
            return DbContext.USERINTROes.ToList();
        }

        public USERINTRO GetIntroByIdUser(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser);
        }

        public USERINTRO Get(string idIntro)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUserIntro == idIntro);
        }

        public int Create(USERINTRO userintro)
        {
            DbContext.USERINTROes.Add(userintro);
            return DbContext.SaveChanges();
        }

        public int Update(USERINTRO Intro)
        {
            var current = !string.IsNullOrEmpty(Intro.IdUser) ?
                DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == Intro.IdUser) :
                DbContext.USERINTROes.FirstOrDefault(n => n.IdUserIntro == Intro.IdUserIntro);

            current.IntroContent = !string.IsNullOrEmpty(Intro.IntroContent) ? Intro.IntroContent : current.IntroContent;
            current.Hobby = !string.IsNullOrEmpty(Intro.Hobby) ? Intro.Hobby : current.Hobby;

            DbContext.USERINTROes.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int Delete(USERINTRO Intro)
        {
            DbContext.USERINTROes.Remove(Intro);
            return DbContext.SaveChanges();
        }

        public int InsertIntroStudy(INTROSTUDY data)
        {
            DbContext.INTROSTUDies.Add(data);
            return DbContext.SaveChanges();
        }

        public int UpdateIntroStudy(INTROSTUDY data)
        {
            var current = DbContext.INTROSTUDies.FirstOrDefault(n => n.IdStudy == data.IdStudy);

            current.Studying = data.Studying;
            current.StudyFrom = data.StudyFrom;
            current.StudyTo = data.StudyTo;

            DbContext.INTROSTUDies.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int DeleteIntroStudy(INTROSTUDY data)
        {
            DbContext.INTROSTUDies.Remove(data);
            return DbContext.SaveChanges();
        }

        public int InsertIntroWorking(INTROWORKING data)
        {
            DbContext.INTROWORKINGs.Add(data);
            return DbContext.SaveChanges();
        }

        public int UpdateIntroWorking(INTROWORKING data)
        {
            var current = DbContext.INTROWORKINGs.FirstOrDefault(n => n.IdWorking == data.IdWorking);

            current.WorkingAt = data.WorkingAt;
            current.WorkFrom = data.WorkFrom;
            current.WorkTo = data.WorkTo;

            DbContext.INTROWORKINGs.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int DeleteIntroWoking(INTROWORKING data)
        {
            DbContext.INTROWORKINGs.Remove(data);
            return DbContext.SaveChanges();
        }

    }
}