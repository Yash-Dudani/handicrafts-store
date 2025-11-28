export default function BlogPreview() {
  const blogs = [
    {
      id: 1,
      title: "The Art of Handcrafted Living",
      summary: "Discover why handmade products bring a unique warmth and character into your home.",
      date: "2024-01-15",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Meet the Artisan: Stories Behind the Craft",
      summary: "Explore the journey, struggles, and passion of our local artisans.",
      date: "2024-01-10",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Sustainable Gifting: Why Handmade Wins",
      summary: "Learn why handcrafted gifts create deeper emotional connections.",
      date: "2024-01-05",
      readTime: "3 min read"
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#2C2C2C]">
        From Our Blog
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="p-6 rounded-xl shadow-lg border border-[#D4B896] hover:shadow-xl transition-all duration-300 bg-[#EDE4D8] hover:bg-[#E5D9C8] group transform hover:-translate-y-1"
          >
            <div className="flex items-center text-sm text-[#7D4F2C] font-semibold mb-3">
              <span>{blog.date}</span>
              <span className="mx-2">•</span>
              <span className="bg-[#7D4F2C]/10 px-2 py-1 rounded-full text-[#7D4F2C]">
                {blog.readTime}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-3 leading-tight group-hover:text-[#7D4F2C] transition-colors">
              {blog.title}
            </h3>
            <p className="text-[#2C2C2C]/90 leading-relaxed mb-4 text-[15px] font-medium">
              {blog.summary}
            </p>
            <a
              href="/blog"
              className="inline-flex items-center text-[#7D4F2C] font-semibold hover:text-[#2C2C2C] transition-colors group/readmore border-b-2 border-transparent hover:border-[#7D4F2C] pb-1"
            >
              Read More
              <span className="ml-2 group-hover/readmore:translate-x-2 transition-transform">→</span>
            </a>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <a 
          href="/blog" 
          className="inline-block bg-[#7D4F2C] text-white px-10 py-4 rounded-xl hover:bg-[#6b4125] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 font-semibold text-lg"
        >
          View All Blog Posts
        </a>
      </div>
    </section>
  );
}