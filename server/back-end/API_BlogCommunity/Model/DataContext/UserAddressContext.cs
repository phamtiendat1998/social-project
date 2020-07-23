using Helper.TempModel;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class UserAddressContext : DataContextCoreBase<UserAddressContext>
    {
        public List<USERADDRESS> GetAllAddressOfUser(string idUser)
        {
            return DbContext.USERADDRESSes.Where(n => n.IdUser == idUser).ToList();
        }

        public List<USERADDRESS> GetAllAddressOfUserPublic(string idUser)
        {
            return DbContext.USERADDRESSes.Where(n => n.IdUser == idUser && n.Status == 1).ToList();
        }

        public USERADDRESS Get(string idAddress)
        {
            return DbContext.USERADDRESSes.FirstOrDefault(n => n.IdUserAddress == idAddress);
        }

        public USERADDRESS GetByIdUser(string idUser)
        {
            return DbContext.USERADDRESSes.FirstOrDefault(n => n.IdUser == idUser);
        }

        public string Create(USERADDRESS useraddress)
        {
            DbContext.USERADDRESSes.Add(useraddress);
            return DbContext.SaveChanges() > 0 ? useraddress.IdUserAddress : null;
        }

        public int Update(USERADDRESS address)
        {
            var current = DbContext.USERADDRESSes.Find(address.IdUserAddress);

            if (current != null)
            {
                current.City = address.City;
                current.Country = address.Country;
                current.DetailAddress = address.DetailAddress;
                current.Province = address.Province;
                current.Status = address.Status;
                current.LiveFrom = address.LiveFrom;
                current.LiveTo = address.LiveTo;

                DbContext.USERADDRESSes.Add(current);
                DbContext.Entry(current).State = EntityState.Modified;
                return DbContext.SaveChanges();
            }

            return 0;
        }

        public int Delete(USERADDRESS address)
        {
            var data = DbContext.USERADDRESSes.Find(address.IdUserAddress);

            if (data != null)
            {
                DbContext.USERADDRESSes.Remove(data);
                return DbContext.SaveChanges();
            }

            return 0;
        }

        public string GetIdUserIntroOfIdUser(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser).IdUserIntro;
        }

        public bool IsHasIdIntro(string idUser)
        {
            return DbContext.USERINTROes.Any(n => n.IdUser == idUser);
        }

        public bool IsHasIdWorking(string idWorking)
        {
            return DbContext.INTROWORKINGs.Any(n => n.IdWorking == idWorking);
        }

        public bool IsHasIdStudy(string idStudy)
        {
            return DbContext.INTROSTUDies.Any(n => n.IdStudy == idStudy);
        }

        public bool IsHasIntroStudyOfUser(string idUser, string idIntro, string idStudy)
        {
            return DbContext.USERINTROes.Where(n => n.IdUser == idUser).Any(m => m.INTROSTUDYs.Any(s => s.IdUserIntro == idIntro && s.IdStudy == idStudy));
        }

        public bool IsHasIntroWorkingOfUser(string idUser, string idIntro, string idWorking)
        {
            return DbContext.USERINTROes.Where(n => n.IdUser == idUser).Any(m => m.INTROWORKINGs.Any(s => s.IdUserIntro == idIntro && s.IdWorking == idWorking));
        }

        public List<INTROWORKING> GetIntroWorking(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser)?.INTROWORKINGs.ToList();
        }

        public List<INTROSTUDY> GetIntroStudy(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser)?.INTROSTUDYs.ToList();
        }

        public List<INTROWORKING> GetIntroWorkingPublic(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser)?.INTROWORKINGs.Where(n => n.IDStatusSocial == 1).ToList();
        }

        public List<INTROSTUDY> GetIntroStudyPulic(string idUser)
        {
            return DbContext.USERINTROes.FirstOrDefault(n => n.IdUser == idUser)?.INTROSTUDYs.Where(n => n.IDStatusSocial == 1).ToList();
        }

        public Tuple<string, string> CreateInroWorking(INTROWORKING data)
        {
            Tuple<string, string> result = new Tuple<string, string>(string.Empty, string.Empty);
            DbContext.INTROWORKINGs.Add(data);
            return DbContext.SaveChanges() > 0 ? result = new Tuple<string, string>(data.IdWorking, data.IdUserIntro) : result;
        }

        public Tuple<string, string> CreateInroStudy(INTROSTUDY data)
        {
            Tuple<string, string> result = new Tuple<string, string>(string.Empty, string.Empty);
            DbContext.INTROSTUDies.Add(data);
            return DbContext.SaveChanges() > 0 ? result = new Tuple<string, string>(data.IdStudy, data.IdUserIntro) : result;
        }

        public int UpdateIntroWoking(INTROWORKING data)
        {
            var current = DbContext.INTROWORKINGs.Find(data.IdWorking);
            current.WorkFrom = data.WorkFrom;
            current.WorkingAt = data.WorkingAt;
            current.WorkTo = data.WorkTo;

            DbContext.INTROWORKINGs.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int UpdateIntroStudy(INTROSTUDY data)
        {
            var current = DbContext.INTROSTUDies.Find(data.IdStudy);
            current.StudyFrom = data.StudyFrom;
            current.Studying = data.Studying;
            current.StudyTo = data.StudyTo;

            DbContext.INTROSTUDies.Add(current);
            DbContext.Entry(current).State = EntityState.Modified;
            return DbContext.SaveChanges();
        }

        public int DeleteIntroWorking(string idWorking, string idUser, string idIntro)
        {
            if (IsHasIntroWorkingOfUser(idUser, idIntro, idWorking))
            {
                var current = DbContext.INTROWORKINGs.Find(idWorking);
                DbContext.INTROWORKINGs.Remove(current);
                return DbContext.SaveChanges();
            }

            return 0;
        }

        public int DeleteIntroStudy(string idStudy, string idUser, string idIntro)
        {
            if (IsHasIntroStudyOfUser(idUser, idIntro, idStudy))
            {
                var current = DbContext.INTROSTUDies.Find(idStudy);
                DbContext.INTROSTUDies.Remove(current);
                return DbContext.SaveChanges();
            }

            return 0;
        }

        public BasicInfo GetBasicInfo(string idUser)
        {
            var result = new BasicInfo();

            if (!string.IsNullOrEmpty(idUser))
            {
                var info = DbContext.USERINFOes.FirstOrDefault(n => n.IdUser == idUser);
                var introStudy = GetIntroStudyPulic(idUser);
                var introWorking = GetIntroWorkingPublic(idUser);

                result.Info = new Info
                {
                    Birthday = info.DateOfBirth,
                    FirstName = info.FirstName,
                    Gender = info.Gender,
                    LastName = info.LastName
                };

                result.Address = GetAllAddressOfUserPublic(idUser)?.Select(n => new UserAddress
                {
                    City = n.City,
                    Country = n.Country,
                    DetailAddress = n.DetailAddress,
                    LiveFrom = n.LiveFrom,
                    LiveTo = n.LiveTo,
                    Province = n.Province
                }).ToList();

                result.IntroStudy = introStudy?.Select(n => new IntroStudy
                {
                    StudyFrom = n.StudyFrom,
                    Studying = n.Studying,
                    StudyTo = n.StudyTo
                }).ToList();

                result.IntroWorking = introWorking?.Select(n => new IntroWorking
                {
                    WorkFrom = n.WorkFrom,
                    WorkingAt = n.WorkingAt,
                    WorkTo = n.WorkTo
                }).ToList();

            }

            return result;
        }
    }
}