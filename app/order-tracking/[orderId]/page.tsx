"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Truck, ChefHat, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams } from "next/navigation"

interface OrderStatus {
  id: string
  status: "confirmed" | "preparing" | "ready" | "picked_up" | "delivered"
  estimatedTime: string
  actualTime?: string
  description: string
}

const orderStatuses: OrderStatus[] = [
  {
    id: "confirmed",
    status: "confirmed",
    estimatedTime: "2 min",
    actualTime: "1 min ago",
    description: "Order confirmed by restaurant",
  },
  {
    id: "preparing",
    status: "preparing",
    estimatedTime: "15 min",
    actualTime: "Now",
    description: "Your food is being prepared",
  },
  {
    id: "ready",
    status: "ready",
    estimatedTime: "20 min",
    description: "Food is ready for pickup",
  },
  {
    id: "picked_up",
    status: "picked_up",
    estimatedTime: "22 min",
    description: "Driver has picked up your order",
  },
  {
    id: "delivered",
    status: "delivered",
    estimatedTime: "35 min",
    description: "Order delivered successfully",
  },
]

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.orderId as string

  const [currentStatusIndex, setCurrentStatusIndex] = useState(1)
  const [progress, setProgress] = useState(40)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev < orderStatuses.length - 1) {
          const newIndex = prev + 1
          setProgress((newIndex / (orderStatuses.length - 1)) * 100)
          return newIndex
        }
        return prev
      })
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string, isActive: boolean, isCompleted: boolean) => {
    const iconClass = `h-6 w-6 ${isCompleted ? "text-green-600" : isActive ? "text-orange-600" : "text-gray-400"}`

    switch (status) {
      case "confirmed":
        return <CheckCircle className={iconClass} />
      case "preparing":
        return <ChefHat className={iconClass} />
      case "ready":
        return <Package className={iconClass} />
      case "picked_up":
        return <Truck className={iconClass} />
      case "delivered":
        return <CheckCircle className={iconClass} />
      default:
        return <Clock className={iconClass} />
    }
  }

  // Mock order data
  const orderData = {
    id: orderId,
    restaurant: "Mario's Italian Kitchen",
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 16.99 },
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
    ],
    total: 34.97,
    deliveryAddress: "123 Main St, Apt 4B",
    driverName: "John Smith",
    driverPhone: "(555) 987-6543",
    estimatedDelivery: "7:45 PM",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-orange-600">Order Tracking</h1>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Order #{orderData.id}</CardTitle>
                <CardDescription>Estimated delivery: {orderData.estimatedDelivery}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Status Timeline */}
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => {
                    const isCompleted = index < currentStatusIndex
                    const isActive = index === currentStatusIndex

                    return (
                      <div key={status.id} className="flex items-center space-x-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-100 border-green-600"
                              : isActive
                                ? "bg-orange-100 border-orange-600"
                                : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          {getStatusIcon(status.status, isActive, isCompleted)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`font-medium ${isCompleted || isActive ? "text-gray-900" : "text-gray-500"}`}
                            >
                              {status.description}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {isActive && <Badge variant="secondary">In Progress</Badge>}
                              {isCompleted && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                              <span className="text-sm text-gray-500">{status.actualTime || status.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            {currentStatusIndex >= 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{orderData.driverName}</p>
                      <p className="text-sm text-gray-500">Delivery Driver</p>
                    </div>
                    <Button variant="outline">Call {orderData.driverPhone}</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">From: {orderData.restaurant}</h4>
                    <div className="space-y-2">
                      {orderData.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderData.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{orderData.deliveryAddress}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Restaurant
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
