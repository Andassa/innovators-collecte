import { type NextRequest, NextResponse } from "next/server"
import { getDonationData, saveDonationData } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token || token !== "authenticated") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await getDonationData()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token || token !== "authenticated") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate data
    if (
      typeof data.cash !== "number" ||
      typeof data.orangeMoney !== "number" ||
      typeof data.airtelMoney !== "number" ||
      typeof data.mvola !== "number" ||
      typeof data.leetchi !== "number" ||
      typeof data.exchangeRate !== "number" ||
      typeof data.goal !== "number"
    ) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 })
    }

    // Save data
    await saveDonationData(data)

    return NextResponse.json({ message: "Donations updated successfully", data }, { status: 200 })
  } catch (error) {
    console.error("Error updating donations:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
