import { get } from "@vercel/edge-config"

// Types pour les données de donation
export interface DonationData {
  cash: number
  orangeMoney: number
  airtelMoney: number
  mvola: number
  leetchi: number
  exchangeRate: number
  goal: number
  lastUpdated?: string
}

// Données par défaut
const defaultData: DonationData = {
  cash: 0,
  orangeMoney: 0,
  airtelMoney: 0,
  mvola: 0,
  leetchi: 0,
  exchangeRate: 4500, // Taux Ariary vers Euro
  goal: 10000, // Objectif: 10,000 EUR
}

// Stockage en mémoire global pour le développement local
// Utilise globalThis pour persister entre les différents modules
const globalForStorage = globalThis as unknown as {
  donationData: DonationData | null
}

if (!globalForStorage.donationData) {
  globalForStorage.donationData = null
}

/**
 * Vérifie si Edge Config est configuré pour l'écriture
 */
function isEdgeConfigWriteEnabled(): boolean {
  return !!(process.env.EDGE_CONFIG_ID && process.env.EDGE_CONFIG_API_TOKEN)
}

/**
 * Vérifie si Edge Config est configuré pour la lecture
 */
function isEdgeConfigReadEnabled(): boolean {
  return !!process.env.EDGE_CONFIG
}

/**
 * Récupère les données de donation depuis Vercel Edge Config
 */
export async function getDonationData(): Promise<DonationData> {
  try {
    console.log("📖 getDonationData - EDGE_CONFIG exists:", !!process.env.EDGE_CONFIG)
    console.log("📖 getDonationData - EDGE_CONFIG_ID exists:", !!process.env.EDGE_CONFIG_ID)
    console.log("📖 getDonationData - EDGE_CONFIG_API_TOKEN exists:", !!process.env.EDGE_CONFIG_API_TOKEN)
    
    // Si Edge Config est configuré, essayer de lire depuis Edge Config
    if (isEdgeConfigReadEnabled()) {
      console.log("📖 Lecture depuis Edge Config...")
      const donations = await get<DonationData>("donations")
      console.log("📖 Données reçues:", JSON.stringify(donations))
      if (donations) {
        return donations
      }
    }
    
    // Sinon, utiliser le stockage en mémoire (développement local)
    if (globalForStorage.donationData) {
      console.log("📖 Utilisation du stockage mémoire")
      return globalForStorage.donationData
    }
    
    // Retourner les données par défaut si rien n'est stocké
    console.log("📖 Retour des données par défaut")
    return defaultData
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données:", error)
    
    // Fallback vers la mémoire en cas d'erreur
    if (globalForStorage.donationData) {
      return globalForStorage.donationData
    }
    
    return defaultData
  }
}

/**
 * Sauvegarde les données de donation
 * Utilise Edge Config si configuré, sinon stockage en mémoire
 */
export async function saveDonationData(data: DonationData): Promise<DonationData> {
  console.log("💾 saveDonationData - Début de la sauvegarde")
  console.log("💾 EDGE_CONFIG_ID exists:", !!process.env.EDGE_CONFIG_ID)
  console.log("💾 EDGE_CONFIG_API_TOKEN exists:", !!process.env.EDGE_CONFIG_API_TOKEN)
  
  // Ajouter le timestamp de dernière mise à jour
  const dataWithTimestamp: DonationData = {
    ...data,
    lastUpdated: new Date().toISOString(),
  }

  // Si Edge Config n'est pas configuré pour l'écriture, utiliser le stockage en mémoire
  if (!isEdgeConfigWriteEnabled()) {
    console.log("⚠️ Edge Config non configuré pour l'écriture - Utilisation du stockage en mémoire")
    globalForStorage.donationData = dataWithTimestamp
    return dataWithTimestamp
  }

  const edgeConfigId = process.env.EDGE_CONFIG_ID!
  const vercelApiToken = process.env.EDGE_CONFIG_API_TOKEN!
  const vercelTeamId = process.env.MY_VERCEL_TEAM_ID

  // URL de l'API avec ou sans team ID
  let apiUrl = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`
  if (vercelTeamId) {
    apiUrl += `?teamId=${vercelTeamId}`
  }

  console.log("💾 Appel API vers:", apiUrl)

  const response = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${vercelApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key: "donations",
          value: dataWithTimestamp,
        },
      ],
    }),
  })

  console.log("💾 Réponse API status:", response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error("❌ Erreur API Vercel:", response.status, errorText)
    
    // Fallback vers le stockage en mémoire en cas d'erreur
    console.log("⚠️ Fallback vers le stockage en mémoire")
    globalForStorage.donationData = dataWithTimestamp
    return dataWithTimestamp
  }

  console.log("✅ Sauvegarde réussie dans Edge Config")
  
  // Mettre aussi en mémoire pour avoir une copie locale
  globalForStorage.donationData = dataWithTimestamp

  return dataWithTimestamp
}
