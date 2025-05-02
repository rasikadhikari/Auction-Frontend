import React from "react";
import { Info, Image, Award, Users, Briefcase, MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Fotheby's
          </h1>
          <p className="text-xl text-gray-600">
            International Auction House Specializing in Fine Art Since 1875
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-pattern"></div>
            <div className="text-center text-white px-4 relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Excellence in Fine Art Auctions
              </h2>
              <p className="text-lg">
                Connecting collectors with extraordinary pieces for generations
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              <p className="mb-4">
                Fotheby's is a prestigious international auction house dedicated
                to the sale of fine art. With decades of experience and
                expertise, we've established ourselves as leaders in the global
                art market, connecting discerning collectors with exceptional
                pieces from renowned artists around the world.
              </p>

              <p className="mb-6">
                In today's buoyant art market, we're committed to enhancing our
                services through technological advancement, ensuring our clients
                receive unparalleled access to our curated collections and
                auctions.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-indigo-600" />
                Our Specialization
              </h3>

              <p className="mb-4">
                At Fotheby's, we specialize in five primary categories of fine
                art:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Paintings - Including oils, acrylics, watercolors and more
                </li>
                <li>
                  Drawings - Featuring pencil, ink, charcoal, and other media
                </li>
                <li>
                  Photographic Images - Both black & white and color works
                </li>
                <li>
                  Sculptures - Crafted from bronze, marble, pewter and other
                  materials
                </li>
                <li>
                  Carvings - Created from oak, beech, pine, willow and other
                  woods
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 h-6 w-6 text-indigo-600" />
                Our Commitment
              </h3>

              <p className="mb-6">
                We're dedicated to providing exceptional service to both buyers
                and sellers in the art market. Our team of experts carefully
                curates each auction, ensuring authenticity, provenance, and
                quality for every piece that passes through our doors. We pride
                ourselves on transparency, integrity, and our deep knowledge of
                the art world.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6 text-indigo-600" />
                Meet Our Leadership
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Mr. Max Fotheby</h4>
                  <p className="text-sm text-gray-600">Owner & CEO</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">
                    Ms. Elizabeth Harrington
                  </h4>
                  <p className="text-sm text-gray-600">Chief Curator</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">
                    Dr. Thomas Welling
                  </h4>
                  <p className="text-sm text-gray-600">
                    Director of Authentication
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-indigo-600" />
                Our Locations
              </h3>

              <p className="mb-4">
                With auction houses in major art capitals around the world,
                Fotheby's maintains a global presence that allows us to serve
                collectors wherever they may be. Our flagship locations include:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>London, United Kingdom - Headquarters</li>
                <li>New York, United States</li>
                <li>Paris, France</li>
                <li>Hong Kong, China</li>
                <li>Dubai, UAE</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Direction Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="mr-2 h-6 w-6 text-indigo-600" />
              Our Digital Transformation
            </h3>

            <p className="mb-4">
              Fotheby's is embracing the digital age by transitioning our
              traditional printed catalogue to a comprehensive web-based auction
              catalogue system. This innovation will:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Significantly increase visibility for auction items</li>
              <li>Expand our reach beyond the limited 5,000 copy print run</li>
              <li>Enhance the auction experience for our clients</li>
              <li>Facilitate higher final sale prices for our sellers</li>
              <li>Provide improved search and discovery features for buyers</li>
            </ul>

            <p className="mb-4">
              We're committed to preserving the prestigious heritage of
              Fotheby's while embracing technological advancements that benefit
              our valued clients and the art community at large.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Visit Our Auction House
          </h3>
          <p className="mb-6">
            We invite you to experience the elegance and excitement of a
            Fotheby's auction in person.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-md transition duration-150 ease-in-out">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

// Missing component import fix
const User = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
};

export default About;
