// Decompiled with JetBrains decompiler
// Type: ScanHomeEIP.Controllers.HomeController
// Assembly: ScanHomeEIP, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 0C42E1EB-DAFE-4138-962A-8B9D50937472
// Assembly location: C:\Users\50540533\Documents\Visual Studio 2019\Projects\Scan2HomeWebSite\Scan2HomeApp\Bin\ScanHomeEIP.dll

using Scan2DRW.Models;
using ScanHomeEIP.Models;
using System;
using System.Net;
using System.Net.Mail;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.DirectoryServices.ActiveDirectory;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Mvc;
using WebGrease.Css.Ast.Selectors;
using Microsoft.Ajax.Utilities;
using System.Web.Razor.Parser.SyntaxTree;

namespace ScanHomeEIP.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult teste(string txt) => (ActionResult)this.View();
        Dictionary<string, adinfo> ad_dic = new Dictionary<string, adinfo>();
        string caminhoLDAP = @"OU=Users,OU=PRT,DC=eu,DC=xerox,DC=net";
        //"LDAP://OU=Users,OU=PRT,DC=eu,DC=xerox,DC=net" 
        //string[] filePaths = Directory.GetFiles(@"C:\inetpub\ftproot\scan", "*.pdf");
        string FolderPath = "C:\\inetpub\\ftproot\\scan\\";
        int flag = 0;
        public ActionResult Index()
        {
            escrevelog("index");
            // GetAdGroupsV2();
            //GetAdGroups();
            GetAdGroups();
            //GetEmailsByGroup("PRT-CVG-DOC1-SUPPORT");

            try
            {
                EIPScanTemplate.DeleteTemplate(Log_Creator.GetUserIP(), ConfigurationManager.AppSettings["TemplateName"]);
                this.TempData["TemplateName"] = (object)ConfigurationManager.AppSettings["TemplateName"];
                this.TempData.Keep("TemplateName");
            }
            catch
            {
            }

            //return (ActionResult)this.View((object)easyXml1);
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
            //this.TempData["SendToServer"] = (object)ConfigurationManager.AppSettings["SendToServer"].ToString().ToLower();
            //this.TempData.Keep("SendToServer");
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

            easyXml1.message_previous = "lol"; //TESTE JOAO B

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
            GetAdGroups();
            escrevelog("GetAdGroups");
            //AdListGroups();

            easyXml1.list_ad_Groups = ad_dic;
            /*easyXml1.message_previous = "lol";*/ //ACRESCENTADO AGORA

            //easyXml1.list_Unique_Groups = ad_dic
            //.Where(item => item.Value.memberOf != null)
            //    .SelectMany(item => item.Value.memberOf.Select(member => member.ToString()))
            //    .Distinct()
            //    .ToList();
            easyXml1.list_Unique_Groups = list_Groups_Temp; // list of all groups
            easyXml1.list_Mails = new List<string>();

            foreach (var item in ad_dic)
            {
                easyXml1.list_Mails.Add(item.Value.mail);
                if (item.Value.mail.Contains('@'))//verifica se é um email
                {
                    easyXml1.list_Mails.Add(item.Value.username);
                }
            }

            foreach (var item in easyXml1.list_Unique_Groups)
            {
                easyXml1.list_Mails.Add(item);
            }

            return (ActionResult)this.View((object)easyXml1);
        }
        //public ActionResult GetEmail(string InputGetMail)
        //{
        //    var erro = "Nenhum email associado";
        //    var lista_ad = ad_dic;
        //    foreach (var item in ad_dic)
        //    {
        //        if (item.Value.username == InputGetMail)
        //        {
        //            var email = item.Value.mail;
        //            var mod = new EasyXML() { ReponseEmail = email };

        //            return View(mod);
        //        }



        //    }
        //    return View(erro);
        //}


        public ActionResult ScanDone(
          string ScanDonename)
        {
            escrevelog("ScanDone " + ScanDonename);
            ActionResult result;

            //EasyXML easyXml2 = new EasyXML();

            //try
            //{
            //    Thread templateThread = new Thread(new ParameterizedThreadStart(TemplateWorker));
            //    templateThread.Start(ScanDonename);
            //}
            //finally
            //{
            //result = (ActionResult)this.RedirectToAction("Index", "Home");
            //}
            //return result;
            //return (ActionResult)this.RedirectToAction("ScanPage", "Home");

            return (ActionResult)this.RedirectToAction("Index", "Home");
        }




        private void TemplateWorker(object data)
        {
            string scanFolder = ConfigurationManager.AppSettings["ScanFolder"];
            string fileExt = ConfigurationManager.AppSettings["FileExt"];
            string scanDoneFilename = (string)data + fileExt;
            string scanDonePath = Path.Combine(scanFolder, scanDoneFilename);
            string scansDir = Path.Combine(scanFolder, "Scans");
            string addedumPath = ConfigurationManager.AppSettings["TemplateAddedum"];
            string templateFilename = (string)data + ".XST";
            string templateFilepath = Path.Combine(scanFolder, templateFilename);

            escrevelog("fileExt " + fileExt);
            escrevelog("scanDoneFilename " + (string)data + fileExt);
            escrevelog("scanDonePath     " + Path.Combine(scanFolder, scanDoneFilename));
            escrevelog("scansDir         " + Path.Combine(scanFolder, "Scans"));
            escrevelog("addedumPath      " + ConfigurationManager.AppSettings["TemplateAddedum"]);
            escrevelog("templateFilename " + (string)data + ".XST");
            escrevelog("templateFilepath " + Path.Combine(scanFolder, templateFilename));

            try
            {
                if (System.IO.File.Exists(templateFilepath))
                {
                    string[] addedumLines = System.IO.File.ReadAllLines(addedumPath);
                    System.IO.File.AppendAllLines(templateFilepath, addedumLines);

                    if (!Directory.Exists(scansDir))
                    {
                        Directory.CreateDirectory(scansDir);
                    }

                    escrevelog("copy " + Path.Combine(scansDir, scanDoneFilename));
                    escrevelog("copy " + Path.Combine(scansDir, templateFilename));

                    System.IO.File.Copy(scanDonePath, Path.Combine(scansDir, scanDoneFilename));
                    System.IO.File.Copy(templateFilepath, Path.Combine(scansDir, templateFilename));
                    System.IO.File.Delete(scanDonePath);
                    System.IO.File.Delete(templateFilepath);


                }
            }
            catch (Exception ex) { Console.Error.WriteLine("Error: " + ex.Message); }
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

        // Function to find PDF files in a folder and return their full paths

        public void escrevelog(string message)
        {
            using (var item = new StreamWriter(@"C:\inetpub\ftproot\scan\logs.txt", true))
            {
                DateTime serverTime = DateTime.Now;
                string log = serverTime + " -- " + message;
                item.WriteLine(log);
            }
        }


        [HttpPost]
        public ActionResult SendEmailWithAttachments(string subject, string body, string recipientsCC, string about, string Grupo, string nomeDoc, string mailCC, string typeDoc, string userNomeDoc, string color, string faces)
        {
            if (typeDoc == "XSM_TIFF_V6")
            {
                typeDoc = "tif";
            }
            if (typeDoc == "JfifJpeg")
            {
                typeDoc = "jpeg";
            }
            if (typeDoc == "XPS")
            {
                typeDoc = "xps";
            }
            if (typeDoc == "PDF")
            {
                typeDoc = "pdf";
            }
            if (typeDoc == "SPDF")
            {
                typeDoc = "pdf";
            }
            escrevelog("//////////////////////////////////////////////////");
            escrevelog(nomeDoc);
            escrevelog(subject);
            escrevelog(body);
            escrevelog("TO-----------" + recipientsCC);
            escrevelog(about);
            escrevelog("CC-----------" + mailCC);
            escrevelog(typeDoc);
            escrevelog("color digitalização--" + color);
            escrevelog("numero de faces a digitalizar--" + faces);

            //se o email tiver o email do user tenho de mandar para o frontend uma flag para não o reproduzir no ecrã

            TempData["nomeDocantigo"] = userNomeDoc;
            TempData.Keep("nomeDocantigo");
            TempData["corpoAntigo"] = body;
            TempData.Keep("corpoAntigo");
            TempData["subject_antigo"] = subject;
            TempData.Keep("subject_antigo");
            TempData["destino_antigo"] = recipientsCC;
            TempData.Keep("destino_antigo");
            TempData["emailsCC"] = mailCC;
            TempData.Keep("emailsCC");
            TempData["typeDoc"] = typeDoc;
            TempData.Keep("typeDoc");
            TempData["color"] = color;
            TempData.Keep("color");
            TempData["faces"] = faces;
            TempData.Keep("faces");

            //TempData.Keep("subject"); //VER SE RESOLVEU
            //TempData.Keep("body");
            //TempData.Keep("about");
            //TempData.Keep("typeDoc");

            Thread.Sleep(10000); // necessário para o documento existir na pasta
            //se o parametro do grupo for preenchido, o nome do grupo vai para o GetEmailsByGroup(nomegrupo) para devolver os emails
            if (Grupo != null && !string.IsNullOrEmpty(Grupo))
            {
                escrevelog("entrei no fim");
                escrevelog("nome do grupo" + Grupo);
                GetEmailsByGroup(Grupo);
                escrevelog("Saí do GetEmailsByGroup");
                //if (list_emails_group) { escrevelog("list_final_group não contem o grupo"); }
                //foreach(var lol in list_emails_group) { escrevelog(lol); }

                foreach (var item in list_emails_group)
                {
                    escrevelog("email do grupo" + item);
                    recipientsCC += item + ",";
                }

            }
            var flagNomeDoc = false;
            if (!string.IsNullOrEmpty(userNomeDoc))
            {
                flagNomeDoc = true;
                if (System.IO.File.Exists(@"C:\inetpub\ftproot\scan\" + userNomeDoc + "." + typeDoc))
                {
                    System.IO.File.Delete(@"C:\inetpub\ftproot\scan\" + userNomeDoc + "." + typeDoc);
                }
                System.IO.File.Move(@"C:\inetpub\ftproot\scan\" + nomeDoc + "." + typeDoc, @"C:\inetpub\ftproot\scan\" + userNomeDoc + "." + typeDoc);
            }
            else
            {
                if (System.IO.File.Exists(@"C:\inetpub\ftproot\scan\" + "Digitalizado em uma multifuncional Xerox" + "." + typeDoc))
                {
                    System.IO.File.Delete(@"C:\inetpub\ftproot\scan\" + "Digitalizado em uma multifuncional Xerox" + "." + typeDoc);
                }
                System.IO.File.Move(@"C:\inetpub\ftproot\scan\" + nomeDoc + "." + typeDoc, @"C:\inetpub\ftproot\scan\" + "Digitalizado em uma multifuncional Xerox" + "." + typeDoc);

            }

            if (string.IsNullOrEmpty(subject))
            {
                subject = "Digitalizado de uma impressora multifuncional da Xerox";
            }
            if (string.IsNullOrEmpty(body))
            {
                body = "Please open the attached document. It was sent to you using a Xerox multifunction printer";
            }
            //var formData = Request.Form;
            // Retrieve your SMTP server credentials from a secure location
            var smtpUsername = "";
            var smtpPassword = "";

            // Configure your SMTP server
            var smtpClient = new SmtpClient("forwarder.mail.xerox.com")
            {
                Port = 25,
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = false,
            };

            string usn = TempData["username"].ToString();
            TempData["username"] = usn;
            //this.TempData.Keep("username");
            string sender = "";
            //sender = recipientsCC;
            //if (usn != null && !string.IsNullOrEmpty(usn))
            //{
            //    sender = usn;

            //}
            //else
            //{

            //    sender = usn;

            //}

            sender += usn.Trim();


            // Create a MailMessage
            var mailMessage = new MailMessage
            {
                From = new MailAddress(sender), //sender as from address
                Subject = subject,
                Body = body,
                IsBodyHtml = true,  // Set to true if you want to send HTML-formatted email
            };

            // Add recipients (you can add multiple recipients)
            if (recipientsCC != null)
            {
                var recipientEmails = recipientsCC.Split(','); // assuming recipientsCC are comma-separated

                // Add CC recipients
                foreach (var recipient in recipientEmails)
                {
                    var trimmedRecipient = recipient.Trim();
                    if (!string.IsNullOrEmpty(trimmedRecipient))
                    {
                        escrevelog("Email para enviar --" + trimmedRecipient );
                        mailMessage.To.Add(trimmedRecipient);
                    }
                }

            }


            if (mailCC != null)
            {
                escrevelog(mailCC);
                var CCmail = mailCC.Split(','); //assuming mailCC are comma-separated
                foreach (var cc in CCmail)
                {
                    var trimmedCC = cc.Trim();
                    //if (trimmedCC.StartsWith(","))
                    //{
                    //    trimmedCC = trimmedCC.Substring(1);
                    //    escrevelog(trimmedCC + "sem o 1 ");
                    //}
                    if (!string.IsNullOrEmpty(trimmedCC))
                    {
                        mailMessage.CC.Add(trimmedCC);

                    }
                }
            }


            string[] filePaths;
            bool flagmail = false;
            if (flagNomeDoc == false)
            {
                filePaths = Directory.GetFiles(@"C:\inetpub\ftproot\scan\", "Digitalizado em uma multifuncional Xerox" + "." + typeDoc);
                escrevelog(typeDoc + " -----tipo de doc");
                escrevelog(nomeDoc + " -----NOME NA MAQUINA DO DOC");
                //string[] filexst = Directory.GetFiles(@"C:\inetpub\ftproot\scan", "*.XST");



                foreach (var filePath in filePaths)
                {
                    var attachment = new Attachment(filePath);
                    escrevelog(filePath);


                    mailMessage.Attachments.Add(attachment);
                    if (System.IO.File.Exists(filePath))
                    {
                        flagmail = true;
                    }
                }
            }
            else
            {
                filePaths = Directory.GetFiles(@"C:\inetpub\ftproot\scan\", userNomeDoc + "." + typeDoc);
                escrevelog(typeDoc + "   tipo de doc");
                escrevelog(userNomeDoc + "nome do user");
                //string[] filexst = Directory.GetFiles(@"C:\inetpub\ftproot\scan", "*.XST");



                foreach (var filePath in filePaths)
                {
                    var attachment = new Attachment(filePath);
                    escrevelog(filePath);


                    mailMessage.Attachments.Add(attachment);
                    if (System.IO.File.Exists(filePath))
                    {
                        flagmail = true;
                    }
                }
            }

            //var attachment = new Attachment(attachmentPath);
            //mailMessage.Attachments.Add(attachment);

            // Add information about the email in the body
            mailMessage.Body += about;

            // Send the email
            if (mailMessage.To.Count > 0)
            {
                // Send the email
                if (flagmail == true)
                {

                    smtpClient.Send(mailMessage);
                    foreach (var attachment in mailMessage.Attachments)
                    {
                        escrevelog("dispose " + attachment);
                        attachment.Dispose();
                    }
                    //foreach (var filePath in filePaths)
                    //{
                    //    var attachment = new Attachment(filePath);
                    //    mailMessage.Attachments.Add(attachment);
                    //}

                    //foreach (var item in filePaths)
                    //{
                    //    escrevelog("apagar " + item);
                    //    System.IO.File.Delete(item);

                    //}


                    escrevelog("apagar " + nomeDoc + "." + typeDoc);
                    //var pathcompleto = FolderPath + nomeDoc + ".pdf";
                    if (flagNomeDoc)
                    {
                        System.IO.File.Delete(FolderPath + nomeDoc + ".XST");
                        System.IO.File.Delete(FolderPath + userNomeDoc + "." + typeDoc);
                    }
                    else
                    {
                        System.IO.File.Delete(FolderPath + "Digitalizado em uma multifuncional Xerox" + "." + typeDoc);
                        System.IO.File.Delete(FolderPath + nomeDoc + ".XST");

                    }
                    //System.IO.File.Delete(FolderPath + "Digitalizado em uma multifuncional Xerox" + "." + typeDoc);
                    //System.IO.File.Delete(FolderPath + nomeDoc + ".XST");
                    //System.IO.File.Delete(FolderPath + userNomeDoc + "." + typeDoc);


                }



                //foreach (var template in filexst)
                //{
                //    System.IO.File.Delete(template);
                //}
                return Content("Email with attachments sent successfully!");

            }
            else
            {
                foreach (var attachment in mailMessage.Attachments)
                {
                    attachment.Dispose();
                }

                return Content("No recipients specified. Email not sent.");

            }
            // Dispose of the attachment



        }


        public void KeepVariables()
        {

            this.TempData["username"] = (object)this.TempData["username"].ToString();
            this.TempData.Keep("username");
            this.TempData["useremail"] = (object)this.TempData["useremail"].ToString();
            this.TempData.Keep("useremail");
            this.TempData["versio"] = (object)this.TempData["versio"].ToString();
            this.TempData.Keep("version");
            //this.TempData["SendToServer"] = (object)this.TempData["SendToServer"].ToString();
            //this.TempData.Keep("SendToServer");
            this.TempData["base64"] = this.TempData["base64"];
            this.TempData.Keep("base64");

            ///////////////////////////////////////////////////
            //this.TempData["subject"] = (object)this.TempData["subject"].ToString();
            //this.TempData.Keep("subject");
            //this.TempData["body"] = (object)this.TempData["body"].ToString();
            //this.TempData.Keep("body");
            //this.TempData["about"] = (object)this.TempData["about"].ToString();
            //this.TempData.Keep("about");
            //this.TempData["typeDoc"] = (object)this.TempData["typeDoc"].ToString();
            //this.TempData.Keep("typeDoc");

            //TempData.Keep("subject"); //VER SE RESOLVEU
            //TempData.Keep("body");
            //TempData.Keep("about");
            //TempData.Keep("typeDoc");
        }
        //CODIGO DA AD

        List<String> list_emails_group = new List<String>();
        public void GetEmailsByGroup(string groupName)
        {
            escrevelog("entrei no GetEmailsByGroup");
            GetAdGroups();
            escrevelog("saí do GetAdGroups() ");
            //escrevelog("list_emails_group");
            //foreach (var group in list_emails_group) { escrevelog(group.ToString()); }

            int count = 0;
            groupName = groupName.Replace(",", "");
            if (list_Groups_Temp.Contains(groupName))
            {
                escrevelog("existe grupo");

                
                List<string> lista_final_emails = new List<string>();

                foreach (var person in ad_dic)
                {
                    foreach (var inGroup in person.Value.lista_groups)
                    {
                        if (groupName == inGroup)
                        {
                            count++;
                            lista_final_emails.Add(person.Value.mail);
                            //if (lista_final_emails.Count == 0)
                            //{
                            //    lista_final_emails.Add(person.Value.mail);
                            //}
                            //if (!lista_final_emails.Contains(person.Value.mail))
                            //{
                            //    lista_final_emails.Add(person.Value.mail);
                            //}

                        }

                    }


                }

                if (lista_final_emails == null) //se o grupo não tiver emails
                {
                    list_emails_group = null;
                    escrevelog("grupo nao tem emails");

                }
                else
                {


                    list_emails_group = lista_final_emails; //se o grupo tiver emails passamo-los para a vista global
                    escrevelog("else");
                }

            }
            else //se não houver o grupo
            {
                list_emails_group = null;
                escrevelog("grupo não existe");
            }
            //if (list_emails_group.Contains(groupName)) { escrevelog("lista de group temp contém o groupname"); }
            //escrevelog("lista de emails");
            //foreach (var email in list_emails_group) { escrevelog(email); }

        }
        public void AdListGroups()
        {
            using (var root = new DirectoryEntry("LDAP://xerox.net:389/" + caminhoLDAP))
            {
                //"LDAP://OU=Users,OU=PRT,DC=eu,DC=xerox,DC=net"                        
                using (var searcher = new DirectorySearcher(root))
                {

                    searcher.Filter = "(&(objectClass=group))";
                    searcher.SearchScope = SearchScope.Subtree;

                    SearchResultCollection results = searcher.FindAll();
                    for (int i = 0; i < results.Count; i++)
                    {
                        DirectoryEntry de = results[i].GetDirectoryEntry();
                        //TODO with "de"
                    }
                }
            }
        }
        List<string> list_Groups_Temp = new List<string>();
        public void GetAdGroups()
        {
            escrevelog("entrei no GetAdGroups()");

            using (var root = new DirectoryEntry("LDAP://xerox.net:389/" + caminhoLDAP))
            {
                //"LDAP://OU=Users,OU=PRT,DC=eu,DC=xerox,DC=net"                        
                using (var searcher = new DirectorySearcher(root))
                {
                    searcher.Filter = $"(&(objectCategory=person)(objectClass=user))";

                    searcher.PropertiesToLoad.Add("cn"); //username                       
                    searcher.PropertiesToLoad.Add("mail");//mail (trocar para mail)
                    searcher.PropertiesToLoad.Add("givenName");//First 
                    searcher.PropertiesToLoad.Add("sn");//last name
                    //searcher.PropertiesToLoad.Add("UserAccountControl");//acive acount
                    searcher.PropertiesToLoad.Add("memberOf");

                    // searcher.PageSize = 1000;

                    var results = searcher.FindAll();
                    foreach (SearchResult result in results)
                    {
                        //verificar se existe na bd 
                        //se existe e é diferente atualizar
                        //se não existe adicionar? 
                        //se existe na bd e não existe em nenhuma LDAP desligar no IsDeleted
                        if ((result != null))
                        {
                            if (result.Properties.Contains("mail"))
                            {
                                adinfo ad = new adinfo();
                                ad.givenName = result.Properties["givenName"][0].ToString();
                                ad.sn = result.Properties["sn"][0].ToString();
                                ad.mail = result.Properties["mail"][0].ToString();
                                ad.username = result.Properties["cn"][0].ToString();
                                //ad.memberOf = result.Properties["memberOf"][0].ToString(); //alterar para lista carregar os grupos para aqui
                                List<string> memberof_temp = new List<string>();
                               
                             
                                foreach (var rpc in result.Properties["memberOf"])
                                {

                                    //ad.lista_groups.Add(rpc.ToString());
                                    memberof_temp.Add(rpc.ToString());
                                    //escrevelog(rpc.ToString());
                                    string[] temp = rpc.ToString().Split(',');
                                    for (int i = 0; i < temp.Count(); i++)
                                    {
                                        if (ad.lista_groups == null)
                                        {
                                            ad.lista_groups = new List<string>();

                                        }
                                        //if (temp[i].Contains("OU="))
                                        //{
                                        //    if(list_Groups_Temp.Count() == 0)
                                        //    {
                                        //        list_Groups_Temp.Add(temp[i].Replace("OU=", ""));

                                        //    }
                                        //    if (!list_Groups_Temp.Contains(temp[i].Replace("OU=", "")))
                                        //    list_Groups_Temp.Add(temp[i].Replace("OU=", ""));
                                        //}
                                        if (temp[i].Contains("CN=PRT-"))
                                        {
                                            if (list_Groups_Temp.Count() == 0)
                                            {
                                                list_Groups_Temp.Add(temp[i].Replace("CN=", ""));
                                               
                                                //ad.lista_groups.Add(rpc.ToString());


                                            }
                                            if (!list_Groups_Temp.Contains(temp[i].Replace("CN=", "")))
                                                list_Groups_Temp.Add(temp[i].Replace("CN=", ""));
                                            ad.lista_groups.Add(temp[i].ToString().Replace("CN=", ""));
                                        }

                                    }
                                }
                                
                                ad.l_memberOf = list_Groups_Temp;

                                //memberof_temp;
                                if (!ad_dic.Keys.Contains(result.Properties["cn"][0].ToString())) 
                                ad_dic.Add(result.Properties["cn"][0].ToString(), ad);

                                //foreach(var memberof in memberof_temp) { escrevelog(memberof); }
                               
                            }

                        }
                    }
                }
            }


        }


        public void GetAdGroupsV2()
        {

            using (var root = new DirectoryEntry("LDAP://xerox.net:389/" + caminhoLDAP))
            {
                //"LDAP://OU=Users,OU=PRT,DC=eu,DC=xerox,DC=net"                        
                using (var searcher = new DirectorySearcher(root))
                {
                    searcher.Filter = $"(&(objectCategory=group))";

                    searcher.PropertiesToLoad.Add("cn"); //username                       


                    // searcher.PageSize = 1000;

                    var results = searcher.FindAll();
                    foreach (SearchResult result in results)
                    {
                        //verificar se existe na bd 
                        //se existe e é diferente atualizar
                        //se não existe adicionar? 
                        //se existe na bd e não existe em nenhuma LDAP desligar no IsDeleted
                        if ((result != null))
                        {
                            if (result.Properties.Contains("mail"))
                            {
                                adinfo ad = new adinfo();

                                ad.username = result.Properties["cn"][0].ToString();


                                //ad_dic.Add(result.Properties["cn"][0].ToString(), ad);

                                //foreach(var memberof in memberof_temp) { escrevelog(memberof); }
                            }

                        }
                    }
                }
            }


        }


    }
}
