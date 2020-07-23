using Model.Model_CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Model.DataContext
{
    public class AlbumMusicContext : DataContextCoreBase<AlbumMusicContext>
    {
        public IEnumerable<ALBUMMUSIC> Get()
        {
            return DbContext.ALBUMMUSICs.ToList();
        }

        public ALBUMMUSIC Get(string idAlbum)
        {
            return DbContext.ALBUMMUSICs.FirstOrDefault(n => n.IdAlbumMusic == idAlbum);
        }

        public void Create(ALBUMMUSIC albummusic)
        {
            DbContext.ALBUMMUSICs.Add(albummusic);
            DbContext.SaveChanges();
        }

        public void Update(ALBUMMUSIC music)
        {
            DbContext.ALBUMMUSICs.Add(music);
            DbContext.Entry(music).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public void Delete(ALBUMMUSIC music)
        {
            DbContext.ALBUMMUSICs.Remove(music);
            DbContext.SaveChanges();
        }
    }
}