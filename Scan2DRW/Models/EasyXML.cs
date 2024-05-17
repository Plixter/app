// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.EasyXML
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using Scan2DRW.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.DirectoryServices;
//using System.DirectoryServices.AccountManagement;
using System.IO;
using System.Security.Principal;
using System.Xml.Serialization;


namespace ScanHomeEIP.Models
{
	public class EasyXML
	{
		public List<string> list_ScanMode = new List<string>();
		public List<string> list_BlankPageRemoval = new List<string>();
		public List<string> list_BackSupression = new List<string>();
		public List<string> list_ScanType = new List<string>();
		public List<string> list_Color = new List<string>();
		public List<string> list_Orientation = new List<string>();
		public List<string> list_MediaSize = new List<string>();
		public List<string> list_FileType = new List<string>();
		public List<string> list_Resolution = new List<string>();
		public List<string> list_Groups = new List<string>();
		public List<string> list_Mails = new List<string>();
		public List<string> list_Unique_Groups = new List<string>();

        public Dictionary<string, adinfo> list_ad_Groups = new Dictionary<string, adinfo>(); 

		//O que envia depois do scan para a view com os dados anteriores
		public List<string> list_previous_emails = new List<string>();
		public string message_previous {  get; set; }
        public string About_previous { get; set; }
        public string NomeDoc_previous { get; set; }



        [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Application name cannot be null, or contain any special char.")]
		[DisplayName("App Name")]
		[Required]
		public string NomeApp { get; set; }
		

		[Required(ErrorMessage = "Server Fax domain name cannot be null.")]
		[DisplayName("Server Fax domain name")]
		//Parte referente ao email os proximos 6 construtores
		//public string assunto { get; set; } // assunto
		//public string envia { get; set; } //quem evia
		//public string corpo { get; set; } // mensagem
		//public int nremailsSend { get; set; } //nr de emails para enviar
		//public List<string> mailSend { get; set; } //lista emails enviar
		//public List<String> mailCC { get; set; } //lista emails em CC
		public string InputGetMail {  get; set; }
        public string ReponseEmail { get; set; }

        public string Server { get; set; }

		public string UserName { get; set; }

		public string UserPass { get; set; }

		public string Share { get; set; }

		public string Path { get; set; }

		public string ServerFolder { get; set; }

		[DisplayName("Default Email")]
		[Required(ErrorMessage = "Default Email cannot be null.")]
		public string email { get; set; }

		public string LDAP { get; set; }

		public string homedirectory { get; set; }

		public string docName { get; set; }

		public string UserDomain { get; set; }

		[DisplayName("Search Directory Root")]
		public string SearchDirectoryRoot { get; set; }

		[DisplayName("2 Side Scanning")]
		public string ScanMode { get; set; }

		public string l_ScanMode { get; set; }

		[DisplayName("BlankPageRemoval")]
		public string BlankPageRemoval { get; set; }

		public bool b_BlankPageRemoval { get; set; }

		[DisplayName("Back. Supression")]
		public string BackSupression { get; set; }

		public bool b_BackSupression { get; set; }

		[DisplayName("Original Type")]
		public string ScanType { get; set; }

		public string l_ScanType { get; set; }

		[DisplayName("Color")]
		public string Color { get; set; }

		public string l_Color { get; set; }

		[DisplayName("Orientation")]
		public string Orientation { get; set; }

		public string l_Orientation { get; set; }

		[DisplayName("Original Size")]
		public string MediaSize { get; set; }

		[DisplayName("FileType")]
		public string FileType { get; set; }

		[DisplayName("EdgeErase")]
		public string EdgeErase { get; set; }

		[DisplayName("Resolution")]
		public string Resolution { get; set; }

		public string l_Resolution { get; set; }

		[DisplayName("Compression Quality")]
		public string CompressionQuality { get; set; }

		[DisplayName("Contrast")]
		public string Contrast { get; set; }

		[DisplayName("Lighten/Darken")]
		public string Darkness { get; set; }

		[DisplayName("Sharpness")]
		public string Sharpness { get; set; }

		[DisplayName("Saturation")]
		public string Saturation { get; set; }

		public EasyXML le_xml(string path, string model)
		{
			EasyXML easyXml = new EasyXML();
			string path1 = path;
			if (!File.Exists(path1))
				return (EasyXML)null;
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(Application));
			StreamReader streamReader = new StreamReader(path1);
			Application application1 = new Application();
			Application application2 = (Application)xmlSerializer.Deserialize((TextReader)streamReader);
			easyXml.Server = application2.Server;
			easyXml.UserName = application2.UserName;
			easyXml.UserPass = application2.UserPass;
			easyXml.Share = application2.Share;
			easyXml.Path = application2.Path;
			easyXml.email = application2.Email;
			string scanMode = application2.scanMode;
			easyXml.ScanMode = !(application2.scanMode == "TWO_SIDED") ? "OneSided" : "TwoSided";
			string scanType = application2.scanType;
			if (scanType == "AUTO")
				easyXml.ScanType = "Auto";
			else if (scanType == "TEXT")
				easyXml.ScanType = "Text";
			else if (scanType == "PHOTO")
				easyXml.ScanType = "Photo";
			else if (scanType == "MIXED")
				easyXml.ScanType = "PhotoAndText";
			easyXml.Orientation = application2.orientation;
			easyXml.CompressionQuality = application2.compressionQuality;
			easyXml.Contrast = application2.contrast;
			easyXml.Darkness = application2.darkness;
			easyXml.Sharpness = application2.sharpness;
			easyXml.Saturation = application2.saturation;
			string[] strArray = model.Split(" "[0]);
			easyXml.MediaSize = strArray[1].Length != 5 ? (strArray[1].Length != 4 ? application2.mediaSize : "ISO_A4SEF") : "ISO_A4LEF";
			easyXml.FileType = application2.fileType;
			if (application2.color == "AUTO")
				easyXml.Color = "Auto";
			else if (application2.color == "BLACK_AND_WHITE")
				easyXml.Color = "BlackAndWhite";
			else if (application2.color == "GRAYSCALE")
				easyXml.Color = "Grayscale";
			else if (application2.color == "FULL_COLOR")
				easyXml.Color = "FullColor";
			easyXml.EdgeErase = application2.edgeErase;
			easyXml.Resolution = application2.resolution;
			easyXml.BlankPageRemoval = application2.BlankPageRemoval;
			easyXml.b_BlankPageRemoval = easyXml.BlankPageRemoval == "OMIT_ALL_BLANK_PAGES";
			easyXml.BackSupression = application2.BackSupression;
			easyXml.b_BackSupression = bool.Parse(application2.BackSupression);
			easyXml.LDAP = application2.LDAPPath;
			easyXml.SearchDirectoryRoot = application2.SearchDirectoryRoot;
			easyXml.docName = application2.docName;
			easyXml.UserDomain = application2.UserDomain;
			easyXml.ServerFolder = application2.ServerFolder;
			easyXml.l_Color = SetLanguage.in_lang[easyXml.Color];
			easyXml.l_ScanType = SetLanguage.in_lang[easyXml.ScanType];
			easyXml.l_ScanMode = SetLanguage.in_lang[scanMode];
			easyXml.l_Orientation = SetLanguage.in_lang[application2.orientation];
			easyXml.l_Resolution = SetLanguage.in_lang[application2.resolution];
			streamReader.Close();

			
			return easyXml;
		}


	}
}
