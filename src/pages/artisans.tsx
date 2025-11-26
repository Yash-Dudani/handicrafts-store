// artisans.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";

export default function Artisans() {
  const artisans = [
    {
      id: 1,
      name: "Ajay Bhardwaj",
      craft: "Pottery & Ceramics",
      location: "Mumbai, India",
      experience: "15+ years",
      story: "Ajay learned pottery from her grandmother, preserving ancient Mixtec techniques while incorporating contemporary designs. Each piece tells a story of her heritage and connection to the earth.",
      image: "/images/artisan1.png",
      specialties: ["Hand-painted Ceramics", "Traditional Pottery", "Modern Clay Art"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      craft: "Textile Weaving",
      location: "Varanasi, India",
      experience: "12+ years",
      story: "Coming from a long line of weavers, Rajesh specializes in Banarasi silk weaving. His intricate patterns and attention to detail have been passed down through five generations.",
      image: "/images/artisan2.png",
      specialties: ["Silk Weaving", "Embroidery", "Traditional Patterns"]
    },
    {
      id: 3,
      name: "Jessica Kaur",
      craft: "Leather Craft",
      location: "Punjab, India",
      experience: "10+ years",
      story: "Jessica's leather workshop has been family-owned since 1950. She combines traditional Italian leatherworking with modern aesthetics, creating timeless pieces that age beautifully.",
      image: "/images/artisan3.png",
      specialties: ["Hand-stitched Leather", "Custom Bags", "Artisanal Accessories"]
    },
    {
      id: 4,
      name: "Amit Kapoor",
      craft: "Woodworking",
      location: "Haryana, India",
      experience: "15+ years",
      story: "Master Amit is renowned for his exquisite wood carvings that blend ancient Chinese motifs with contemporary functionality. His work reflects the harmony between nature and craftsmanship.",
      image: "/images/artisan4.png",
      specialties: ["Fine Wood Carving", "Furniture Making", "Architectural Elements"]
    }
  ];

  const stats = [
    { number: "50+", label: "Skilled Artisans" },
    { number: "15+", label: "Countries" },
    { number: "1000+", label: "Handmade Products" },
    { number: "25+", label: "Traditional Crafts" }
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />
      <Reveal delay={0.2}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7D4F2C]/10 to-[#FDFBF7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C2C2C]">
              Meet Our <span className="text-[#7D4F2C]">Artisans</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#2C2C2C]/80 leading-relaxed max-w-3xl mx-auto">
              Behind every handmade treasure is a story of passion, tradition, and exceptional craftsmanship. 
              Get to know the talented artisans who pour their heart and soul into creating unique pieces for you.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#7D4F2C] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-[#2C2C2C]/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-16">
            {artisans.map((artisan, index) => (
              <div 
                key={artisan.id}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Artisan Image */}
                
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    {/* Placeholder for image - you can replace with actual Image component */}
                    <div className="w-full h-full bg-gradient-to-br from-[#7D4F2C]/20 to-[#EDE7E1] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">👨‍🎨</div>
                        <p className="text-[#7D4F2C] font-medium">{artisan.name}</p>
                      </div>
                    </div>
                    
                     <Image
                      src={artisan.image}
                      alt={artisan.name}
                      fill
                      className="object-cover"
                    /> 
                  </div>
                </div>

                {/* Artisan Content */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] mb-2">
                        {artisan.name}
                      </h3>
                      <p className="text-lg text-[#7D4F2C] font-medium mb-1">
                        {artisan.craft}
                      </p>
                      <p className="text-[#2C2C2C]/70 flex items-center gap-2">
                        📍 {artisan.location} • ⏳ {artisan.experience}
                      </p>
                    </div>
                    

                    <p className="text-[#2C2C2C]/80 leading-relaxed text-lg">
                      {artisan.story}
                    </p>

                    <div>
                      <h4 className="font-semibold text-[#2C2C2C] mb-3">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {artisan.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#EDE7E1] text-[#7D4F2C] rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/artisans/${artisan.id}`}>
                      <button className="bg-[#7D4F2C] text-white px-6 py-3 rounded-lg hover:bg-[#6b4125] transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        View Full Portfolio
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#7D4F2C]/5 to-[#EDE7E1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#2C2C2C]">
              Support Traditional <span className="text-[#7D4F2C]">Craftsmanship</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#2C2C2C]/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Every purchase helps preserve ancient techniques and supports artisans in continuing their craft for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <button className="bg-[#7D4F2C] text-white px-8 py-4 rounded-lg hover:bg-[#6b4125] transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Explore Their Work
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-[#7D4F2C] text-[#7D4F2C] px-8 py-4 rounded-lg hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 text-lg font-medium">
                  Become an Artisan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal delay={0.1}>
      <Footer />
      </Reveal>
    </div>
  );
}