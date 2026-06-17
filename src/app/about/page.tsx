"use client"

import { FaCheckCircle, FaCreditCard, FaTruck, FaShieldAlt, FaHome, FaArrowUp, FaUsers, FaHistory, FaMedal, FaHandshake, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'

type TabType = 'story' | 'mission' | 'team';

// TeamMember component
interface SocialLink {
  platform: string;
  url: string;
}

interface TeamMemberProps {
  id: string;
  name: string;
  designation: string;
  image: string;
  description: string;
  socialLinks: SocialLink[];
}

const TeamMember = ({ id, name, designation, image, description, socialLinks }: TeamMemberProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md text-center ${styles.teamMember}`} id={id}>
      <div className={styles.profileImageWrapper}>
        <Image 
          src={image} 
          alt={name} 
          width={120}
          height={120}
          className={styles.profileImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=120";
            target.onerror = null; // Prevent infinite error loop
          }}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{designation}</p>
        <p className={styles.bio}>{description}</p>
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              {link.platform === "facebook" && <FaFacebook />}
              {link.platform === "twitter" && <FaTwitter />}
              {link.platform === "instagram" && <FaInstagram />}
              {link.platform === "linkedin" && <FaLinkedin />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('story');

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tabs content
  const tabContent: Record<TabType, JSX.Element> = {
    story: (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-600 mb-6">
              Founded with a passion for fashion and a commitment to excellence, we've been serving fashion enthusiasts since 2020. What started as a small boutique has now grown into a trusted fashion destination for customers across India.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our journey began with a simple mission: to provide high-quality, trendy clothing that makes everyone feel confident and stylish without breaking the bank. Today, we continue to pursue that mission with unwavering dedication.
            </p>
            <p className="text-lg text-gray-600">
              We believe that fashion should be accessible to everyone. That's why we carefully curate our collections to include a diverse range of styles, sizes, and price points to cater to every customer's unique preferences and needs.
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105">
            <Image 
              src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Store" 
              fill
              style={{objectFit: "cover"}}
              className="rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800";
              }}
            />
          </div>
        </div>
      </div>
    ),
    mission: (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-600 mb-6">
              At FASHIONKIDUNIYA, our mission is to transform the way people express themselves through fashion. We believe clothing is more than just fabric—it's a form of self-expression and confidence.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We're dedicated to providing affordable, high-quality fashion that empowers everyone to look and feel their best. Through mindful design and ethical practices, we're creating a more inclusive and sustainable fashion ecosystem.
            </p>
            <p className="text-lg text-gray-600">
              Every day, we work to inspire confidence through style, making fashion accessible to all while minimizing our environmental impact. We're not just selling clothes; we're helping people write their personal style stories.
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105">
            <Image 
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Mission" 
              fill
              style={{objectFit: "cover"}}
              className="rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800";
              }}
            />
          </div>
        </div>
      </div>
    ),
    team: (
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMember
            id="pankaj"
            name="  pankaj Kumar"
            designation="Founder & CEO"
            image="/images/team/pankaj.jpg"
            description="Meet pankaj, the visionary behind our fashion e-commerce platform. With years of experience in both fashion and technology, Abhinit leads our company with passion and innovation."
            socialLinks={[
              { platform: "linkedin", url: "https://www.linkedin.com/" },
              { platform: "twitter", url: "https://twitter.com/" },
              { platform: "instagram", url: "https://www.instagram.com/" },
            ]}
          />
          
          <TeamMember
            id="anita"
            name="anita kumari"
            designation="Creative Director"
            image="/images/team/.jpg"
            description="Trendsetter with an eye for design and a commitment to creating unique clothing lines."
            socialLinks={[
              { platform: "facebook", url: "#" },
              { platform: "twitter", url: "#" },
              { platform: "instagram", url: "#" },
            ]}
          />
          
          <TeamMember
            id="abhinit"
            name="abhinit Kumar"
            designation="Head of Operations"
            image="/images/team/abhinit.jpg"
            description="Ensures smooth operations and logistics, keeping our business running efficiently."
            socialLinks={[
              { platform: "facebook", url: "#" },
              { platform: "twitter", url: "#" },
              { platform: "instagram", url: "#" },
            ]}
          />
        </div>
      </div>
    )
  };

  return (
    <main className="bg-white">
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="fixed bottom-8 left-8 z-50 group"
        aria-label="Back to home"
      >
        <div className="flex flex-col items-center">
          <div className="bg-primary p-4 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-amber-500 hover:rotate-12 group-hover:shadow-amber-300/50">
            <FaHome className="text-white text-xl" />
          </div>
          <span className="mt-2 px-2 py-1 bg-white/90 rounded text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">Home</span>
        </div>
      </Link>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 group transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Back to top"
      >
        <div className="flex flex-col items-center">
          <div className="bg-primary p-4 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-amber-500 group-hover:shadow-amber-300/50">
            <FaArrowUp className="text-white text-xl" />
          </div>
          <span className="mt-2 px-2 py-1 bg-white/90 rounded text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">Top</span>
        </div>
      </button>
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image 
            src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Fashion Background" 
            fill
            style={{objectFit: "cover"}}
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920";
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp">
            A premier fashion destination committed to bringing you trendy, high-quality clothing at affordable prices.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fadeInUp">
            <button 
              onClick={() => setActiveTab('story')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'story' ? 'bg-white text-primary font-semibold' : 'bg-gray-800/50 text-white hover:bg-gray-800'}`}
            >
              Our Story
            </button>
            <button 
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'mission' ? 'bg-white text-primary font-semibold' : 'bg-gray-800/50 text-white hover:bg-gray-800'}`}
            >
              Our Mission
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'team' ? 'bg-white text-primary font-semibold' : 'bg-gray-800/50 text-white hover:bg-gray-800'}`}
            >
              Our Team
            </button>
          </div>
        </div>
      </section>
      
      {/* About Content - Dynamic Tabs */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {tabContent[activeTab]}
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="p-4 bg-white rounded-lg shadow-md transform transition-transform hover:scale-105">
                    <h3 className="text-xl font-bold text-primary mb-2">2020</h3>
                    <h4 className="text-lg font-semibold mb-2">The Beginning</h4>
                    <p className="text-gray-600">Started as a small boutique with a limited collection of fashion items.</p>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-white shadow my-4 md:my-0">
                  <FaHistory className="text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-white shadow my-4 md:my-0">
                  <FaUsers className="text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="p-4 bg-white rounded-lg shadow-md transform transition-transform hover:scale-105">
                    <h3 className="text-xl font-bold text-primary mb-2">2021</h3>
                    <h4 className="text-lg font-semibold mb-2">Expansion</h4>
                    <p className="text-gray-600">Expanded our collection and reached over 10,000 customers across India.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="p-4 bg-white rounded-lg shadow-md transform transition-transform hover:scale-105">
                    <h3 className="text-xl font-bold text-primary mb-2">2022</h3>
                    <h4 className="text-lg font-semibold mb-2">Online Launch</h4>
                    <p className="text-gray-600">Launched our e-commerce platform to reach customers nationwide.</p>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-white shadow my-4 md:my-0">
                  <FaMedal className="text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-white shadow my-4 md:my-0">
                  <FaHandshake className="text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="p-4 bg-white rounded-lg shadow-md transform transition-transform hover:scale-105">
                    <h3 className="text-xl font-bold text-primary mb-2">2023</h3>
                    <h4 className="text-lg font-semibold mb-2">Partnerships</h4>
                    <p className="text-gray-600">Formed strategic partnerships with designers and manufacturers to improve quality and variety.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Shop With Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We source the finest materials and work with trusted manufacturers to ensure every product meets our high standards.
              </p>
            </div>
            
            {/* Reason 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <FaTruck />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick and reliable shipping across India with our efficient logistics network and dedicated delivery partners.
              </p>
            </div>
            
            {/* Reason 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <FaCreditCard />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Shop with confidence using our secure payment gateways that protect your financial information.
              </p>
            </div>
            
            {/* Reason 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-primary text-4xl mb-4 flex justify-center">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Our hassle-free 30-day return policy ensures you can shop with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Fashion Community</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Experience the difference of shopping with us. Discover trendy styles, premium quality, and exceptional service that keeps our customers coming back.
          </p>
          <a href="/products" className="inline-block bg-white text-primary font-medium px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
            Shop Now
          </a>
        </div>
      </section>
    </main>
  )
} 