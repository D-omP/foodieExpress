"use client"

import { useState, useEffect } from "react"
import { Search, Star, Clock, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 1.99,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "Burger Junction",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 3.49,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    distance: "0.5 km",
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.4,
    deliveryTime: "35-45 min",
    deliveryFee: 2.49,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
    distance: "1.5 km",
  },
]

const cuisineTypes = ["All", "Italian", "Chinese", "American", "Indian", "Mexican", "Thai"]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

  useEffect(() => {
    let filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (selectedCuisine !== "All") {
      filtered = filtered.filter((restaurant) => restaurant.cuisine === selectedCuisine)
    }

    setFilteredRestaurants(filtered)
  }, [searchTerm, selectedCuisine])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">FoodieExpress</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-orange-600">
                Home
              </Link>
              <Link href="/orders" className="text-gray-500 hover:text-orange-600">
                Orders
              </Link>
              <Link href="/profile" className="text-gray-500 hover:text-orange-600">
                Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Delicious Food, Delivered Fast</h2>
          <p className="text-xl mb-8">Order from your favorite restaurants and track in real-time</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className="whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {restaurant.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>{restaurant.cuisine}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{restaurant.rating}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {restaurant.distance}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">Delivery: ${restaurant.deliveryFee}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">FoodieExpress</h4>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Track your order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Partner with us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Restaurant dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Business support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodieExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
