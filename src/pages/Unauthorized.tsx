import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function Unauthorized() {
     const navigate = useNavigate()

     return (
          <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
               <Card className="w-full max-w-md text-center">
                    <CardHeader className="space-y-2">
                         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                              <ShieldAlert className="h-6 w-6 text-destructive" />
                         </div>

                         <CardTitle className="text-2xl">Access Denied</CardTitle>
                         <CardDescription>
                              You don’t have permission to view this page.
                         </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                         <div className="flex flex-col gap-2">
                              <Button onClick={() => navigate(-1)}>
                                   Go Back
                              </Button>

                              <Button variant="outline" asChild>
                                   <Link to="/dashboard">Go to Dashboard</Link>
                              </Button>
                         </div>
                    </CardContent>
               </Card>
          </div>
     )
}
