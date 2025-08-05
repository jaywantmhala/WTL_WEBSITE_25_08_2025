import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Employee Transport Services in Delhi | WTL Tourism',
  description: 'WTL Tourism Pvt. Ltd. offers safe and reliable corporate employee transport services in Delhi. Ensure hassle-free, on-time cab solutions for your workforce.',
  alternates: {
    canonical: 'https://www.worldtriplink.com/corporate/Corporate-Employee-Transport-Services-Delhi'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'corporate employee transport services in delhi, corporate employee transport services in delhi ncr, corporate cab services in delhi ncr, corporate cab companies in delhi ncr, corporate cab in delhi go gurgaon, corporate employee cab services in delhi, employee transportation services in Delhi',
  robots: 'index, follow'
}

export default function DelhiCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 