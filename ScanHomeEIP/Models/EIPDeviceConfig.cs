// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.EIPDeviceConfig
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System;
using System.Xml.Linq;
using XRXNetWebservices.DeviceConfig;

namespace ScanHomeEIP.Models
{
  public class EIPDeviceConfig
  {
    public static string GetMachineName(string printerIP)
    {
      try
      {
        string url = "https://" + printerIP;
        XElement xelement = XElement.Parse(XRXDeviceConfig.getXRXDeviceConfig().GetDeviceInformation(url).Information);
        XNamespace defaultNamespace = xelement.GetDefaultNamespace();
        return xelement.Element(defaultNamespace + "device").Element(defaultNamespace + "name").Value;
      }
      catch (Exception ex)
      {
        throw new Exception("Error retrieving machine name", ex);
      }
    }
  }
}
