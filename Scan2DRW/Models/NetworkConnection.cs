// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.NetworkConnection
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System;
using System.ComponentModel;
using System.Net;
using System.Runtime.InteropServices;

namespace ScanHomeEIP.Models
{
  public class NetworkConnection : IDisposable
  {
    private readonly string _networkName;

    public NetworkConnection(string networkName, NetworkCredential credentials, string logpath)
    {
      this._networkName = networkName;
      NetworkConnection.WNetCancelConnection2(networkName, 1, true);
      NetworkConnection.NetResource netResource = new NetworkConnection.NetResource()
      {
        Scope = NetworkConnection.ResourceScope.GlobalNetwork,
        ResourceType = NetworkConnection.ResourceType.Disk,
        DisplayType = NetworkConnection.ResourceDisplaytype.Share,
        RemoteName = networkName
      };
      string username = string.IsNullOrEmpty(credentials.Domain) ? credentials.UserName : string.Format("{0}\\{1}", (object) credentials.Domain, (object) credentials.UserName);
      int error = NetworkConnection.WNetAddConnection2(netResource, credentials.Password, username, 0);
      if (error != 0)
      {
        Log_Creator.WriteToLog(logpath, username, "HomeDir", "Error connecting to remote share -> result: " + (object) error);
        throw new Win32Exception(error, "Error connecting to remote share");
      }
    }

    ~NetworkConnection() => this.Dispose(false);

    public void Dispose()
    {
      this.Dispose(true);
      GC.SuppressFinalize((object) this);
    }

    protected virtual void Dispose(bool disposing) => NetworkConnection.WNetCancelConnection2(this._networkName, 0, true);

    [DllImport("mpr.dll")]
    private static extern int WNetAddConnection2(
      NetworkConnection.NetResource netResource,
      string password,
      string username,
      int flags);

    [DllImport("mpr.dll")]
    private static extern int WNetCancelConnection2(string name, int flags, bool force);

    [StructLayout(LayoutKind.Sequential)]
    public class NetResource
    {
      public NetworkConnection.ResourceScope Scope;
      public NetworkConnection.ResourceType ResourceType;
      public NetworkConnection.ResourceDisplaytype DisplayType;
      public int Usage;
      public string LocalName;
      public string RemoteName;
      public string Comment;
      public string Provider;
    }

    public enum ResourceScope
    {
      Connected = 1,
      GlobalNetwork = 2,
      Remembered = 3,
      Recent = 4,
      Context = 5,
    }

    public enum ResourceType
    {
      Any = 0,
      Disk = 1,
      Print = 2,
      Reserved = 8,
    }

    public enum ResourceDisplaytype
    {
      Generic,
      Domain,
      Server,
      Share,
      File,
      Group,
      Network,
      Root,
      Shareadmin,
      Directory,
      Tree,
      Ndscontainer,
    }
  }
}
