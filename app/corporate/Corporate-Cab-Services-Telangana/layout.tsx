import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Cab Services in Telangana | Reliable Employee Transport',
  description: 'WTL Tourism Pvt. Ltd. offers professional corporate cab services in Telangana. Get safe, on-time, and hassle-free employee transportation tailored to your business needs.',
  alternates: {
    canonical: 'https://www.worldtriplink.com/corporate/Corporate-Cab-Services-Telangana'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'corporate cab services in Telangana, employee transportation services in Telangana',
  robots: 'index, follow'
}

export default function TelanganaCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 