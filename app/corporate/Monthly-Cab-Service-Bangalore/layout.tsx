import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monthly Cab Service in Bangalore | Corporate Cab Services',
  description: 'WTL Tourism Pvt. Ltd. offers reliable monthly cab service in Bangalore. Get hassle-free corporate cab services for employees with safety and affordability.',
  alternates: {
    canonical: 'https://www.worldtriplink.com/corporate/Monthly-Cab-Service-Bangalore'
  },
  authors: [{ name: 'WTL Tourism' }],
  keywords: 'corporate cab services in bangalore, commercial cabs service in bangalore corporate, corporate employee cab services in bangalore, safe corporate cabs in bangalore, what is the average cab price for corporate in bangalore, monthly cab service in bangalore, employee transportation services in bangalore, daily cab services in bangalore, corporate transport service',
  robots: 'index, follow'
}

export default function BangaloreMonthlyCorporateCabServicePage({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 