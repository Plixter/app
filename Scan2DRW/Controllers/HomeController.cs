// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Controllers.HomeController
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using ScanHomeEIP.Models;
using System;
using System.Collections;
using System.Configuration;
using System.Diagnostics;
using System.DirectoryServices;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;

namespace ScanHomeEIP.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult teste(string txt) => (ActionResult)this.View();

		public ActionResult Index()
		{
			try
			{
				EIPScanTemplate.DeleteTemplate(Log_Creator.GetUserIP(), ConfigurationManager.AppSettings["TemplateName"]);
				this.TempData["TemplateName"] = (object)ConfigurationManager.AppSettings["TemplateName"];
				this.TempData.Keep("TemplateName");
			}
			catch
			{
			}
			return (ActionResult)this.View();
		}

		public ActionResult SetUserName(
		  string userName,
		  string userEmail,
		  string mfpModel,
		  string base64)
		{
			SetLanguage.IniciaLinguage(this.Server.MapPath("~/Language/"));
			this.TempData["versio"] = (object)("v" + ConfigurationManager.AppSettings["Version"].ToString());
			this.TempData.Keep("version");
			this.TempData["username"] = (object)userName;
			this.TempData.Keep("username");
			this.TempData["useremail"] = (object)userEmail;
			this.TempData.Keep("useremail");
			this.TempData[nameof(mfpModel)] = (object)mfpModel;
			this.TempData.Keep(nameof(mfpModel));
			this.TempData["SendToServer"] = (object)ConfigurationManager.AppSettings["SendToServer"].ToString().ToLower();
			this.TempData.Keep("SendToServer");
			string str = Encoding.UTF8.GetString(Convert.FromBase64String(base64.Replace("\\r", "").Replace("\\n", "")));
			bool flag = false;
			if (str.Contains("<JobId>"))
				flag = true;
			this.TempData[nameof(base64)] = (object)flag;
			this.TempData.Keep(nameof(base64));
			return (ActionResult)this.RedirectToAction("ScanPage", "Home");
		}

		private string GetHomeDirectory(string username, string ldap)
		{
			string str1 = this.Server.MapPath("~/Logs/");
			if (!Directory.Exists(str1))
				Directory.CreateDirectory(str1);
			string logFolder = Path.Combine(str1, DateTime.Now.ToString("yyyyMMdd") + "_ScanToHome.Log");
			string str2 = "";
			try
			{
				Log_Creator.WriteToLog(logFolder, "Searching for LDAP:" + ldap, "", "");
				System.DirectoryServices.SearchResult one = new DirectorySearcher(ldap)
				{
					Filter = ("samaccountname=" + username)
				}.FindOne();
				Log_Creator.WriteToLog(logFolder, "Searching for:" + username, "LDAP found ", "");
				if (one != null)
				{
					ResultPropertyCollection properties = one.Properties;
					foreach (string propertyName in (IEnumerable)properties.PropertyNames)
					{
						if (propertyName == "homedirectory")
						{
							foreach (object obj in (ReadOnlyCollectionBase)properties[propertyName])
							{
								Log_Creator.WriteToLog(logFolder, "Searching for:" + username, "home directory found ", "");
								str2 = obj.ToString();
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
				Log_Creator.WriteToLog(logFolder, "Searching for:" + username, "home directory not found ", ex.ToString());
			}
			return str2;
		}

		public ActionResult ScanPage()
		{
			EasyXML easyXml1 = new EasyXML();
			foreach (string path in Directory.EnumerateFiles(this.Server.MapPath("~/"), "*.xml").ToList<string>())
			{
				if (path.Contains("XeroxConfig_"))
				{
					string model = this.TempData["mfpModel"].ToString();
					this.TempData["mfpModel"] = (object)model;
					this.TempData.Keep("mfpModel");
					easyXml1 = easyXml1.le_xml(path, model);
				}
			}
			if (SetLanguage.in_lang == null)
				SetLanguage.IniciaLinguage(this.Server.MapPath("~/Language/"));
			if (this.TempData["username"] == null)
				return (ActionResult)this.RedirectToAction("Index", "home");
			string username = this.TempData["username"].ToString();
			this.KeepVariables();
			string str = this.Server.MapPath("~/Logs/");
			if (!Directory.Exists(str))
				Directory.CreateDirectory(str);
			string logFolder = Path.Combine(str, DateTime.Now.ToString("yyyyMMdd") + "_ScanToHome.Log");
			Log_Creator.WriteToLog(logFolder, "Searching for:" + username, "LDAP: " + easyXml1.LDAP + " SearchDirectoryRoot: " + easyXml1.SearchDirectoryRoot, "");
			if (ConfigurationManager.AppSettings["Testes"].ToLower() == "false")
			{
				Log_Creator.WriteToLog(logFolder, "Start Search", "", "");
				easyXml1.homedirectory = this.GetHomeDirectory(username, "LDAP://" + easyXml1.LDAP + "/" + easyXml1.SearchDirectoryRoot);
			}
			else
				easyXml1.homedirectory = ConfigurationManager.AppSettings["Testes"].ToLower();
			easyXml1.homedirectory = easyXml1.homedirectory.Replace("\\", "/");
			if (easyXml1.homedirectory.EndsWith("/"))
			{
				easyXml1.homedirectory += easyXml1.ServerFolder;
			}
			else
			{
				EasyXML easyXml2 = easyXml1;
				easyXml2.homedirectory = easyXml2.homedirectory + "/" + easyXml1.ServerFolder;
			}
			return (ActionResult)this.View((object)easyXml1);
		}

		public ActionResult ScanDone(
		  string ScanDoneuserName,
		  string ScanDonepass,
		  string ScanDonepath,
		  string ScanDoneDocName,
		  string ScanDoneDoctype)
		{
			try
			{
				string str1 = this.Server.MapPath("~/Logs/");
				if (!Directory.Exists(str1))
					Directory.CreateDirectory(str1);
				string str2 = Path.Combine(str1, DateTime.Now.ToString("yyyyMMdd") + "_ScanHome.Log");
				string username = this.TempData["username"].ToString();
				this.KeepVariables();
				EasyXML easyXml = new EasyXML();
				foreach (string path in Directory.EnumerateFiles(this.Server.MapPath("~/"), "*.xml").ToList<string>())
				{
					if (path.Contains("XeroxConfig_"))
					{
						string model = this.TempData["mfpModel"].ToString();
						this.TempData["mfpModel"] = (object)model;
						this.TempData.Keep("mfpModel");
						easyXml = easyXml.le_xml(path, model);
					}
				}
				if (ScanDoneDoctype == "PDFA1b")
					ScanDoneDoctype = "PDF";
				string str3 = Path.Combine(easyXml.Server, easyXml.Share, easyXml.Path, ScanDoneDocName + "." + ScanDoneDoctype).Replace("\\\\\\", "\\").Replace("\\\\", "\\");
				if (!str3.StartsWith("\\\\"))
					str3 = "\\\\" + str3;
				string str4 = str3.Replace(";", "");
				string str5 = Path.Combine(easyXml.Server, easyXml.Share, easyXml.Path, ScanDoneDocName + ".XST").Replace("\\\\\\", "\\").Replace("\\\\", "\\");
				if (!str5.StartsWith("\\\\"))
					str5 = "\\\\" + str5;
				string path1 = str5.Replace(";", "");
				bool flag = false;
				Log_Creator.WriteToLog(str2, username, nameof(ScanDone), "path ficheiro existe: " + str4);
				string str6 = str4;
				string str7 = ScanDonepath;
				if (!str6.StartsWith("\\\\"))
					str6 = "\\\\" + str6;
				string str8 = str7.Replace("/", "\\");
				if (!str8.StartsWith("\\\\"))
					str8 = "\\\\" + str8;
				if (!flag)
				{
					if (ConfigurationManager.AppSettings["SendToServer"].ToLower() == "true")
					{
						NetworkCredential credentials = new NetworkCredential();
						credentials.Password = ScanDonepass;
						credentials.UserName = ScanDoneuserName;
						credentials.Domain = easyXml.UserDomain;
						try
						{
							using (new NetworkConnection(str8, credentials, str2))
							{
								System.IO.File.Copy(str6, Path.Combine(str8, Path.GetFileName(str6)), true);
								Log_Creator.WriteToLog(str2, username, nameof(ScanDone), "File Moved to: " + Path.Combine(str8, Path.GetFileName(str6)));
							}
							Log_Creator.WriteToLog(str2, username, nameof(ScanDone), "Delete files: " + path1 + " and " + str6);
							System.IO.File.Delete(path1);
							System.IO.File.Delete(str6);
						}
						catch (Exception ex)
						{
							Log_Creator.WriteToLog(str2, username, "LDAP", "error moving file: " + ex.ToString());
						}
					}
					Log_Creator.WriteToLog(str2, username, "Scan Home", "OK");
				}
				if (SetLanguage.in_lang == null)
					SetLanguage.IniciaLinguage(this.Server.MapPath("~/Language/"));
				try
				{
					EIPScanTemplate.DeleteTemplate(Log_Creator.GetUserIP(), ConfigurationManager.AppSettings["TemplateName"]);
					this.TempData["TemplateName"] = (object)ConfigurationManager.AppSettings["TemplateName"];
					this.TempData.Keep("TemplateName");
				}
				catch
				{
				}
				return (ActionResult)this.RedirectToAction("Index", "Home");
			}
			catch (Exception ex)
			{
				ex.ToString();
				return (ActionResult)this.RedirectToAction("Index", "Home");
			}
		}

		public static int ExecuteCommand(string command, int timeout)
		{
			Process process = Process.Start(new ProcessStartInfo("cmd.exe", "/C " + command)
			{
				CreateNoWindow = true,
				UseShellExecute = false,
				WorkingDirectory = "C:\\"
			});
			process.WaitForExit(timeout);
			int exitCode = process.ExitCode;
			process.Close();
			return exitCode;
		}

		public void KeepVariables()
		{
			this.TempData["username"] = (object)this.TempData["username"].ToString();
			this.TempData.Keep("username");
			this.TempData["useremail"] = (object)this.TempData["useremail"].ToString();
			this.TempData.Keep("useremail");
			this.TempData["versio"] = (object)this.TempData["versio"].ToString();
			this.TempData.Keep("version");
			this.TempData["SendToServer"] = (object)this.TempData["SendToServer"].ToString();
			this.TempData.Keep("SendToServer");
			this.TempData["base64"] = this.TempData["base64"];
			this.TempData.Keep("base64");
		}
	}
}
