﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;

namespace Helper.Helper.Common
{
    public static class CredentialUtils
    {
        static int MinRequiredPasswordLengthLimited = 9;
        static int PasswordKeySizeInBits = 160;
        static int PasswordKeySize = PasswordKeySizeInBits / 8;

        public static void GeneratePasswordSalt(string password, out string newPasswordHash, out string newPasswordSalt)
        {
            newPasswordSalt = GeneratePasswordSalt();
            byte[] password1 = CryptographyUtil.StringToBytes(password);
            newPasswordHash = EncryptPassword(password1, newPasswordSalt);
        }
        static string GeneratePasswordSalt()
        {
            int passwordSaltLength = (MinRequiredPasswordLengthLimited + 1) / 2;
            byte[] salt = CryptographyUtil.GeneratePasswordSalt(passwordSaltLength);
            return BytesToString(salt);
        }
        static string BytesToString(byte[] bytes)
        {
            return CryptographyUtil.HexaStringEncoding.GetString(bytes);
        }
        static byte[] StringToBytes(string value)
        {
            return CryptographyUtil.HexaStringEncoding.GetBytes(value);
        }
        internal static string EncryptPassword(byte[] password, string saltEncodedString)
        {
            byte[] passwordSalt = StringToBytes(saltEncodedString);    // Decode string to bytes
            byte[] passwordKey = CryptographyUtil.DerivePasswordKey(password, passwordSalt, PasswordKeySize);
            byte[] passwordHash = new byte[0];
            passwordHash = CryptographyUtil.SHA1EncryptPassword(passwordKey);
            string result = BytesToString(passwordHash); // Encode bytes to string
            return result;
        }
        internal static string GenerateToken(long sessionId, TimeSpan timeout, bool isAdmin = true)
        {
            var expireTimeUtc = DateTime.UtcNow.Add(timeout);

            var mem = new MemoryStream();
            using (var w = new BinaryWriter(mem))
            {
                w.Write(sessionId);
                w.Write(expireTimeUtc.Ticks);
                w.Write(isAdmin);

                // writes upto 8 random bytes
                var rng = RNGCryptoServiceProvider.Create();
                var rndBytes = new byte[1];
                rng.GetBytes(rndBytes);
                var numberOfRandomBytes = (int)Math.Ceiling(((double)rndBytes[0] / byte.MaxValue) * 8);
                if (numberOfRandomBytes > 0)
                {
                    rndBytes = new byte[numberOfRandomBytes];
                    rng.GetBytes(rndBytes);
                    w.Write(rndBytes);
                }
            }

            var buff = MachineKey.Protect(mem.ToArray(), "UsrSssn");
            return Base62.FromBytes(buff);
        }
        internal static string GenerateTokenEx(long sessionId, TimeSpan timeout, long uid, bool isAdmin = true)
        {
            var expireTimeUtc = DateTime.UtcNow.Add(timeout);

            var mem = new MemoryStream();
            using (var w = new BinaryWriter(mem))
            {
                w.Write(sessionId);
                w.Write(expireTimeUtc.Ticks);
                w.Write(isAdmin);
                w.Write(uid);

                // writes upto 8 random bytes
                var rng = RNGCryptoServiceProvider.Create();
                var rndBytes = new byte[1];
                rng.GetBytes(rndBytes);
                var numberOfRandomBytes = (int)Math.Ceiling(((double)rndBytes[0] / byte.MaxValue) * 8);
                if (numberOfRandomBytes > 0)
                {
                    rndBytes = new byte[numberOfRandomBytes];
                    rng.GetBytes(rndBytes);
                    w.Write(rndBytes);
                }
            }

            var buff = MachineKey.Protect(mem.ToArray(), "UsrSssn");
            return Base62.FromBytes(buff);
        }

        internal static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        internal static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        internal static string Sha256(string randomString)
        {
            var crypt = new System.Security.Cryptography.SHA256Managed();
            var hash = new System.Text.StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(randomString));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }

        private static readonly Random m_Random = new Random();

        private static char RandomChar(string pattern)
        {
            return pattern[m_Random.Next(pattern.Length)];
        }

        /// <summary>
        /// Generate random password
        /// </summary>
        /// <returns>Format aaadddAAA</returns>
        //public static string GeneratePassword()
        //{
        //    int len = 9;
        //    int p = 0;
        //    byte[] result = new byte[len];            
        //    var rd2 = new Random().Next(-2147483647, 2147483647);
        //    var rd1 = $"{Guid.NewGuid().ToString()} {rd2}";
        //    string alpha = "abcdefghijklmnopqrstuvwxyz";
        //    for (int i = 0; i < 3; i++, p++)
        //        result[p] = (byte)RandomChar(alpha);
        //    for (int i = 0; i < 3; i++, p++)
        //        result[p] = (byte)RandomChar("0123456789");
        //    for (int i = 0; i < 3; i++, p++)
        //        result[p] = (byte)RandomChar(alpha.ToUpper());
        //    System.Diagnostics.Debug.Assert(p == len);
        //    return $"{result.ToString()}{rd1}";
        //}

        public static string GeneratePassword()
        {
            var rd2 = new Random().Next(-2147483647, 2147483647);
            return $"{Guid.NewGuid().ToString()} {rd2}";
        }

        public static void EncryptPasswordFromPubDot(string password, out string passwordHash, out string passwordSalt)
        {
            passwordSalt = MD5Hash(GeneratePassword());
            string passwordEncrypt = Sha256(Base64Encode(MD5Hash(password)));
            passwordHash = GenerateTokenKey.Encode(passwordEncrypt, passwordSalt, JwtHashAlgorithm.RS256);
        }

        public static bool IsPasswordMatch(string passwordCurrent, string passwordHash, string passwordSalt)
        {
            var EncryptPassword = GenerateTokenKey.DecodeByPassword(passwordHash, passwordSalt);
            string DecryptToMD5 = MD5Hash(passwordCurrent);
            string DecryptToBase64 = Base64Encode(DecryptToMD5);
            string DecryptToSha256 = Sha256(DecryptToBase64);
            if (DecryptToSha256 == EncryptPassword)
            {
                return true;
            }

            else
            {
                return false;
            }
        }

        public static void DecryptPassword(string passwordHash, string passwordSalt, out string passwordDecrypted)
        {
            passwordDecrypted = GenerateTokenKey.Decode(passwordHash, passwordSalt);
        }

    }
    internal class CryptographyUtil
    {
        private static readonly Encoding m_UnicodeEncoding = Encoding.GetEncoding(
            "utf-8",
            new EncoderReplacementFallback("?"),
            new DecoderReplacementFallback("?"));
        public static Encoding UnicodeEncoding
        {
            get { return m_UnicodeEncoding; }
        }

        public static byte[] StringToBytes(string s)
        {
            return UnicodeEncoding.GetBytes(s);
        }

        public static string BytesToString(byte[] bytes)
        {
            return UnicodeEncoding.GetString(bytes);
        }

        private static void FillZero(byte[] abyt)
        {
            for (int i = 0; i < abyt.Length; i++)
                abyt[i] = (byte)0;
        }

        public static byte[] GeneratePasswordSalt(int length)
        {
            byte[] result = new byte[length];
            FillZero(result);
            var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(result);
            return result;
        }

        public static byte[] DerivePasswordKey(byte[] password, byte[] salt, int length)
        {
            var pdb = new System.Security.Cryptography.PasswordDeriveBytes(password, salt);
            byte[] passwordKey = pdb.GetBytes(length);
            return passwordKey;
        }

       

        

        /// <summary>
        /// Compute passwordHash from passwordKey(pass+salt) using MD5
        /// </summary>
        /// <param name="passwordKey">Password+salt</param>
        /// <returns>Password hash</returns>
        public static byte[] MD5EncryptPassword(byte[] passwordKey)
        {
            var md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] passwordHash = md5.ComputeHash(passwordKey);
            return passwordHash;
        }

        public static string HashMD5(string source)
        {
            byte[] bytes = UnicodeEncoding.GetBytes(source);
            byte[] hash = MD5EncryptPassword(bytes);
            return HexaStringEncoding.GetString(hash);
        }

        /// <summary>
        /// Compute passwordHash from passwordKey(pass+salt) using SHA1
        /// </summary>
        /// <param name="passwordKey">Password+salt</param>
        /// <returns>Password hash</returns>
        public static byte[] SHA1EncryptPassword(byte[] passwordKey)
        {
            var sha1 = new System.Security.Cryptography.SHA1CryptoServiceProvider();
            byte[] passwordHash = sha1.ComputeHash(passwordKey);
            return passwordHash;
        }

        /// <summary>
        /// Encode and decode between byte[] and string in Hexadecimal string format
        /// <todo>Implement System.ArgumentException</todo>
        /// </summary>
        public class HexaStringEncoding
        {
            /// <summary>
            /// Decode hexa string to bytes
            /// </summary>
            public static byte[] GetBytes(string s)
            {
                int len = s.Length;
                byte[] result = new byte[len / 2];
                try
                {
                    for (int i = 0, j = 0; j < len; i++, j += 2)
                    {
                        result[i] = byte.Parse(s.Substring(j, 2), System.Globalization.NumberStyles.HexNumber);
                    }
                }
                catch { }
                return result;
            }

            /// <summary>
            /// Encode hexa string from bytes
            /// </summary>
            public static string GetString(byte[] bytes)
            {
                StringBuilder s = new StringBuilder();
                foreach (byte b in bytes)
                {
                    s.Append(b.ToString("x2"));
                }
                return s.ToString().ToLower();
            }

                   
        }
    }

}