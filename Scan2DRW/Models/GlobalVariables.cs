// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.GlobalVariables
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System;
using System.IO;
using System.Web;

namespace ScanHomeEIP.Models
{
  public static class GlobalVariables
  {
    public static string CurrentGUID
    {
      get => HttpContext.Current.Session[nameof (CurrentGUID)] == null ? (string) null : HttpContext.Current.Session[nameof (CurrentGUID)] as string;
      set => HttpContext.Current.Session[nameof (CurrentGUID)] = (object) value;
    }

    public static string ThumbnailsLocalPath
    {
      get
      {
        try
        {
          return Path.Combine(HttpRuntime.AppDomainAppPath, "Images", "Thumbnails");
        }
        catch
        {
        }
        try
        {
          return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Images", "Thumbnails");
        }
        catch
        {
        }
        try
        {
          return HttpContext.Current.Server.MapPath("~/Images/Thumbnails");
        }
        catch
        {
          throw;
        }
      }
    }

    public static string PrintLocalPath
    {
      get
      {
        try
        {
          return Path.Combine(HttpRuntime.AppDomainAppPath, "Print");
        }
        catch
        {
        }
        try
        {
          return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Print");
        }
        catch
        {
        }
        try
        {
          return HttpContext.Current.Server.MapPath("~/Print");
        }
        catch
        {
          throw;
        }
      }
    }
  }
}
