using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Helper.Helper.Common
{
    public class CryptoUtils
    {
        private const string Pwd = "56c6a2c0de9c4d4197a2e1c4b9e04c3a";

        static string Encrypt(string text)
        {
            // Use FIPS method if required
            var crypto = SymmetricAlgorithm.Create("TripleDES");
            GetKey(out byte[] key, out byte[] iv);
            ICryptoTransform encryptor = crypto.CreateEncryptor(key, iv);

            using (var stream = new MemoryStream())
            {
                CryptoStream cryptStream = new CryptoStream(stream, encryptor, CryptoStreamMode.Write);
                byte[] rawBytes = Encoding.UTF8.GetBytes(text);
                cryptStream.Write(rawBytes, 0, rawBytes.Length);
                cryptStream.Flush();
                cryptStream.FlushFinalBlock();
                string encryptedValue = Convert.ToBase64String(stream.ToArray());
                return encryptedValue;
            }
        }
        static string Decrypt(string encryptedText)
        {
            SymmetricAlgorithm crypto = SymmetricAlgorithm.Create("TripleDES");
            GetKey(out byte[] key, out byte[] iv);
            ICryptoTransform decryptor = crypto.CreateDecryptor(key, iv);

            byte[] encryptedBytes = null;
            try
            {
                encryptedBytes = Convert.FromBase64String(encryptedText);
            }
            catch (Exception ex)
            {
                var a = ex;
            }
            if (encryptedBytes == null || encryptedBytes.Length == 0)
                return null;

            try
            {
                using (var stream = new MemoryStream(encryptedBytes))
                {
                    CryptoStream cryptStream = new CryptoStream(stream, decryptor, CryptoStreamMode.Read);
                    StreamReader streamReader = new StreamReader(cryptStream, Encoding.UTF8);
                    return streamReader.ReadToEnd();
                }
            }
            catch (CryptographicException)
            {
            }
            return null;
        }
        static void GetKey(out byte[] key, out byte[] iv)
        {
            byte[] pwdBytes = Encoding.UTF8.GetBytes(Pwd);
            byte[] pwdHash = HashAlgorithm.Create("SHA256").ComputeHash(pwdBytes);
            key = new byte[24];
            iv = new byte[8];
            Array.Copy(pwdHash, 0, key, 0, 24);
            Array.Copy(pwdHash, 24, iv, 0, 8);
        }
        public static string EncryptString(string text)
        {
            return Encrypt(text);
        }
        public static bool DecryptString(string encryptedInfo, out string raw)
        {
            raw = null;
            string info = Decrypt(encryptedInfo);
            if (string.IsNullOrEmpty(info))
                return false;
            raw = new StringReader(info).ReadToEnd();
            return true;
        }
    }
}