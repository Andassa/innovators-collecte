import { getDonationData } from "@/lib/edge-config"
import { TotalsSectionClient } from "./totals-section"

export async function TotalsSection() {
  const data = await getDonationData()
  
  return <TotalsSectionClient data={data} />
}

