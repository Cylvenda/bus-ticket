import PagesWrapper from "@/components/pages-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Message = {
  id: number
  sender: string
  subject: string
  message: string
  date: string
  read: boolean
}

// Example inbox messages (replace with real data from store/API)
const messages: Message[] = [
  {
    id: 1,
    sender: "Walk Easy Admin",
    subject: "Booking Confirmation",
    message: "Your ticket for Dar Es Salaam → Moshi has been confirmed.",
    date: "21-12-2025",
    read: true,
  },
  {
    id: 2,
    sender: "Walk Easy Admin",
    subject: "Payment Reminder",
    message: "Please complete your payment for ticket #T12345.",
    date: "20-12-2025",
    read: false,
  },
  {
    id: 3,
    sender: "Customer Support",
    subject: "Support Ticket Update",
    message: "Your support ticket has been resolved. Please check.",
    date: "19-12-2025",
    read: false,
  },
]

const Inbox = () => {
  return (
    <PagesWrapper>
      <div className="flex flex-col gap-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">Check your messages, notifications, and alerts.</p>
        </div>

        {/* Inbox Cards */}
        <div className="flex flex-col gap-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No messages
            </p>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className={`transition-all ${msg.read ? "bg-muted/50" : "bg-primary/10"} hover:bg-primary/20`}
              >
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">{msg.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground">{msg.sender}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{msg.date}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{msg.message}</p>
                  {!msg.read && (
                    <Button size="sm" className="mt-2">
                      Mark as Read
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PagesWrapper>
  )
}

export default Inbox
