// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.EIPScanTemplate
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System;
using XRXNetWebservices.Template;

namespace ScanHomeEIP.Models
{
  public static class EIPScanTemplate
  {
    public static string CreateTemplate(
      string templateName,
      string scanMode,
      string scanType,
      int compressionQuality,
      int contrast,
      int darkness,
      int sharpness,
      int saturation,
      string color,
      string orientation,
      string mediaSize,
      string edgeErase,
      string fileType,
      string resolution,
      string docName,
      string FTPFolder,
      string FTPServer,
      string FTPUsername,
      string FTPPassword)
    {
      return "[service xrx_svc_general]\r\n{\r\n enum_DCS DCSDefinitionUsed = DCS_GENERIC;\r\n string JobTemplateLanguageVersion = \"4.00.07\";\r\n enum_encoding JobTemplateCharacterEncoding = UTF-8;\r\n enum_confmethod ConfirmationMethod = PRINT;\r\n enum_confstage ConfirmationStage = AFTER_JOB_COMPLETE;\r\n string JobTemplateName = \"" + templateName + ".xst\";\r\n}\r\nend\r\n\r\n[service xrx_svc_scan]\r\n{\r\n* enum_sided SidesToScan = " + scanMode + ";\r\n* enum_imagemode DocumentImageMode = " + scanType + ";\r\n* integer CompressionQuality = " + (object) compressionQuality + ";\r\n* integer Contrast = " + (object) contrast + ";\r\n* integer Darkness = " + (object) darkness + ";\r\n* integer Sharpness = " + (object) sharpness + ";\r\n* integer Saturation = " + (object) saturation + ";\r\n* enum_colormode ColorMode = " + color + ";\r\n* enum_inputorientation InputOrientation = " + orientation + ";\r\n* enum_mediasize InputMediaSize = " + mediaSize + ";\r\n* struct_borders InputEdgeErase = " + edgeErase + ";\r\n}\r\nend\r\n\r\n[service xrx_svc_file]\r\nfile_1{\r\n* enum_filingpolicy DocumentFilingPolicy = OVERWRITE;\r\n* string RepositoryAlias = \"\";\r\n* string DocumentPath = \"" + FTPFolder + "\";\r\n* string RepositoryName = \"" + FTPServer + "\";\r\n* enum_filingprotocol FilingProtocol = FTP;\r\n* string UserNetworkFilingLoginName = \"" + FTPUsername + "\";\r\n* string UserNetworkFilingLoginID = \"" + FTPPassword + "\";\r\n}\r\nend\r\n[doc_object xrx_document]\r\ndoc_1{\r\n* enum_resolution Resolution = " + resolution + ";\r\n* enum_docformat DocumentFormat = " + fileType + ";\r\n* string DocumentObjectName = \"" + docName + "\";\r\n}\r\nend\r\n\r\n";
    }

    public static void DeleteTemplate(string printerIP, string templateName)
    {
      try
      {
        string url = "https://" + printerIP;
        TemplateEntry[] templateList = EIPScanTemplate.GetTemplateList(printerIP);
        int checksum = 0;
        for (int index = 0; index < templateList.Length; ++index)
        {
          if (templateList[index].TemplateName == templateName)
          {
            checksum = templateList[index].TemplateChecksum;
            break;
          }
        }
        if (checksum == 0)
          return;
        EIPScanTemplate.DeleteTemplate(url, templateName, checksum);
      }
      catch
      {
        throw;
      }
    }

    public static TemplateEntry[] GetTemplateList(string printerIP)
    {
      try
      {
        string url = "https://" + printerIP;
        return XRXTemplate.getXRXTemplate().GetTemplateList(url);
      }
      catch (Exception ex)
      {
        throw new Exception("Error retrieving template list", ex);
      }
    }

    public static void SetTemplate(
      string printerIP,
      string templateName,
      string scanMode,
      string scanType,
      int compressionQuality,
      int contrast,
      int darkness,
      int sharpness,
      int saturation,
      string color,
      string orientation,
      string mediaSize,
      string edgeErase,
      string fileType,
      string resolution,
      string docName,
      string FTPFolder,
      string FTPServer,
      string FTPUsername,
      string FTPPassword)
    {
      try
      {
        string url = "https://" + printerIP;
        TemplateEntry[] templateList = EIPScanTemplate.GetTemplateList(printerIP);
        int checksum = 0;
        for (int index = 0; index < templateList.Length; ++index)
        {
          if (templateList[index].TemplateName == templateName + ".xst")
          {
            checksum = templateList[index].TemplateChecksum;
            break;
          }
        }
        if (checksum != 0)
          EIPScanTemplate.DeleteTemplate(url, templateName, checksum);
        EIPScanTemplate.UploadTemplate(url, templateName + ".xst", EIPScanTemplate.CreateTemplate(templateName, scanMode, scanType, compressionQuality, contrast, darkness, sharpness, saturation, color, orientation, mediaSize, edgeErase, fileType, resolution, docName, FTPFolder, FTPServer, FTPUsername, FTPPassword));
      }
      catch (Exception ex)
      {
        throw new Exception("Error Seting template ", ex);
      }
    }

    private static void DeleteTemplate(string url, string name, int checksum)
    {
      try
      {
        XRXTemplate.getXRXTemplate().DeleteTemplate(url, name, checksum);
      }
      catch (Exception ex)
      {
        throw new Exception("Error deleting template " + name, ex);
      }
    }

    private static int UploadTemplate(string url, string name, string content)
    {
      try
      {
        return XRXTemplate.getXRXTemplate().PutTemplate(url, name, content).TemplateChecksum;
      }
      catch (Exception ex)
      {
        throw new Exception("Error uploading template " + name, ex);
      }
    }
  }
}
