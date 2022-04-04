// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.FilterConfig
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System.Web.Mvc;

namespace ScanHomeEIP
{
  public class FilterConfig
  {
    public static void RegisterGlobalFilters(GlobalFilterCollection filters) => filters.Add((object) new HandleErrorAttribute());
  }
}
