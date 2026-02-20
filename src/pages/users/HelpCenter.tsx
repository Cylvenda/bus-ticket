import { useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Book,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  CreditCard,
  MapPin,
  Calendar,
  Ticket,
  Bus,
  Star,
  ExternalLink,
  Send,
} from "lucide-react"

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  helpful: number
}

interface HelpArticle {
  id: string
  title: string
  category: string
  description: string
  readTime: string
  icon: React.ReactNode
}

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const faqs: FAQ[] = [
    {
      id: "1",
      category: "booking",
      question: "How do I book a bus ticket?",
      answer: "To book a bus ticket, go to the Book page, select your origin and destination, choose your travel date, browse available schedules, select your preferred seat, and complete the payment process.",
      helpful: 45
    },
    {
      id: "2",
      category: "payment",
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards (Visa, Mastercard), mobile money (M-Pesa, Tigo Pesa), and bank transfers. You can manage your payment methods in the Payment Methods section.",
      helpful: 38
    },
    {
      id: "3",
      category: "cancellation",
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before departure time. Go to your booking history, select the booking you want to cancel, and click the cancel button. Refund policies may vary based on the bus company.",
      helpful: 32
    },
    {
      id: "4",
      category: "seating",
      question: "How do I select my preferred seat?",
      answer: "During the booking process, after selecting your schedule, you'll see the bus seat layout. Available seats are shown in green, booked seats in red, and your selected seat in blue. Click on an available seat to select it.",
      helpful: 28
    },
    {
      id: "5",
      category: "account",
      question: "How do I update my profile information?",
      answer: "Go to the Profile section in your dashboard. You can update your personal information, contact details, and password from there. Make sure to save your changes.",
      helpful: 25
    },
    {
      id: "6",
      category: "routes",
      question: "How can I find available routes?",
      answer: "Visit the Routes page to see all available bus routes. You can search by origin and destination, or browse through popular routes. Each route shows distance, estimated travel time, and available schedules.",
      helpful: 22
    }
  ]

  const helpArticles: HelpArticle[] = [
    {
      id: "1",
      title: "Getting Started with Bus Booking",
      category: "getting-started",
      description: "A complete guide to booking your first bus ticket online",
      readTime: "5 min",
      icon: <Book className="h-5 w-5" />
    },
    {
      id: "2",
      title: "Payment Methods and Security",
      category: "payment",
      description: "Learn about secure payment options and how to manage them",
      readTime: "3 min",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: "3",
      title: "Managing Your Bookings",
      category: "booking",
      description: "How to view, modify, and cancel your bus bookings",
      readTime: "4 min",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: "4",
      title: "Seat Selection Guide",
      category: "seating",
      description: "Understanding seat layouts and choosing the best seat",
      readTime: "2 min",
      icon: <Bus className="h-5 w-5" />
    },
    {
      id: "5",
      title: "Route Information and Schedules",
      category: "routes",
      description: "Finding routes and understanding bus schedules",
      readTime: "6 min",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: "6",
      title: "Account Settings and Privacy",
      category: "account",
      description: "Managing your account settings and privacy preferences",
      readTime: "4 min",
      icon: <User className="h-5 w-5" />
    }
  ]

  const categories = [
    { id: "all", name: "All", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "booking", name: "Booking", icon: <Ticket className="h-4 w-4" /> },
    { id: "payment", name: "Payment", icon: <CreditCard className="h-4 w-4" /> },
    { id: "account", name: "Account", icon: <User className="h-4 w-4" /> },
    { id: "routes", name: "Routes", icon: <MapPin className="h-4 w-4" /> },
    { id: "seating", name: "Seating", icon: <Bus className="h-4 w-4" /> },
    { id: "cancellation", name: "Cancellation", icon: <AlertCircle className="h-4 w-4" /> }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || <HelpCircle className="h-4 w-4" />
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, browse help articles, or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Contact */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Need immediate help?</h3>
                  <p className="text-sm text-muted-foreground">Our support team is here to assist you</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="faqs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="articles">Help Articles</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or browse our help articles
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-0 shadow-lg">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-muted">
                          {getCategoryIcon(faq.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{faq.question}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {faq.helpful} found this helpful
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-4">{faq.answer}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Not Helpful
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </TabsContent>

          {/* Help Articles Tab */}
          <TabsContent value="articles" className="space-y-4">
            {filteredArticles.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-12 text-center">
                  <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or browse our FAQs
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="border-0 shadow-lg hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-muted">
                          {article.icon}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {article.readTime} read
                        </span>
                        <Button variant="ghost" size="sm" className="gap-2">
                          Read More
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Options */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Options</CardTitle>
                  <CardDescription>
                    Choose the best way to reach our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Phone Support</h4>
                      <p className="text-sm text-muted-foreground">+255 780 598 902</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri, 8AM-6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-sm text-muted-foreground">support@busticket.co.tz</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Live Chat</h4>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                      <p className="text-xs text-muted-foreground">Average response: 2 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 border rounded-lg resize-none"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  
                  <Button className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PagesWrapper>
  )
}

export default HelpCenter
