// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.Log_Creator
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System;
using System.IO;
using System.Text;
using System.Web;

namespace ScanHomeEIP.Models
{
  public static class Log_Creator
  {
    public static string GetUserIP()
    {
      try
      {
        string serverVariable = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        if (string.IsNullOrEmpty(serverVariable))
          return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
        return serverVariable.Split(',')[0];
      }
      catch
      {
        return "";
      }
    }

    public static void WriteToLog(
      string logFolder,
      string username,
      string Mensagem,
      string sentstatus)
    {
      try
      {
        string userIp = Log_Creator.GetUserIP();
        string str;
        do
        {
          str = logFolder;
        }
        while (File.Exists(str) && new FileInfo(str).Length > 5242880L);
        using (TextWriter textWriter = (TextWriter) new StreamWriter(str, true, Encoding.Default))
        {
          if (!File.Exists(str))
            textWriter.WriteLine("DateTime;IP;AppName;Username;Mensagem;SentStatus");
          textWriter.WriteLine(DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + ";" + userIp + ";" + HttpContext.Current.Request.ApplicationPath + ";" + username + ";" + Mensagem + ";" + sentstatus + ";");
        }
      }
      catch (Exception ex)
      {
        throw new Exception("Error writing to log file in " + logFolder, ex);
      }
    }
  }
}
