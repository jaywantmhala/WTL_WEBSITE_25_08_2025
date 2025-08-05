import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Cab Services in Surat | Reliable Employee Transport',
  description: 'WTL Tourism Pvt. Ltd. offers trusted corporate cab services in Surat. Ensure safe, on-time, and hassle-free employee transportation with our professional cab solutions.',
  alternates: {
    canonical: 'https://www.worldtriplink.com/corporate/Corporate-Cab-Services-Surat'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'corporate cab services in Surat, employee transportation services in Surat',
  robots: 'index, follow'
}

export default function SuratCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 