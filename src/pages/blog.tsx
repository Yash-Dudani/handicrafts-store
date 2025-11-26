import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Reveal from "@/components/animations/Reveal";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Handcrafted Living",
      summary: "Discover why handmade products bring a unique warmth and character into your home that mass-produced items simply cannot match.",
      content: "In today's fast-paced world of mass production, handcrafted items offer a refreshing connection to authenticity and human touch. Each handmade piece carries the unique fingerprints of its creator, telling a story that factory-made products simply cannot replicate. From the slight variations in texture to the thoughtful design choices, these imperfections become perfections that add character and soul to your living space.",
      date: "2024-01-15",
      readTime: "3 min read",
      category: "Lifestyle",
      author: {
        name: "Sarah Chen",
        role: "Interior Designer & Craft Enthusiast"
      }
    },
    {
      id: 2,
      title: "Meet the Artisan: Stories Behind the Craft",
      summary: "Explore the journey, struggles, and passion of our local artisans who keep traditional crafts alive.",
      content: "Behind every beautiful handmade item at Handmade Haven is a dedicated artisan with a unique story. Take Maria Gonzalez, our ceramic artist from Oaxaca, who learned pottery from her grandmother at age six. Or Raj Patel, whose family has been weaving textiles for four generations. These artisans aren't just creating products; they're preserving cultural heritage and pouring their life experiences into every piece they make.",
      date: "2024-01-10",
      readTime: "4 min read",
      category: "Artisan Stories",
      author: {
        name: "James Wilson",
        role: "Cultural Anthropologist"
      }
    },
    {
      id: 3,
      title: "Sustainable Gifting: Why Handmade Wins",
      summary: "Learn why handcrafted gifts create deeper emotional connections while being kinder to our planet.",
      content: "When you choose handmade gifts, you're making a conscious decision to support sustainable practices. Unlike mass production that often involves wasteful processes and questionable labor practices, handmade items typically use locally sourced materials, generate less waste, and support fair wages for artisans. Plus, the emotional value of a gift that someone poured their heart into creating far surpasses anything you can find on a factory assembly line.",
      date: "2024-01-05",
      readTime: "3 min read",
      category: "Sustainability",
      author: {
        name: "Emma Rodriguez",
        role: "Environmental Advocate"
      }
    },
    {
      id: 4,
      title: "The History of Traditional Weaving Techniques",
      summary: "A deep dive into ancient weaving methods that have been passed down through generations.",
      content: "Traditional weaving is more than just creating fabric; it's a language of patterns, colors, and techniques that tell the story of communities. From the intricate ikat patterns of Indonesia to the bold geometric designs of Navajo textiles, each weaving tradition carries centuries of cultural knowledge. At Handmade Haven, we work with artisans who preserve these ancient techniques while adapting them for contemporary life.",
      date: "2023-12-28",
      readTime: "5 min read",
      category: "Craft Techniques",
      author: {
        name: "Dr. Anika Sharma",
        role: "Textile Historian"
      }
    },
    {
      id: 5,
      title: "Caring for Your Handmade Treasures",
      summary: "Essential tips to maintain and preserve your handmade items for years to come.",
      content: "Handcrafted items require special care to ensure they last for generations. Whether it's wooden utensils, ceramic tableware, or textile art, each material has its own maintenance needs. Proper care not only preserves the beauty of these pieces but also honors the craftsmanship that went into creating them. We'll guide you through the best practices for cleaning, storing, and maintaining various types of handmade products.",
      date: "2023-12-20",
      readTime: "4 min read",
      category: "Care Guide",
      author: {
        name: "Lisa Thompson",
        role: "Conservation Specialist"
      }
    },
    {
      id: 6,
      title: "The Rise of the Maker Movement",
      summary: "How modern artisans are reshaping consumer culture one handmade piece at a time.",
      content: "The maker movement represents a powerful shift away from disposable consumer culture toward meaningful, lasting connections with the items we use daily. Modern artisans combine traditional skills with contemporary design sensibilities, creating pieces that are both functional and artistic. This movement isn't just about buying products; it's about participating in a story and supporting real people who love what they do.",
      date: "2023-12-15",
      readTime: "4 min read",
      category: "Craft Culture",
      author: {
        name: "Michael Brooks",
        role: "Cultural Commentator"
      }
    }
  ];

  const categories = ["All", "Lifestyle", "Artisan Stories", "Sustainability", "Craft Techniques", "Care Guide", "Craft Culture"];

  // Category icons mapping
  const categoryIcons = {
    "Lifestyle": "🏡",
    "Artisan Stories": "👨‍🎨", 
    "Sustainability": "🌱",
    "Craft Techniques": "🛠️",
    "Care Guide": "✨",
    "Craft Culture": "🎨"
  };

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />

     
      {/* Blog Header */}
      <Reveal delay={0.2}>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FDFBF7] to-[#F9F5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C2C2C]">
            Handmade Stories
          </h1>
          <p className="text-lg sm:text-xl text-[#2C2C2C]/70 max-w-2xl mx-auto leading-relaxed">
            Discover the stories behind our crafts, learn about traditional techniques, 
            and explore the world of handmade living through our blog.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-[#E8E2D6] text-[#2C2C2C] hover:bg-[#7D4F2C] hover:text-white transition-colors duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl shadow-sm border border-[#E8E2D6] overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#7D4F2C]/20 group"
              >
                {/* Blog Image - Professional Gradient with Icon */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#7D4F2C]/10 to-[#EDE7E1]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {categoryIcons[post.category as keyof typeof categoryIcons] || "📝"}
                      </div>
                      <p className="text-[#7D4F2C] font-medium text-sm capitalize">{post.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#7D4F2C]">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-[#2C2C2C]/60 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-[#2C2C2C] mb-3 leading-tight group-hover:text-[#7D4F2C] transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-[#2C2C2C]/70 leading-relaxed mb-4 text-sm">
                    {post.summary}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D6]">
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">{post.author.name}</p>
                      <p className="text-xs text-[#2C2C2C]/60">{post.author.role}</p>
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-[#7D4F2C] font-medium hover:text-[#2C2C2C] transition-colors group"
                    >
                      Read More
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-[#7D4F2C] text-white px-8 py-3 rounded-lg hover:bg-[#2C2C2C] transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F9F5F0] to-[#FDFBF7]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            Stay Inspired
          </h2>
          <p className="text-[#2C2C2C]/70 mb-8 max-w-xl mx-auto">
            Join our newsletter to receive updates on new articles, artisan stories, 
            and exclusive insights into the world of handmade crafts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-[#E8E2D6] focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C]"
            />
            <button className="bg-[#7D4F2C] text-white px-6 py-3 rounded-lg hover:bg-[#2C2C2C] transition-colors whitespace-nowrap">
              Subscribe
            </button>
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