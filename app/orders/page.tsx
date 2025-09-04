"use client"

import { useState } from "react"
import { Clock, Star, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

// Mock orders data
const orders = [
  {
    id: "12345",
    restaurant: "Mario's Italian Kitchen",
    items: ["Spaghetti Carbonara", "Margherita Pizza"],
    total: 34.97,
    status: "delivered",
    date: "2024-01-15",
    time: "7:45 PM",
    image: "/placeholder.svg?height=100&width=100",
    rating: null,
  },
  {
    id: "12344",
    restaurant: "Dragon Palace",
    items: ["Kung Pao Chicken", "Fried Rice"],
    total: 28.5,
    status: "delivered",
    date: "2024-01-12",
    time: "6:30 PM",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "12343",
    restaurant: "Burger Junction",
    items: ["Classic Burger", "French Fries"],
    total: 18.99,
    status: "cancelled",
    date: "2024-01-10",
    time: "8:15 PM",
    image: "/placeholder.svg?height=100&width=100",
    rating: null,
  },
]

const activeOrders = [
  {
    id: "12346",
    restaurant: "Spice Garden",
    items: ["Chicken Tikka Masala", "Naan Bread"],
    total: 24.99,
    status: "preparing",
    date: "2024-01-16",
    time: "Now",
    estimatedDelivery: "8:30 PM",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "preparing":
        return <Badge className="bg-orange-100 text-orange-800">Preparing</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleReviewSubmit = () => {
    // Here you would submit the review to your backend
    console.log("Review submitted:", { orderId: selectedOrder.id, rating, review })
    setSelectedOrder(null)
    setReview("")
    setRating(0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-orange-600">Your Orders</h1>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          {/* Active Orders */}
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active orders</h3>
                  <p className="text-gray-500 mb-4">You don't have any orders in progress right now.</p>
                  <Link href="/">
                    <Button>Browse Restaurants</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt={order.restaurant}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{order.restaurant}</h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-gray-600 mb-2">{order.items.join(", ")}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">${order.total}</span>
                          <span className="text-sm text-gray-500">Est. delivery: {order.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/order-tracking/${order.id}`} className="flex-1">
                        <Button className="w-full">Track Order</Button>
                      </Link>
                      <Button variant="outline">Contact Restaurant</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Order History */}
          <TabsContent value="history" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.restaurant}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{order.restaurant}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-gray-600 mb-2">{order.items.join(", ")}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">${order.total}</span>
                        <span className="text-sm text-gray-500">
                          {order.date} at {order.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>

                    {order.status === "delivered" && !order.rating && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                            <Star className="h-4 w-4 mr-2" />
                            Rate & Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rate your experience</DialogTitle>
                            <DialogDescription>How was your order from {order.restaurant}?</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Star Rating */}
                            <div>
                              <label className="block text-sm font-medium mb-2">Rating</label>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`h-8 w-8 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                  >
                                    <Star className="h-full w-full fill-current" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Review Text */}
                            <div>
                              <label className="block text-sm font-medium mb-2">Review (Optional)</label>
                              <Textarea
                                placeholder="Tell others about your experience..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                              />
                            </div>

                            <div className="flex space-x-2">
                              <Button onClick={handleReviewSubmit} className="flex-1">
                                Submit Review
                              </Button>
                              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {order.rating && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>You rated {order.rating} stars</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
