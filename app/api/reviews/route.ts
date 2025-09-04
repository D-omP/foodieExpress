import { type NextRequest, NextResponse } from "next/server"

// Mock reviews data
const reviews: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const restaurantId = searchParams.get("restaurantId")

  // Filter reviews by restaurant ID
  const restaurantReviews = reviews.filter((review) => review.restaurantId === restaurantId)

  return NextResponse.json({ reviews: restaurantReviews })
}

export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json()

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      ...reviewData,
      createdAt: new Date().toISOString(),
    }

    reviews.push(newReview)

    // In a real app, you would:
    // 1. Save to MongoDB
    // 2. Update restaurant's average rating
    // 3. Send notification to restaurant

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to submit review" }, { status: 500 })
  }
}
