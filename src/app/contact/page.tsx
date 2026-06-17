import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'

export const metadata = {
  title: 'Contact Us | FASHIONKIDUNIYA',
  description: 'Get in touch with FASHIONKIDUNIYA customer service. We are here to help with your inquiries, feedback, and support needs.',
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      
      <div className="pt-8 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-600 mt-2">We'd love to hear from you</p>
        </div>
      </div>
      
      <ContactSection />
      
      <Footer />
    </main>
  )
} 