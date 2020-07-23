using DAL.Common;
using Helper.Enum;
using Helper.Helper.Common;
using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace DAL.Controllers
{
    public class UserInfoController : BaseController<UserInfoController>
    {
        string PrefixGG = ConfigurationManager.AppSettings["GoogleDriveFullImagePrefix"];
        private UserInformationContext dc = new UserInformationContext();
        private ImageController imgdc = new ImageController();
        private UserContext userdc = new UserContext();
        private UserAddressContext userAddress = new UserAddressContext();

        public UserInfo Get(string idUser)
        {
            UserInfo result = null;

            if (!string.IsNullOrEmpty(idUser) && userdc.IsExistUserId(idUser))
            {
                var userInfo = dc.GetByIdUser(idUser);

                result = new UserInfo()
                {
                    Cover = !string.IsNullOrEmpty(userInfo.Cover) ? $"{PrefixGG}{userInfo.Cover}" : string.Empty,
                    IdInfo = userInfo.IdInfo,
                    IdUser = userInfo.IdUser,
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    DateOfBirth = userInfo.DateOfBirth,
                    Gender = userInfo.Gender,
                    CreatedTS = userInfo.CreatedTS,
                    Avatar = !string.IsNullOrEmpty(userInfo.Avatar) ? $"{PrefixGG}{userInfo.Avatar}" : string.Empty,
                    LastUpdatedTS = userInfo.LastUpdatedTS
                };
            }

            return result;
        }

        public bool Create(UserInfo info)
        {
            bool isCreate = false;

            if (!string.IsNullOrEmpty(info.IdUser) && userdc.IsExistUserId(info.IdUser))
            {
                var data = new USERINFO()
                {
                    IdInfo = info.IdInfo,
                    IdUser = info.IdUser,
                    LastName = info.LastName,
                    FirstName = info.FirstName,
                    DateOfBirth = info.DateOfBirth,
                    CreatedTS = info.CreatedTS,
                    Gender = info.Gender
                };

                isCreate = dc.Create(data) > 0 ? true : false;
            }

            return isCreate;
        }

        public bool Update(UserInfo info)
        {
            bool isUpdate = false;

            if (!string.IsNullOrEmpty(info.IdUser) && userdc.IsExistUserId(info.IdUser))
            {
                var data = new USERINFO()
                {
                    IdInfo = info.IdInfo,
                    IdUser = info.IdUser,
                    LastName = info.LastName,
                    FirstName = info.FirstName,
                    DateOfBirth = info.DateOfBirth,
                    CreatedTS = info.CreatedTS,
                    Gender = info.Gender
                };

                isUpdate = dc.Update(data) > 0 ? true : false;
            }

            return isUpdate;
        }

        public bool UploadAvatarOrCover(UserInfo userInfo, string parent)
        {
            Images image = null;
            USERINFO CurrnetInfo = null;

            if (!(string.IsNullOrEmpty(userInfo.IdUser) && (string.IsNullOrEmpty(userInfo.Avatar)
                || string.IsNullOrEmpty(userInfo.Cover))) && UserContext.Instance.IsExistUserId(userInfo.IdUser))
            {
                var data = JsonConvert.SerializeObject
                    (UploadFile.UploadFileToDrive(!string.IsNullOrEmpty(userInfo.Avatar) ?
                    JsonConvert.DeserializeObject<List<string>>(userInfo.Avatar) :
                    JsonConvert.DeserializeObject<List<string>>(userInfo.Cover),
                    userInfo.IdUser, parent));

                CurrnetInfo = dc.GetByIdUser(userInfo.IdUser);
                var IdAlbumAvatar = string.Empty;
                var urlImage = string.Empty;

                if (!String.IsNullOrEmpty(userInfo.Avatar))
                {
                    urlImage = data;
                    CurrnetInfo.Avatar = data;
                    IdAlbumAvatar = MediaContext.Instance.GetIdAlbumImageDefault(userInfo.IdUser, "Avatar", "Your avatar");
                }
                else
                {
                    urlImage = data;
                    CurrnetInfo.Cover = data;
                    IdAlbumAvatar = MediaContext.Instance.GetIdAlbumImageDefault(userInfo.IdUser, "Cover", "Your cover");
                }

                image = new Images
                {
                    ContentImage = userInfo.Content,
                    IdAlbumImage = IdAlbumAvatar,
                    LinkUrl = urlImage,
                };
            }

            return (dc.Update(CurrnetInfo) > 0 && imgdc.Insert(image)) ? true : false;
        }

        public string InsertAddress(UserAddress data)
        {
            if (UserContext.Instance.IsExistUserId(data.IdUser) && !string.IsNullOrEmpty(data.Province)
                && !string.IsNullOrEmpty(data.LiveFrom.ToString()))
            {
                return userAddress.Create(new USERADDRESS
                {
                    City = data.City,
                    Country = data.Country,
                    DetailAddress = data.DetailAddress,
                    IdUser = data.IdUser,
                    IdUserAddress = GUID.UUID(),
                    Province = data.Province,
                    Status = data.Status,
                    LiveFrom = data.LiveFrom,
                    LiveTo = data.LiveTo

                });
            }

            return null;
        }

        public bool UpdateAddress(UserAddress data)
        {
            if (UserContext.Instance.IsExistUserId(data.IdUser) && !string.IsNullOrEmpty(data.Province)
                && !string.IsNullOrEmpty(data.LiveFrom.ToString()) && !string.IsNullOrEmpty(data.IdUserAddress))
            {
                return userAddress.Update(new USERADDRESS
                {
                    City = data.City,
                    Country = data.Country,
                    DetailAddress = data.DetailAddress,
                    IdUser = data.IdUser,
                    IdUserAddress = data.IdUserAddress,
                    Province = data.Province,
                    Status = data.Status,
                    LiveFrom = data.LiveFrom,
                    LiveTo = data.LiveTo

                }) > 0 ? true : false;
            }

            return false;
        }

        public List<UserAddress> ListAddress(string idUser)
        {
            List<UserAddress> listAddress = new List<UserAddress>();

            if (UserContext.Instance.IsExistUserId(idUser))
            {
                var data = userAddress.GetAllAddressOfUser(idUser);

                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        listAddress.Add(new UserAddress
                        {
                            City = item.City,
                            Country = item.Country,
                            DetailAddress = item.DetailAddress,
                            IdUser = item.IdUser,
                            IdUserAddress = item.IdUserAddress,
                            LiveFrom = item.LiveFrom,
                            LiveTo = item.LiveTo,
                            Province = item.Province,
                            Status = item.Status,
                        });
                    }
                }

            }

            return listAddress;
        }

        public List<UserAddress> ListAddressPublic(string idUser)
        {
            List<UserAddress> listAddress = new List<UserAddress>();

            if (UserContext.Instance.IsExistUserId(idUser))
            {
                var data = userAddress.GetAllAddressOfUserPublic(idUser);

                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        listAddress.Add(new UserAddress
                        {
                            City = item.City,
                            Country = item.Country,
                            DetailAddress = item.DetailAddress,
                            IdUser = item.IdUser,
                            IdUserAddress = item.IdUserAddress,
                            LiveFrom = item.LiveFrom,
                            LiveTo = item.LiveTo,
                            Province = item.Province,
                            Status = item.Status,
                        });
                    }
                }

            }

            return listAddress;
        }

        public bool DeleteAddress(UserAddress data)
        {
            if (!string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdUserAddress)
                && UserContext.Instance.IsExistUserId(data.IdUser) && UserContext.Instance.IsHasIDAddress(data.IdUserAddress)
                && UserContext.Instance.IsExistIDAddressOfUser(data.IdUser, data.IdUserAddress))
            {
                return userAddress.Delete(new USERADDRESS
                {
                    IdUser = data.IdUser,
                    IdUserAddress = data.IdUserAddress,
                    City = data.City,
                    Country = data.Country,
                    DetailAddress = data.DetailAddress,
                    LiveFrom = data.LiveFrom,
                    LiveTo = data.LiveTo,
                    Province = data.Province,
                    Status = data.Status
                }) > 0 ? true : false;
            }

            return false;
        }

        public List<IntroStudy> GetIntroStudies(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser) && userAddress.IsHasIdIntro(idUser))
            {
                var data = userAddress.GetIntroStudy(idUser);
                List<IntroStudy> result = null;

                if (data != null)
                {
                    result = new List<IntroStudy>();

                    foreach (var item in data)
                    {
                        result.Add(new IntroStudy()
                        {
                            IdStudy = item.IdStudy,
                            IdUserIntro = item.IdUserIntro,
                            Status = item.IDStatusSocial,
                            StudyFrom = item.StudyFrom,
                            Studying = item.Studying,
                            StudyTo = item.StudyTo
                        });
                    }
                }

                return result;
            }

            return null;
        }

        public List<IntroWorking> GetIntroWorking(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser))
            {
                var data = userAddress.GetIntroWorking(idUser);
                List<IntroWorking> result = null;

                if (data != null)
                {
                    result = new List<IntroWorking>();

                    foreach (var item in data)
                    {
                        result.Add(new IntroWorking()
                        {
                            IdWorking = item.IdWorking,
                            IdUserIntro = item.IdUserIntro,
                            Status = item.IDStatusSocial,
                            WorkFrom = item.WorkFrom,
                            WorkingAt = item.WorkingAt,
                            WorkTo = item.WorkTo
                        });
                    }
                }

                return result;
            }

            return null;
        }

        public List<IntroWorking> GetIntroWorkingPublic(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser) && userAddress.IsHasIdIntro(idUser))
            {
                var data = userAddress.GetIntroWorkingPublic(idUser);
                List<IntroWorking> result = null;

                if (data != null)
                {
                    result = new List<IntroWorking>();

                    foreach (var item in data)
                    {
                        result.Add(new IntroWorking()
                        {
                            IdWorking = item.IdWorking,
                            IdUserIntro = item.IdUserIntro,
                            Status = item.IDStatusSocial,
                            WorkFrom = item.WorkFrom,
                            WorkingAt = item.WorkingAt,
                            WorkTo = item.WorkTo
                        });
                    }
                }

                return result;
            }

            return null;
        }

        public List<IntroStudy> GetIntroStudiesPublic(string idUser)
        {
            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser) && userAddress.IsHasIdIntro(idUser))
            {
                var data = userAddress.GetIntroStudyPulic(idUser);
                List<IntroStudy> result = null;

                if (data != null)
                {
                    result = new List<IntroStudy>();

                    foreach (var item in data)
                    {
                        result.Add(new IntroStudy()
                        {
                            IdStudy = item.IdStudy,
                            IdUserIntro = item.IdUserIntro,
                            Status = item.IDStatusSocial,
                            StudyFrom = item.StudyFrom,
                            Studying = item.Studying,
                            StudyTo = item.StudyTo
                        });
                    }
                }

                return result;
            }

            return null;
        }

        public Tuple<string, string> CreateIntroWorking(IntroWorking data)
        {
            if (!string.IsNullOrEmpty(data.WorkingAt) && !string.IsNullOrEmpty(data.IdUserIntro))
            {
                return userAddress.CreateInroWorking(new INTROWORKING()
                {
                    IdUserIntro = userAddress.GetIdUserIntroOfIdUser(data.IdUserIntro),
                    IdWorking = GUID.UUID(),
                    IDStatusSocial = data.Status,
                    WorkFrom = data.WorkFrom,
                    WorkingAt = data.WorkingAt,
                    WorkTo = data.WorkTo
                });
            }

            return new Tuple<string, string>(string.Empty, string.Empty);
        }

        public Tuple<string, string> CreateIntroStudy(IntroStudy data)
        {
            if (!string.IsNullOrEmpty(data.Studying) && !string.IsNullOrEmpty(data.IdUserIntro))
            {
                return userAddress.CreateInroStudy(new INTROSTUDY()
                {
                    IdUserIntro = userAddress.GetIdUserIntroOfIdUser(data.IdUserIntro),
                    IdStudy = GUID.UUID(),
                    IDStatusSocial = data.Status,
                    Studying = data.Studying,
                    StudyFrom = data.StudyFrom,
                    StudyTo = data.StudyTo
                });
            }

            return new Tuple<string, string>(string.Empty, string.Empty);
        }

        public int UpdateIntroWorking(IntroWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdUserIntro) && !string.IsNullOrEmpty(data.IdWorking) && userAddress.IsHasIdWorking(data.IdWorking))
            {
                return userAddress.UpdateIntroWoking(new INTROWORKING()
                {
                    IdUserIntro = data.IdUserIntro,
                    IdWorking = data.IdWorking,
                    IDStatusSocial = data.Status,
                    WorkFrom = data.WorkFrom,
                    WorkingAt = data.WorkingAt,
                    WorkTo = data.WorkTo
                });
            }

            return 0;
        }

        public int UpdateIntroStudy(IntroStudy data)
        {
            if (!string.IsNullOrEmpty(data.IdUserIntro) && !string.IsNullOrEmpty(data.IdStudy) && userAddress.IsHasIdStudy(data.IdStudy))
            {
                return userAddress.UpdateIntroStudy(new INTROSTUDY()
                {
                    IdUserIntro = data.IdUserIntro,
                    IdStudy = data.IdStudy,
                    IDStatusSocial = data.Status,
                    StudyFrom = data.StudyFrom,
                    Studying = data.Studying,
                    StudyTo = data.StudyTo
                });
            }

            return 0;
        }

        public int DeleteIntroStudy(IntroStudyWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdStudy) && !string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdIntro) && userAddress.IsHasIdStudy(data.IdStudy))
            {
                return userAddress.DeleteIntroStudy(data.IdStudy, data.IdUser, data.IdIntro);
            }

            return 0;
        }

        public int DeleteIntroWorking(IntroStudyWorking data)
        {
            if (!string.IsNullOrEmpty(data.IdWorking) && !string.IsNullOrEmpty(data.IdUser) && !string.IsNullOrEmpty(data.IdIntro) && userAddress.IsHasIdWorking(data.IdWorking))
            {
                return userAddress.DeleteIntroWorking(data.IdWorking, data.IdUser, data.IdIntro);
            }

            return 0;
        }

        public BasicInfo GetBasicInfo(string idUser)
        {
            var result = new BasicInfo();

            if (!string.IsNullOrEmpty(idUser) && UserContext.Instance.IsExistUserId(idUser))
            {
                result = userAddress.GetBasicInfo(idUser);
            }

            return result;
        }
    }
}