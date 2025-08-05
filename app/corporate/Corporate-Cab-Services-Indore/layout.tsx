import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Cab Services in Indore | Employee Transport Solutions',
  description: 'WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Indore. Ensure safe, comfortable, and on-time employee transportation with our professional cab solutions.',
  alternates: {
    canonical: 'https://www.worldtriplink.com/corporate/Corporate-Cab-Services-Indore'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'corporate cab services in Indore, employee transportation services in Indore',
  robots: 'index, follow'
}

export default function IndoreCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 