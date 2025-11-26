import Image from "next/image";
import Reveal from "../animations/Reveal";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

export default function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <Reveal delay={0.1}>
    <div className="bg-white shadow-lg rounded-xl overflow-hidden text-center group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={300} 
          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>
      
      <div className="p-3 sm:p-4 bg-[#2C2C2C] text-white transition-colors duration-300 group-hover:bg-[#7D4F2C]">
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2">{title}</h3>
        <p className="font-medium text-[#FDFBF7] text-sm sm:text-base">Price: {price}</p>
      </div>        
    </div>
    </Reveal>
  );
}