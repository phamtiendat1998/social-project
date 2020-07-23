using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Web;

namespace Helper.Helper.Common
{
    public static class ServiceOTP
    {
        public static bool SendOTPToPhoneNumber(string phoneNumber, string content, int port = 1)
        {
            try
            {
                string[] ports = SerialPort.GetPortNames();
                SerialPort serial = new SerialPort();

                serial.PortName = ports[port];
                serial.BaudRate = 9600;
                serial.Parity = Parity.None;
                serial.StopBits = StopBits.One;
                serial.DataBits = 8;
                serial.Handshake = Handshake.RequestToSend;
                serial.DtrEnable = true;
                serial.RtsEnable = true;
                serial.NewLine = Environment.NewLine;
                serial.Open();
                if (serial.IsOpen)
                {

                    serial.Write("AT" + Environment.NewLine);
                    Thread.Sleep(100);
                    serial.Write("AT+CMGF=1" + Environment.NewLine);
                    Thread.Sleep(100);
                    serial.Write("AT+CSCS=\"GSM\"" + Environment.NewLine);
                    Thread.Sleep(100);
                    serial.Write("AT+CMGS=\"" + phoneNumber + "\"" + Environment.NewLine);
                    Thread.Sleep(100);
                    serial.Write(content + Environment.NewLine);
                    Thread.Sleep(100);
                    serial.Write(new byte[] { 26 }, 0, 1);
                    Thread.Sleep(100);
                    var respon = serial.ReadExisting();
                    if (respon.Contains("ERROR"))
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }                  

                }
                serial.Close();
            }
            catch (Exception e)
            {
                return false;
            }
            return false;
        }
        public static bool SendEmail(string from, string passwordEmailFrom, string to, string subject, string content)
        {
            try
            {
                MailMessage mail = new MailMessage(from, to, subject, content);
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(from, passwordEmailFrom);
                client.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
            }
            return false;
        }


    }

}