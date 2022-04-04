// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.WebApiConfig
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System.Web.Http;

namespace ScanHomeEIP
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config) => config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{id}", (object) new
    {
      id = RouteParameter.Optional
    });
  }
}
