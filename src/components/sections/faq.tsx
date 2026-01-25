import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItemProps {
     question: string;
     answer: string;
     isOpen: boolean;
     onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
     <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <button
               onClick={onClick}
               className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
               <span className="font-semibold text-gray-800 pr-4">{question}</span>
               {isOpen ? (
                    <ChevronUp className="text-pink-600 flex-shrink-0" size={24} />
               ) : (
                    <ChevronDown className="text-pink-600 flex-shrink-0" size={24} />
               )}
          </button>
          {isOpen && (
               <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{answer}</p>
               </div>
          )}
     </div>
);

interface FAQCategory {
     category: string;
     icon: string;
     questions: Array<{ question: string; answer: string }>;
}

const Faq: React.FC = () => {
     const [openIndex, setOpenIndex] = useState<string | null>(null);
     const [activeCategory, setActiveCategory] = useState<string>('booking');

     const faqData: FAQCategory[] = [
          {
               category: 'booking',
               icon: '🎫',
               questions: [
                    {
                         question: 'How do I book a bus ticket online?',
                         answer: 'Go to our homepage, pick your departure and arrival cities, choose a travel date, then click "Search For Bus". Pick a bus, select a seat, and pay.'
                    },
                    {
                         question: 'Can I book tickets for someone else?',
                         answer: 'Yes, you can. Enter the passenger\'s name, age, and contact info. Make sure it matches their ID.'
                    },
                    {
                         question: 'How far in advance can I book?',
                         answer: 'You can book tickets up to 90 days before travel. Book early during busy times to get the best seats.'
                    },
                    {
                         question: 'What payment methods do you accept?',
                         answer: 'We accept credit/debit cards (Visa, Mastercard), mobile money (M-Pesa, Tigo Pesa, Airtel Money), and bank transfers. Payments are safe and secure.'
                    }
               ]
          },
          {
               category: 'cancellation',
               icon: '❌',
               questions: [
                    {
                         question: 'What is your cancellation policy?',
                         answer: 'You can cancel up to 2 hours before departure. Over 24 hours = 90% refund, 24-6 hours = 75%, 6-2 hours = 50%, within 2 hours = no refund.'
                    },
                    {
                         question: 'How do I cancel my ticket?',
                         answer: 'Log in, go to "My Bookings", select the ticket, and click "Cancel Booking". You will get a confirmation email.'
                    },
                    {
                         question: 'How long does it take to get a refund?',
                         answer: 'Refunds usually take 5-7 business days. The exact time depends on your bank or payment method.'
                    },
                    {
                         question: 'Can I reschedule my ticket instead of cancelling?',
                         answer: 'Yes, up to 6 hours before departure. A 10% fee applies. New date depends on seat availability.'
                    }
               ]
          },
          {
               category: 'travel',
               icon: '🚌',
               questions: [
                    {
                         question: 'What should I bring for boarding?',
                         answer: 'Bring a valid ID (National ID, Passport, or Driver\'s License) and your ticket. Arrive at least 30 minutes early.'
                    },
                    {
                         question: 'What is the luggage allowance?',
                         answer: 'Each passenger can bring one check-in bag (up to 20kg) and one carry-on (up to 5kg). Extra or heavy bags may cost more. No flammables, weapons, or illegal items.'
                    },
                    {
                         question: 'Are there amenities on board?',
                         answer: 'Buses have comfy seats, AC, and toilets. Long-distance buses may have WiFi, charging ports, and entertainment. Some routes have snacks or drinks.'
                    },
                    {
                         question: 'What if my bus is delayed or cancelled?',
                         answer: 'We will notify you by SMS and email. You can reschedule for free or get a refund. We try to avoid delays.'
                    }
               ]
          },
          {
               category: 'account',
               icon: '👤',
               questions: [
                    {
                         question: 'Do I need an account to book tickets?',
                         answer: 'You can book as a guest, but having an account is easier. You can track bookings, save routes, and get special offers.'
                    },
                    {
                         question: 'How do I reset my password?',
                         answer: 'Click "Forgot Password" on login. Enter your email. Follow the link sent to your email to create a new password.'
                    },
                    {
                         question: 'Can I update my profile information?',
                         answer: 'Yes. Log in and go to "Profile Settings". Update your name, phone, email, etc. Some changes may need email verification.'
                    },
                    {
                         question: 'How do I delete my account?',
                         answer: 'Contact customer support. Deleting your account is permanent and removes all your booking history.'
                    }
               ]
          }
     ];


     const activeData = faqData.find(cat => cat.category === activeCategory);

     const handleToggle = (index: string) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     return (
          <div className="min-h-screen bg-gray-50 border-t border-accent">
               {/* Hero Section */}
               <section className="bg-primary  py-20">
                    <div className="container mx-auto px-4">
                         <div className="max-w-4xl mx-auto text-center">
                              <HelpCircle className="mx-auto mb-6" size={64} />
                              <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                              <p className="text-lg opacity-90">
                                   Find answers to common questions about booking, cancellations, and travel
                              </p>
                         </div>
                    </div>
               </section>

               {/* Search Bar */}
               <section className="py-8 bg-white shadow-sm">
                    <div className="container mx-auto px-4">
                         <div className="max-w-2xl mx-auto">
                              <input
                                   type="text"
                                   placeholder="Search for answers..."
                                   className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                              />
                         </div>
                    </div>
               </section>

               {/* Category Tabs */}
               <section className="py-8">
                    <div className="container mx-auto px-4">
                         <div className="max-w-4xl mx-auto">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                   {faqData.map((cat) => (
                                        <button
                                             key={cat.category}
                                             onClick={() => {
                                                  setActiveCategory(cat.category);
                                                  setOpenIndex(null);
                                             }}
                                             className={`p-4 rounded-lg font-semibold transition-all ${activeCategory === cat.category
                                                       ? 'bg-primary  shadow-lg'
                                                       : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                                  }`}
                                        >
                                             <span className="text-2xl mb-2 block">{cat.icon}</span>
                                             {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                                        </button>
                                   ))}
                              </div>
                         </div>
                    </div>
               </section>

               {/* FAQ Items */}
               <section className="pb-16">
                    <div className="container mx-auto px-4">
                         <div className="max-w-4xl mx-auto">
                              {activeData?.questions.map((item, index) => (
                                   <FAQItem
                                        key={index}
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openIndex === `${activeCategory}-${index}`}
                                        onClick={() => handleToggle(`${activeCategory}-${index}`)}
                                   />
                              ))}
                         </div>
                    </div>
               </section>

               {/* Still Need Help Section */}
               <section className="py-16 bg-primary border-b-2 border-accent ">
                    <div className="container mx-auto px-4">
                         <div className="max-w-3xl mx-auto text-center">
                              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                              <p className="text-xl mb-8 opacity-90">
                                   Can't find the answer you're looking for? Our customer support team is here to assist you.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                   <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                        Contact Support
                                   </button>
                                   <button className="border-2 border-white  px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                                        Live Chat
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     );
};

export default Faq;