import PagesWrapper from "@/components/pages-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const Settings = () => {
  return (
    <PagesWrapper>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* ===== Page Title ===== */}
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and system settings
          </p>
        </div>


        {/* ===== Account Preferences ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">
                  Default system language
                </p>
              </div>
              <span className="text-sm font-medium">English</span>
            </div>
          </CardContent>
        </Card>

        {/* ===== Notifications ===== */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Email Notifications</p>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <p className="font-medium">SMS Alerts</p>
              <Switch />
            </div>
          </CardContent>
        </Card>

      </div>
    </PagesWrapper>
  )
}

export default Settings