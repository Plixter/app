// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Models.Language
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using System.Xml.Serialization;

namespace ScanHomeEIP.Models
{
	[XmlRoot(IsNullable = false, Namespace = "")]
	[XmlType(AnonymousType = true)]
	public class Language
	{
		private string l_sendField;
		private string l_sidedScanningField;
		private string l_orientationField;
		private string l_resolutionField;
		private string l_originalSizeField;
		private string l_lightenDarkenField;
		private string l_contrastField;
		private string l_backSuppressionField;
		private string l_resetField;
		private string l_nameField;
		private string c_twosidedField;
		private string c_onesideField;
		private string c_portraitField;
		private string c_landscapeField;
		private string c_lowField;
		private string c_mediumField;
		private string c_highField;
		private string l_faxnumberField;
		private string l_colorField;
		private string c_autoField;
		private string c_FullColorField;
		private string c_GrayscaleField;
		private string c_BlackAndWhiteField;
		private string l_ScanTypeField;
		private string PhotoField;
		private string TextField;
		private string PhotoAndTextField;
		private string MapField;
		private string NewspaperOrMagazineField;
		private string l_exittextField;
		private string l_cancelField;
		private string l_exitField;
		private string l_queue_erro1Field;
		private string l_queue_erro2Field;
		private string ScanningField;
		private string CompleteField;
		private string Add_destinatarioField;

        public string l_queue_erro1
		{
			get => this.l_queue_erro1Field;
			set => this.l_queue_erro1Field = value;
		}

		public string l_queue_erro2
		{
			get => this.l_queue_erro2Field;
			set => this.l_queue_erro2Field = value;
		}

		public string l_exittext
		{
			get => this.l_exittextField;
			set => this.l_exittextField = value;
		}

		public string l_cancel
		{
			get => this.l_cancelField;
			set => this.l_cancelField = value;
		}

		public string l_exit
		{
			get => this.l_exitField;
			set => this.l_exitField = value;
		}

		public string l_ScanType
		{
			get => this.l_ScanTypeField;
			set => this.l_ScanTypeField = value;
		}

		public string Photo
		{
			get => this.PhotoField;
			set => this.PhotoField = value;
		}

		public string Text
		{
			get => this.TextField;
			set => this.TextField = value;
		}

		public string PhotoAndText
		{
			get => this.PhotoAndTextField;
			set => this.PhotoAndTextField = value;
		}

		public string Map
		{
			get => this.MapField;
			set => this.MapField = value;
		}

		public string NewspaperOrMagazine
		{
			get => this.NewspaperOrMagazineField;
			set => this.NewspaperOrMagazineField = value;
		}

		public string c_auto
		{
			get => this.c_autoField;
			set => this.c_autoField = value;
		}

		public string c_FullColor
		{
			get => this.c_FullColorField;
			set => this.c_FullColorField = value;
		}

		public string c_Grayscale
		{
			get => this.c_GrayscaleField;
			set => this.c_GrayscaleField = value;
		}

		public string c_BlackAndWhite
		{
			get => this.c_BlackAndWhiteField;
			set => this.c_BlackAndWhiteField = value;
		}

		public string l_color
		{
			get => this.l_colorField;
			set => this.l_colorField = value;
		}

		public string l_faxnumber
		{
			get => this.l_faxnumberField;
			set => this.l_faxnumberField = value;
		}

		public string l_send
		{
			get => this.l_sendField;
			set => this.l_sendField = value;
		}

		public string l_sidedScanning
		{
			get => this.l_sidedScanningField;
			set => this.l_sidedScanningField = value;
		}

		public string l_orientation
		{
			get => this.l_orientationField;
			set => this.l_orientationField = value;
		}

		public string l_resolution
		{
			get => this.l_resolutionField;
			set => this.l_resolutionField = value;
		}

		public string l_originalSize
		{
			get => this.l_originalSizeField;
			set => this.l_originalSizeField = value;
		}

		public string l_lightenDarken
		{
			get => this.l_lightenDarkenField;
			set => this.l_lightenDarkenField = value;
		}

		public string l_contrast
		{
			get => this.l_contrastField;
			set => this.l_contrastField = value;
		}

		public string l_backSuppression
		{
			get => this.l_backSuppressionField;
			set => this.l_backSuppressionField = value;
		}

		public string l_reset
		{
			get => this.l_resetField;
			set => this.l_resetField = value;
		}

		public string l_name
		{
			get => this.l_nameField;
			set => this.l_nameField = value;
		}

		public string c_twosided
		{
			get => this.c_twosidedField;
			set => this.c_twosidedField = value;
		}

		public string c_oneside
		{
			get => this.c_onesideField;
			set => this.c_onesideField = value;
		}

		public string c_portrait
		{
			get => this.c_portraitField;
			set => this.c_portraitField = value;
		}

		public string c_landscape
		{
			get => this.c_landscapeField;
			set => this.c_landscapeField = value;
		}

		public string c_low
		{
			get => this.c_lowField;
			set => this.c_lowField = value;
		}

		public string c_medium
		{
			get => this.c_mediumField;
			set => this.c_mediumField = value;
		}

		public string c_high
		{
			get => this.c_highField;
			set => this.c_highField = value;
		}

		public string Scanning
		{
			get => this.ScanningField;
			set => this.ScanningField = value;
		}

		public string Complete
		{
			get => this.CompleteField;
			set => this.CompleteField = value;
		}

		public string Add_destinatario
		{
			get => this.Add_destinatarioField;
			set => this.Add_destinatarioField = value;
		}
	}
}
