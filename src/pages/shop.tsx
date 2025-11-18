import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";

export default function Shop() {
  const products = [
    {
      id: 1,
      image: "/images/jewellery-box.jpg",
      title: "Handmade Wooden Jewellery Box",
      price: "₹400",
      category: "Woodwork"
    },
    {
      id: 2,
      image: "/images/vase.jpg",
      title: "Hand Painted Ceramic Vase",
      price: "₹1250",
      category: "Ceramics"
    },
    {
      id: 3,
      image: "/images/keepsake-box.jpg",
      title: "Handcrafted Wooden Keepsake Box",
      price: "₹980",
      category: "Woodwork"
    },
    {
      id: 4,
      image: "/images/plant-wall-decor.jpg",
      title: "Plant Wall Decor",
      price: "₹750",
      category: "Ceramics"
    },
    {
      id: 5,
      image: "/images/clay-sculpture.jpg",
      title: "Clay Sculpture",
      price: "₹2000",
      category: "Textiles"
    },
    {
      id: 6,
      image: "/images/decorative-teapot.jpg",
      title: "Traditional Decorative Teapot",
      price: "₹1500",
      category: "Metalwork"
    },
    {
      id: 7,
      image: "/images/jewellery-box.jpg",
      title: "Handwoven Basket",
      price: "₹600",
      category: "Textiles"
    },
    {
      id: 8,
      image: "/images/vase.jpg",
      title: "Clay Sculpture",
      price: "₹2000",
      category: "Ceramics"
    },
    {
      id: 9,
      image: "/images/keepsake-box.jpg",
      title: "Wooden Carving Art",
      price: "₹1800",
      category: "Woodwork"
    }
  ];

  const categories = ["All", "Woodwork", "Ceramics", "Textiles", "Metalwork"];

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />

      {/* Shop Header */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#7D4F2C]/10 to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 text-[#2C2C2C] tracking-tight">
            Our <span className="text-[#7D4F2C]">Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our curated selection of handmade treasures. Each piece is crafted with love and tells a unique story of traditional craftsmanship.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full border border-[#7D4F2C] text-[#7D4F2C] hover:bg-[#7D4F2C] hover:text-white transition-all duration-300 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}