import { type NextRequest, NextResponse } from "next/server"

// Mock restaurant data - in a real app, you'd use MongoDB
const restaurants = [
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    cuisine: "Italian",
    rating: 4.5,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    distance: "0.8 km",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    description:
      "Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.",
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
        ],
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const cuisine = searchParams.get("cuisine")

  let filteredRestaurants = restaurants

  if (search) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (cuisine && cuisine !== "All") {
    filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.cuisine === cuisine)
  }

  return NextResponse.json({ restaurants: filteredRestaurants })
}
