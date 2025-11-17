export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Aarav S.",
      location: "Mumbai",
      message: "The craftsmanship is brilliant! My handcrafted vase looks stunning in my living room.",
      rating: 5,
    },
    {
      id: 2,
      name: "Meera K.",
      location: "Delhi",
      message: "I love how unique every product feels. You can sense the passion behind each creation.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rohan P.",
      location: "Bangalore",
      message: "Amazing quality and such warm customer service. Highly recommend Handmade Haven!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#2C2C2C]">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#E8E2D6] hover:shadow-md transition-all duration-300">
            <div className="flex text-[#FFC107] mb-4">
              {'★'.repeat(testimonial.rating)}
              {'☆'.repeat(5 - testimonial.rating)}
            </div>
            
            <p className="text-[#2C2C2C]/90 italic mb-4 leading-relaxed">
              “{testimonial.message}”
            </p>
            
            <div className="border-t border-[#E8E2D6] pt-4">
              <h4 className="text-lg font-semibold text-[#7D4F2C]">{testimonial.name}</h4>
              <p className="text-sm text-[#2C2C2C]/60">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}