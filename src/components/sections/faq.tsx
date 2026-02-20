import React, { useState } from "react"
import {
  Bus,
  ChevronDown,
  ChevronUp,
  CreditCard,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  icon: React.ReactNode
}

interface FAQCategory {
  category: string
  icon: React.ReactNode
  label: string
  questions: Array<{ question: string; answer: string }>
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, icon }) => (
  <Card className="overflow-hidden border-border/70 bg-card shadow-sm">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent"
    >
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <span className="font-medium text-foreground">{question}</span>
      </div>
      <div className="rounded-md bg-muted p-1 text-muted-foreground">
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </button>

    {isOpen && (
      <div className="border-t border-border bg-background px-5 py-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
      </div>
    )}
  </Card>
)

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("booking")
  const [searchQuery, setSearchQuery] = useState("")

  const faqData: FAQCategory[] = [
    {
      category: "booking",
      icon: <CreditCard size={20} />,
      label: "Booking",
      questions: [
        {
          question: "How do I book a bus ticket online?",
          answer:
            'Select route and date, click "Search For Bus", choose a seat, then pay. Confirmation is sent immediately.',
        },
        {
          question: "Can I book for someone else?",
          answer:
            "Yes. Enter the passenger's actual details during checkout. Names should match the ID used for boarding.",
        },
        {
          question: "How early can I reserve?",
          answer:
            "Tickets are typically available up to 90 days in advance, subject to route and schedule availability.",
        },
      ],
    },
    {
      category: "travel",
      icon: <Bus size={20} />,
      label: "Travel",
      questions: [
        {
          question: "What do I need for boarding?",
          answer:
            "Bring a valid ID and your booking confirmation, and arrive at least 30 minutes before departure.",
        },
        {
          question: "What luggage is allowed?",
          answer:
            "Standard trips allow one main bag and one hand-carry. Oversized or extra luggage may incur charges.",
        },
        {
          question: "What if the bus is delayed?",
          answer:
            "You receive update notifications. If needed, support assists with rebooking or refund options.",
        },
      ],
    },
    {
      category: "account",
      icon: <Users size={20} />,
      label: "Account",
      questions: [
        {
          question: "Do I need an account to book?",
          answer:
            "Guest booking is possible, but accounts make repeat bookings faster and keep your trip history in one place.",
        },
        {
          question: "How do I reset password?",
          answer:
            "Use the " +
            '"Forgot Password" option on login and follow the secure reset link sent to your email.',
        },
      ],
    },
  ]

  const activeData = faqData.find((cat) => cat.category === activeCategory)

  const filteredQuestions =
    activeData?.questions.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? []

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/20">
            Help Center
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Straight answers to common travel questions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Search quickly or browse by category to find what you need.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 border-border bg-card pl-10"
            />
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          {faqData.map((cat) => {
            const active = activeCategory === cat.category
            return (
              <button
                key={cat.category}
                onClick={() => {
                  setActiveCategory(cat.category)
                  setOpenIndex(null)
                  setSearchQuery("")
                }}
                className={`rounded-xl border px-3 py-3 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                <div className="mb-1 flex items-center justify-center">{cat.icon}</div>
                <div className="font-medium">{cat.label}</div>
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl space-y-3">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, idx) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === `${activeCategory}-${idx}`}
                onClick={() =>
                  setOpenIndex(openIndex === `${activeCategory}-${idx}` ? null : `${activeCategory}-${idx}`)
                }
                icon={activeData?.icon ?? <HelpCircle size={20} />}
              />
            ))
          ) : (
            <Card className="border-border/70 bg-card">
              <CardContent className="py-10 text-center">
                <Search className="mx-auto mb-3 text-muted-foreground" size={30} />
                <p className="font-medium text-foreground">No results found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try another keyword or switch category.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mx-auto mt-12 max-w-5xl border-border/70 bg-muted/30">
          <CardContent className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <Phone className="mx-auto mb-2 text-primary" size={18} />
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">+255 780 598 902</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <MessageCircle className="mx-auto mb-2 text-primary" size={18} />
              <p className="text-sm font-medium text-foreground">Live Chat</p>
              <p className="text-sm text-muted-foreground">Available daily</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <Mail className="mx-auto mb-2 text-primary" size={18} />
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">support@busticketbookingtz.co.tz</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact Support</Button>
        </div>
      </div>
    </section>
  )
}

export default Faq
