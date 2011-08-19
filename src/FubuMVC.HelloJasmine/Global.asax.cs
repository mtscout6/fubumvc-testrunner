using System;
using System.IO;
using System.Web.Routing;
using Bottles;
using FubuMVC.Core;
using FubuMVC.Core.Content;
using FubuMVC.StructureMap;
using StructureMap;

namespace FubuMVC.HelloJasmine
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            FubuApplication
                .For(new FubuRegistry(x => x.IncludeDiagnostics(true)))
                .StructureMapObjectFactory()
                .Bootstrap(RouteTable.Routes);

            var folderService = ObjectFactory.Container.GetInstance<IContentFolderService>();
            folderService.RegisterDirectory(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "content"));

            PackageRegistry.AssertNoFailures();
        }

        protected void Application_Error()
        {
            var exception = Server.GetLastError();
        }
    }
}