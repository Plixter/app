// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.SetLanguage
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace ScanHomeEIP.Models
{
	public static class SetLanguage
	{
		public static Dictionary<string, string> in_lang;

		public static void IniciaLinguage(string path)
		{
			string str = HttpContext.Current.Request.Headers["Accept-Language"].ToString();
			List<string> list = Directory.EnumerateFiles(path, "*.xml", SearchOption.TopDirectoryOnly).ToList<string>();
			bool flag = false;
			foreach (string path1 in list)
			{
				if (Path.GetFileName(path1).Contains(str.ToUpper()))
				{
					XmlSerializer xmlSerializer = new XmlSerializer(typeof(Language));
					StreamReader streamReader = new StreamReader(path1);
					Language language2 = (Language)xmlSerializer.Deserialize((TextReader)streamReader);
					SetLanguage.in_lang = new Dictionary<string, string>();
					SetLanguage.in_lang.Add("l_send", language2.l_send);
					SetLanguage.in_lang.Add("l_sidedScanning", language2.l_sidedScanning);
					SetLanguage.in_lang.Add("l_orientation", language2.l_orientation);
					SetLanguage.in_lang.Add("l_resolution", language2.l_resolution);
					SetLanguage.in_lang.Add("l_originalSize", language2.l_originalSize);
					SetLanguage.in_lang.Add("l_lightenDarken", language2.l_lightenDarken);
					SetLanguage.in_lang.Add("l_contrast", language2.l_contrast);
					SetLanguage.in_lang.Add("l_backSuppression", language2.l_backSuppression);
					SetLanguage.in_lang.Add("l_reset", language2.l_reset);
					SetLanguage.in_lang.Add("l_name", language2.l_name);
					SetLanguage.in_lang.Add("TWO_SIDED", language2.c_twosided);
					SetLanguage.in_lang.Add("ONE_SIDED", language2.c_oneside);
					SetLanguage.in_lang.Add("PORTRAIT", language2.c_portrait);
					SetLanguage.in_lang.Add("LANDSCAPE", language2.c_landscape);
					SetLanguage.in_lang.Add("RES_LOWEST", language2.c_low);
					SetLanguage.in_lang.Add("RES_BEST", language2.c_medium);
					SetLanguage.in_lang.Add("RES_HIGHEST", language2.c_high);
					SetLanguage.in_lang.Add("Auto", language2.c_auto);
					SetLanguage.in_lang.Add("FullColor", language2.c_FullColor);
					SetLanguage.in_lang.Add("Grayscale", language2.c_Grayscale);
					SetLanguage.in_lang.Add("BlackAndWhite", language2.c_BlackAndWhite);
					SetLanguage.in_lang.Add("scantype", language2.l_ScanType);
					SetLanguage.in_lang.Add("Photo", language2.Photo);
					SetLanguage.in_lang.Add("Text", language2.Text);
					SetLanguage.in_lang.Add("PhotoAndText", language2.PhotoAndText);
					SetLanguage.in_lang.Add("Map", language2.Map);
					SetLanguage.in_lang.Add("NewspaperOrMagazine", language2.NewspaperOrMagazine);
					SetLanguage.in_lang.Add("l_exittext", language2.l_exittext);
					SetLanguage.in_lang.Add("l_exit", language2.l_exit);
					SetLanguage.in_lang.Add("l_cancel", language2.l_cancel);
					SetLanguage.in_lang.Add("l_color", language2.l_color);
					SetLanguage.in_lang.Add("l_queue_erro1", language2.l_queue_erro1);
					SetLanguage.in_lang.Add("l_queue_erro2", language2.l_queue_erro2);
					SetLanguage.in_lang.Add("Scanning", language2.Scanning);
					SetLanguage.in_lang.Add("Complete", language2.Complete);
					streamReader.Close();
					flag = true;
					break;
				}
			}
			if (flag)
				return;
			foreach (string path1 in list)
			{
				if (Path.GetFileName(path1).Contains("EN-US"))
				{
					XmlSerializer xmlSerializer = new XmlSerializer(typeof(Language));
					StreamReader streamReader = new StreamReader(path1);
					Language language1 = new Language();
					Language language2 = (Language)xmlSerializer.Deserialize((TextReader)streamReader);
					SetLanguage.in_lang = new Dictionary<string, string>();
					SetLanguage.in_lang.Add("l_send", language2.l_send);
					SetLanguage.in_lang.Add("l_sidedScanning", language2.l_sidedScanning);
					SetLanguage.in_lang.Add("l_orientation", language2.l_orientation);
					SetLanguage.in_lang.Add("l_resolution", language2.l_resolution);
					SetLanguage.in_lang.Add("l_originalSize", language2.l_originalSize);
					SetLanguage.in_lang.Add("l_lightenDarken", language2.l_lightenDarken);
					SetLanguage.in_lang.Add("l_contrast", language2.l_contrast);
					SetLanguage.in_lang.Add("l_backSuppression", language2.l_backSuppression);
					SetLanguage.in_lang.Add("l_reset", language2.l_reset);
					SetLanguage.in_lang.Add("l_name", language2.l_name);
					SetLanguage.in_lang.Add("TWO_SIDED", language2.c_twosided);
					SetLanguage.in_lang.Add("ONE_SIDED", language2.c_oneside);
					SetLanguage.in_lang.Add("PORTRAIT", language2.c_portrait);
					SetLanguage.in_lang.Add("LANDSCAPE", language2.c_landscape);
					SetLanguage.in_lang.Add("RES_LOWEST", language2.c_low);
					SetLanguage.in_lang.Add("RES_BEST", language2.c_medium);
					SetLanguage.in_lang.Add("RES_HIGHEST", language2.c_high);
					SetLanguage.in_lang.Add("Auto", language2.c_auto);
					SetLanguage.in_lang.Add("FullColor", language2.c_FullColor);
					SetLanguage.in_lang.Add("Grayscale", language2.c_Grayscale);
					SetLanguage.in_lang.Add("BlackAndWhite", language2.c_BlackAndWhite);
					SetLanguage.in_lang.Add("scantype", language2.l_ScanType);
					SetLanguage.in_lang.Add("Photo", language2.Photo);
					SetLanguage.in_lang.Add("Text", language2.Text);
					SetLanguage.in_lang.Add("PhotoAndText", language2.PhotoAndText);
					SetLanguage.in_lang.Add("Map", language2.Map);
					SetLanguage.in_lang.Add("NewspaperOrMagazine", language2.NewspaperOrMagazine);
					SetLanguage.in_lang.Add("l_exittext", language2.l_exittext);
					SetLanguage.in_lang.Add("l_exit", language2.l_exit);
					SetLanguage.in_lang.Add("l_cancel", language2.l_cancel);
					SetLanguage.in_lang.Add("l_color", language2.l_color);
					SetLanguage.in_lang.Add("l_queue_erro1", language2.l_queue_erro1);
					SetLanguage.in_lang.Add("l_queue_erro2", language2.l_queue_erro2);
					SetLanguage.in_lang.Add("Scanning", language2.Scanning);
					SetLanguage.in_lang.Add("Complete", language2.Complete);
					streamReader.Close();
					break;
				}
			}
		}
	}
}
