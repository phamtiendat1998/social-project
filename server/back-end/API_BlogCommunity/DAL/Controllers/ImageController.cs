using Helper.TempModel;
using Model.DataContext;
using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DAL.Controllers
{
    public class ImageController : BaseController<ImageController>
    {
        ImagesContext dc = new ImagesContext();

        public Images Get(string idImage)
        {
            var data = dc.Get(idImage);

            return new Images
            {
                ContentImage = data.ContentImage,
                CreatedTS = data.CreatedTS,
                IdAlbumImage = data.IdAlbumImage,
                IdImage = data.IdImage,
                LinkUrl = data.LinkUrl,
                UpdatedTS = data.UpdatedTS
            };
        }

        public bool Insert(Images image)
        {
            IMAGE img = new IMAGE()
            {
                ContentImage = image.ContentImage,
                IdAlbumImage = image.IdAlbumImage,
                LinkUrl = image.LinkUrl,
                CreatedTS = image.CreatedTS,
                IdImage = image.IdImage
            };

            return dc.Create(img) > 0 ? true : false;
        }

    }
}