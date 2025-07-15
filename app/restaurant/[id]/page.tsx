"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Mock restaurant data
const restaurantData = {
  1: {
    id: 1,
    name: "Mario's Italian Kitchen",
    cuisine: "Italian",
    rating: 4.5,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=300&width=600",
    description:
      "Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    menu: [
      {
        category: "Appetizers",
        items: [
          {
            id: 1,
            name: "Bruschetta",
            description: "Grilled bread topped with fresh tomatoes, basil, and mozzarella",
            price: 8.99,
            image: "/placeholder.svg?height=150&width=200",
          },
          {
            id: 2,
            name: "Calamari Rings",
            description: "Crispy fried squid rings served with marinara sauce",
            price: 12.99,
            image: "/placeholder.svg?height=150&width=200",
          },
        ],
      },
      {
        category: "Main Courses",
        items: [
          {
            id: 3,
            name: "Spaghetti Carbonara",
            description: "Classic pasta with eggs, cheese, pancetta, and black pepper",
            price: 16.99,
            image: "/placeholder.svg?height=150&width=200",
          },
          {
            id: 4,
            name: "Margherita Pizza",
            description: "Traditional pizza with tomato sauce, mozzarella, and fresh basil",
            price: 14.99,
            image: "/placeholder.svg?height=150&width=200",
          },
          {
            id: 5,
            name: "Chicken Parmigiana",
            description: "Breaded chicken breast with marinara sauce and melted cheese",
            price: 19.99,
            image: "/placeholder.svg?height=150&width=200",
          },
        ],
      },
      {
        category: "Desserts",
        items: [
          {
            id: 6,
            name: "Tiramisu",
            description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
            price: 7.99,
            image: "/placeholder.svg?height=150&width=200",
          },
        ],
      },
    ],
  },
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = Number.parseInt(params.id as string)
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]

  const [cart, setCart] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setCartTotal(total)
  }, [cart])

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0)
    })
  }

  const getItemQuantity = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-orange-600">FoodieExpress</h1>
            </div>
            <Link href="/cart">
              <Button className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Restaurant Header */}
      <section className="relative">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          width={600}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-4">{restaurant.description}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span>
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>Delivery: ${restaurant.deliveryFee}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Menu</h2>
              {restaurant.menu.map((category) => (
                <div key={category.category} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{item.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                              <p className="font-bold text-lg">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getItemQuantity(item.id) > 0 ? (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center">{getItemQuantity(item.id)}</span>
                                  <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <Button onClick={() => addToCart(item)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {category !== restaurant.menu[restaurant.menu.length - 1] && <Separator className="my-6" />}
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>${restaurant.deliveryFee}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${(cartTotal + restaurant.deliveryFee).toFixed(2)}</span>
                        </div>
                      </div>
                      <Link href="/checkout" className="block mt-4">
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
