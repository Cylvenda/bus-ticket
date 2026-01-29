import { useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  AlertCircle,
  Shield,
  Smartphone,
  Wallet,
  Building,
} from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "mobile" | "bank"
  name: string
  details: string
  isDefault: boolean
  status: "active" | "inactive"
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa •••• 4242",
      details: "Expires 12/25",
      isDefault: true,
      status: "active"
    },
    {
      id: "2",
      type: "mobile",
      name: "M-Pesa",
      details: "+255 712 345 678",
      isDefault: false,
      status: "active"
    },
    {
      id: "3",
      type: "bank",
      name: "CRDB Bank",
      details: "Account •••• 7890",
      isDefault: false,
      status: "active"
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [newMethod, setNewMethod] = useState({
    type: "card" as "card" | "mobile" | "bank",
    name: "",
    details: ""
  })

  const getIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "bank":
        return <Building className="h-5 w-5" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "card":
        return "text-blue-600 bg-blue-100 dark:bg-blue-950"
      case "mobile":
        return "text-green-600 bg-green-100 dark:bg-green-950"
      case "bank":
        return "text-purple-600 bg-purple-100 dark:bg-purple-950"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-950"
    }
  }

  const handleAddPaymentMethod = () => {
    if (!newMethod.name || !newMethod.details) return

    const method: PaymentMethod = {
      id: Date.now().toString(),
      type: newMethod.type,
      name: newMethod.name,
      details: newMethod.details,
      isDefault: paymentMethods.length === 0,
      status: "active"
    }

    setPaymentMethods([...paymentMethods, method])
    setNewMethod({ type: "card", name: "", details: "" })
    setShowAddForm(false)
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
  }

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method)
    setNewMethod({
      type: method.type,
      name: method.name,
      details: method.details
    })
    setShowAddForm(true)
  }

  const handleUpdateMethod = () => {
    if (!editingMethod) return

    setPaymentMethods(paymentMethods.map(method => 
      method.id === editingMethod.id 
        ? { ...method, name: newMethod.name, details: newMethod.details }
        : method
    ))

    setEditingMethod(null)
    setNewMethod({ type: "card", name: "", details: "" })
    setShowAddForm(false)
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
            <p className="text-muted-foreground mt-1">
              Manage your payment methods for quick and easy bookings
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>

        {/* Security Notice */}
        <Card className="border-0 shadow-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Secure Payment Processing
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your payment information is encrypted and securely stored
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Payment Method Form */}
        {showAddForm && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>
                {editingMethod ? "Edit Payment Method" : "Add New Payment Method"}
              </CardTitle>
              <CardDescription>
                {editingMethod ? "Update your payment method details" : "Add a new payment method to your account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <Tabs value={newMethod.type} onValueChange={(value) => setNewMethod(prev => ({ ...prev, type: value as "card" | "mobile" | "bank" }))}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card" className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="gap-2">
                        <Smartphone className="h-4 w-4" />
                        Mobile
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="gap-2">
                        <Building className="h-4 w-4" />
                        Bank
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder={newMethod.type === "card" ? "Cardholder Name" : 
                              newMethod.type === "mobile" ? "Mobile Money Provider" : "Bank Name"}
                    value={newMethod.name}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Details</Label>
                  <Input
                    id="details"
                    placeholder={newMethod.type === "card" ? "Card Number" : 
                              newMethod.type === "mobile" ? "Phone Number" : "Account Number"}
                    value={newMethod.details}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, details: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingMethod ? (
                  <>
                    <Button onClick={handleUpdateMethod} className="gap-2">
                      <Check className="h-4 w-4" />
                      Update
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingMethod(null)
                        setNewMethod({ type: "card", name: "", details: "" })
                      }}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleAddPaymentMethod} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Method
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false)
                        setNewMethod({ type: "card", name: "", details: "" })
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No payment methods</h3>
                <p className="text-muted-foreground mb-4">
                  Add a payment method to make booking faster and easier
                </p>
                <Button onClick={() => setShowAddForm(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Payment Method
                </Button>
              </CardContent>
            </Card>
          ) : (
            paymentMethods.map((method) => (
              <Card key={method.id} className="border-0 shadow-lg hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getIconColor(method.type)}`}>
                        {getIcon(method.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{method.name}</h3>
                          {method.isDefault && (
                            <Badge variant="default" className="text-xs">
                              Default
                            </Badge>
                          )}
                          <Badge 
                            variant={method.status === "active" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {method.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{method.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditMethod(method)}
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteMethod(method.id)}
                        className="gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PagesWrapper>
  )
}

export default PaymentMethods
