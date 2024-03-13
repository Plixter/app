using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace Scan2DRW.Models
{

    //searcher.PropertiesToLoad.Add("cn"); //username                       
    //                searcher.PropertiesToLoad.Add("mail");//mail (trocar para mail)
    //                searcher.PropertiesToLoad.Add("givenName");//First 
    //                searcher.PropertiesToLoad.Add("sn");//last name
    //                //searcher.PropertiesToLoad.Add("UserAccountControl");//acive acount
    //                searcher.PropertiesToLoad.Add("memberOf");//acive acount

    public class adinfo
    {
       
        public string username { get; set; }
        public string mail { get; set; }
        public string givenName { get; set; }
        public string sn { get; set; }
        public string memberOf { get; set; }
        public List<string> l_memberOf { get; set; }
        public List<string> lista_groups { get; set; }
        

    }
}

