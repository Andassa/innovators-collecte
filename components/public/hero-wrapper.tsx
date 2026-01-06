import { getDonationData } from "@/lib/edge-config"
import { HeroClient } from "./hero"

export async function Hero() {
  const data = await getDonationData()
  
  return <HeroClient data={data} />
}

