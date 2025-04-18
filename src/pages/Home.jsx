import React from 'react';
import GiftCard from "../components/GiftCard"
import Advantages from "../components/Advantages"
import TariffComparison from "../components/TariffComparison"
import Testimonials from "../components/Testimonials"
import HeroBlock from "../components/HeroBlock"
import SocialProof from "../components/SocialProof"
import CourseStructure from "../components/CourseStructure"

const heroData = {
  imageUrl: '/images/services.jpg',
  title: "Start Your Journey to Freedom",
  subtitle: "Learn to drive with confidence from experienced instructors",
  ctaText: "Book Your First Lesson",
  ctaLink: "/contact"
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* STAGE 1: AWARENESS - Capture attention and introduce the value proposition */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <HeroBlock {...heroData} />
        
        {/* Quick stats to build credibility */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">Happy Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 2: CONSIDERATION - Provide information and build trust */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Viktorija Driving School?</h2>
            <p className="mt-4 text-xl text-gray-600">Discover what makes our driving school the best choice for you</p>
          </div>
          
          <Advantages />
        </div>
      </section>

      {/* STAGE 3: EVALUATION - Show social proof and course details */}
      <section className="py-16 bg-gray-50">
        <SocialProof />
        <CourseStructure />
      </section>

      {/* STAGE 4: DECISION - Help with final decision and provide incentives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Compare Our Packages</h2>
            <p className="mt-4 text-xl text-gray-600">Find the perfect driving course for your needs and budget</p>
          </div>
          
          <TariffComparison />
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Special Offer</h3>
            <p className="text-gray-600 mb-8">Get a gift card for your friend or family member</p>
            <GiftCard />
          </div>
        </div>
      </section>

      {/* STAGE 5: ACTION - Final push with testimonials and clear CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
            <p className="mt-4 text-xl text-gray-600">Join our community of successful drivers</p>
          </div>
          
          <Testimonials />
          
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl text-gray-600 mb-8">Book your first lesson today and take the first step toward driving freedom</p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Book Your First Lesson Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
  