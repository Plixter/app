// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.Application
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System.Xml.Serialization;

namespace ScanHomeEIP.Models
{
  [XmlType(AnonymousType = true)]
  [XmlRoot(IsNullable = false, Namespace = "")]
  public class Application
  {
    private string serverField;
    private string emailField;
    private string scanTemplateNameField;
    private string scanModeField;
    private string scanTypeField;
    private string compressionQualityField;
    private string contrastField;
    private string darknessField;
    private string sharpnessField;
    private string saturationField;
    private string colorField;
    private string orientationField;
    private string mediaSizeField;
    private string edgeEraseField;
    private string fileTypeField;
    private string resolutionField;
    private string blankPageRemovalField;
    private string backsupressionField;
    private string applicationpathField;
    private string LDAPPathField;
    private string SearchDirectoryRootField;
    private string docnameField;
    private string UserDomainField;
    private string UserNameField;
    private string UserPassField;
    private string ShareField;
    private string PathField;
    private string ServerFolderField;

    public string ServerFolder
    {
      get => this.ServerFolderField;
      set => this.ServerFolderField = value;
    }

    public string Path
    {
      get => this.PathField;
      set => this.PathField = value;
    }

    public string Share
    {
      get => this.ShareField;
      set => this.ShareField = value;
    }

    public string UserPass
    {
      get => this.UserPassField;
      set => this.UserPassField = value;
    }

    public string UserName
    {
      get => this.UserNameField;
      set => this.UserNameField = value;
    }

    public string UserDomain
    {
      get => this.UserDomainField;
      set => this.UserDomainField = value;
    }

    public string SearchDirectoryRoot
    {
      get => this.SearchDirectoryRootField;
      set => this.SearchDirectoryRootField = value;
    }

    public string LDAPPath
    {
      get => this.LDAPPathField;
      set => this.LDAPPathField = value;
    }

    public string docName
    {
      get => this.docnameField;
      set => this.docnameField = value;
    }

    public string ApplicationPath
    {
      get => this.applicationpathField;
      set => this.applicationpathField = value;
    }

    public string BackSupression
    {
      get => this.backsupressionField;
      set => this.backsupressionField = value;
    }

    public string Server
    {
      get => this.serverField;
      set => this.serverField = value;
    }

    public string Email
    {
      get => this.emailField;
      set => this.emailField = value;
    }

    public string scanTemplateName
    {
      get => this.scanTemplateNameField;
      set => this.scanTemplateNameField = value;
    }

    public string scanMode
    {
      get => this.scanModeField;
      set => this.scanModeField = value;
    }

    public string scanType
    {
      get => this.scanTypeField;
      set => this.scanTypeField = value;
    }

    public string compressionQuality
    {
      get => this.compressionQualityField;
      set => this.compressionQualityField = value;
    }

    public string contrast
    {
      get => this.contrastField;
      set => this.contrastField = value;
    }

    public string darkness
    {
      get => this.darknessField;
      set => this.darknessField = value;
    }

    public string sharpness
    {
      get => this.sharpnessField;
      set => this.sharpnessField = value;
    }

    public string saturation
    {
      get => this.saturationField;
      set => this.saturationField = value;
    }

    public string color
    {
      get => this.colorField;
      set => this.colorField = value;
    }

    public string orientation
    {
      get => this.orientationField;
      set => this.orientationField = value;
    }

    public string mediaSize
    {
      get => this.mediaSizeField;
      set => this.mediaSizeField = value;
    }

    public string edgeErase
    {
      get => this.edgeEraseField;
      set => this.edgeEraseField = value;
    }

    public string fileType
    {
      get => this.fileTypeField;
      set => this.fileTypeField = value;
    }

    public string resolution
    {
      get => this.resolutionField;
      set => this.resolutionField = value;
    }

    public string BlankPageRemoval
    {
      get => this.blankPageRemovalField;
      set => this.blankPageRemovalField = value;
    }
  }
}
