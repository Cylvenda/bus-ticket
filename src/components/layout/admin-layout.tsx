import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "../ui/separator"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link, Outlet, useLocation } from "react-router-dom"
import { ThemeSwitcher } from "../theme-swicher"
import { AdminAppSidebar } from "../admin/side-bar"
import React from "react"

export default function AdminLayout() {

     const { pathname } = useLocation()
     const segments = pathname.split("/").filter(Boolean)

     return (
          <SidebarProvider>
               <AdminAppSidebar />

               <SidebarInset>
                    <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b ">
                         <div className="flex items-center gap-2 px-3">
                              <SidebarTrigger className="text-primary" />
                              <Separator orientation="vertical" className="mr-2 h-4" />

                              <BreadcrumbList>
                                   {segments.map((segment, index) => {
                                        const href = "/" + segments.slice(0, index + 1).join("/");
                                        const isLast = index === segments.length - 1;

                                        return (
                                             <React.Fragment key={href}>
                                                  <BreadcrumbItem>
                                                       {isLast ? (
                                                            <BreadcrumbPage className="capitalize">
                                                                 {segment.replace(/-/g, " ")}
                                                            </BreadcrumbPage>
                                                       ) : (
                                                            <BreadcrumbLink asChild>
                                                                 <Link to={href} className="capitalize">
                                                                      {segment.replace(/-/g, " ")}
                                                                 </Link>
                                                            </BreadcrumbLink>
                                                       )}
                                                  </BreadcrumbItem>

                                                  {!isLast && <BreadcrumbSeparator />}
                                             </React.Fragment>
                                        );
                                   })}
                              </BreadcrumbList>

                         </div>

                         <div className="mr-7">
                              <ThemeSwitcher />
                         </div>

                    </header>

                    <main><Outlet /></main>
               </SidebarInset>
          </SidebarProvider>
     )
}
