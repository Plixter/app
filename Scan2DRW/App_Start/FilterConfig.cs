﻿using System.Web;
using System.Web.Mvc;

namespace Scan2DRW
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}
	}
}
