using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace Helper.Helper.Common
{
    public static class Serializer
    {
        public static string Stringify(object obj)
        {
            return obj != null ? JsonConvert.SerializeObject(obj) : "";
        }

        public static T ToJson<T>(string json)
        {
            if (string.IsNullOrEmpty(json))
                return default(T);
            return JsonConvert.DeserializeObject<T>(json);
        }

        public static T ToJson<T>(Stream inStream)
        {
            var s = new JsonSerializer();
            using (var textreader = new StreamReader(inStream))
            using (var jsonreader = new JsonTextReader(textreader))
                return s.Deserialize<T>(jsonreader);
        }

        public static T ToJson<T>(byte[] data)
        {
            if (data == null || data.Length == 0)
                return default(T);
            return ToJson<T>(new MemoryStream(data));
        }
    }
}