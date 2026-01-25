import React from 'react';
import {
     Bus,
     Wifi,
     Coffee,
     Monitor,
     Zap,
     Shield,
     Headphones,
     Clock,
     CreditCard,
     Package,
     Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
     icon: React.ReactNode;
     title: string;
     description: string;
     features?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => (
     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
          <div className="text-primary mb-4">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {features && (
               <ul className="space-y-2">
                    {features.map((feature, index) => (
                         <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span>{feature}</span>
                         </li>
                    ))}
               </ul>
          )}
     </div>
);


const Services: React.FC = () => {

     const navigate = useNavigate()
     return (
          <div className="min-h-screen bg-gray-50">
               {/* Hero Section */}
               <section className="bg-primary border-t-2 border-accent  py-20">
                    <div className="container mx-auto px-4">
                         <div className="max-w-4xl mx-auto text-center">
                              <h1 className="text-3xl font-bold mb-6">Our Services</h1>
                              <p className="text-lg opacity-90">
                                   Comprehensive bus transportation solutions designed for your comfort and convenience
                              </p>
                         </div>
                    </div>
               </section>

               {/* Core Services */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         <div className="max-w-6xl mx-auto">
                              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                                   What We Offer
                              </h2>
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                   <ServiceCard
                                        icon={<Bus size={48} />}
                                        title="Long Distance Travel"
                                        description="Comfortable intercity bus services connecting major cities across the country."
                                        features={[
                                             'Modern fleet of buses',
                                             'Multiple daily departures',
                                             'Direct and express routes',
                                             'Comfortable seating'
                                        ]}
                                   />
                                   <ServiceCard
                                        icon={<Clock size={48} />}
                                        title="On-Time Guarantee"
                                        description="We value your time with our commitment to punctual departures and arrivals."
                                        features={[
                                             '95% on-time performance',
                                             'Real-time tracking',
                                             'SMS/Email notifications',
                                             'Schedule reliability'
                                        ]}
                                   />
                                   <ServiceCard
                                        icon={<CreditCard size={48} />}
                                        title="Easy Booking"
                                        description="Simple and secure online booking system with multiple payment options."
                                        features={[
                                             'Online ticket booking',
                                             'Mobile app available',
                                             'Multiple payment methods',
                                             'Instant confirmation'
                                        ]}
                                   />
                                   <ServiceCard
                                        icon={<Package size={48} />}
                                        title="Cargo Services"
                                        description="Safe and reliable parcel delivery service on all our routes."
                                        features={[
                                             'Door-to-door delivery',
                                             'Package tracking',
                                             'Insurance available',
                                             'Same-day service'
                                        ]}
                                   />
                                   <ServiceCard
                                        icon={<Users size={48} />}
                                        title="Group Bookings"
                                        description="Special rates and arrangements for group travel and corporate bookings."
                                        features={[
                                             'Discounted group rates',
                                             'Dedicated support',
                                             'Custom schedules',
                                             'Corporate accounts'
                                        ]}
                                   />
                                   <ServiceCard
                                        icon={<Headphones size={48} />}
                                        title="24/7 Support"
                                        description="Round-the-clock customer support for all your travel needs."
                                        features={[
                                             'Phone support',
                                             'Live chat',
                                             'Email assistance',
                                             'Emergency hotline'
                                        ]}
                                   />
                              </div>
                         </div>
                    </div>
               </section>

               {/* Onboard Amenities */}
               <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                         <div className="max-w-6xl mx-auto">
                              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                                   Onboard Amenities
                              </h2>
                              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                                   Travel in comfort with our modern fleet equipped with premium amenities
                              </p>
                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                   <div className="text-center p-6">
                                        <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                             <Wifi className="text-primary" size={32} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Free WiFi</h3>
                                        <p className="text-gray-600 text-sm">Stay connected throughout your journey</p>
                                   </div>
                                   <div className="text-center p-6">
                                        <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                             <Zap className="text-primary" size={32} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Charging Ports</h3>
                                        <p className="text-gray-600 text-sm">USB and power outlets at every seat</p>
                                   </div>
                                   <div className="text-center p-6">
                                        <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                             <Monitor className="text-primary" size={32} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Entertainment</h3>
                                        <p className="text-gray-600 text-sm">Movies and music on demand</p>
                                   </div>
                                   <div className="text-center p-6">
                                        <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                             <Coffee className="text-primary" size={32} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Refreshments</h3>
                                        <p className="text-gray-600 text-sm">Complimentary snacks and beverages</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Safety Features */}
               <section className="py-16">
                    <div className="container mx-auto px-4">
                         <div className="max-w-6xl mx-auto">
                              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                                   <div className="flex items-center justify-center mb-6">
                                        <Shield className="text-primary" size={64} />
                                   </div>
                                   <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                        Your Safety is Our Priority
                                   </h2>
                                   <div className="grid md:grid-cols-2 gap-8 mt-8">
                                        <div>
                                             <h3 className="text-xl font-semibold text-gray-800 mb-4">Safety Standards</h3>
                                             <ul className="space-y-3 text-gray-700">
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>Regular vehicle maintenance and inspections</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>Professional, certified drivers</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>GPS tracking on all vehicles</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>Emergency equipment on board</span>
                                                  </li>
                                             </ul>
                                        </div>
                                        <div>
                                             <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Measures</h3>
                                             <ul className="space-y-3 text-gray-700">
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>CCTV surveillance in all buses</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>Passenger identification verification</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>Secure luggage handling</span>
                                                  </li>
                                                  <li className="flex items-start">
                                                       <span className="text-primary mr-2">✓</span>
                                                       <span>24/7 emergency response team</span>
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               {/* CTA Section */}
               <section className="py-16 bg-primary ">
                    <div className="container mx-auto px-4">
                         <div className="max-w-4xl mx-auto text-center">
                              <h2 className="text-3xl font-bold mb-6">Ready to Book Your Journey?</h2>
                              <p className="text-lg mb-8 opacity-90">
                                   Experience comfortable, safe, and reliable bus travel with us
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                   <button className="bg-white text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
                                   onClick={() => navigate("/schedule")}>
                                        Book Now
                                   </button>
                                   <button className="border border-white  px-5 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-lg"
                                        onClick={() => navigate("/schedule")}>
                                        View Routes
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     );
};

export default Services;