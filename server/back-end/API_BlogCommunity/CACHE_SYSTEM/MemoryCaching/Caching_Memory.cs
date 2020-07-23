using System;
using System.Runtime.Caching;

namespace CACHE_SYSTEM.MemoryCaching
{
    public static class Caching_Memory
    {
        public static object GetValue(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(key);
        }

        public static void Add(string key, object value, DateTimeOffset absExpiration)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            if (!memoryCache.Contains(key))
            {               
                memoryCache.Add(key, value, absExpiration);
            }          
        }

        public static void Delete(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            if (memoryCache.Contains(key))
            {
                memoryCache.Remove(key);
            }
        }
    }
}