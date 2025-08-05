import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Cab Services in Chennai | Reliable Employee Transport',
  description: 'WTL Tourism Pvt. Ltd. offers professional corporate cab services in Chennai. Get safe, on-time employee transportation solutions tailored to your business needs.',
  alternates: {
    canonical: 'http://worldtriplink.com/corporate/Corporate-Cab-Services-Chennai'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'employee transportation services in chennai, corporate employee transport services in chennai, employee transport service in chennai, cab transport services in chennai for corporate, corporate cab service in chennai, corporate cab services in chennai, corporate employee cab services in chennai, corporate employee cab system in chennai, whats per km price for corporate night cabs in chennai',
  robots: 'index, follow'
}

export default function ChennaiCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 