import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Reveal from "@/components/animations/Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "wholesale",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Success message
    setSuccessMessage("🎉 Thank you! We have received your inquiry.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      inquiryType: "wholesale",
      message: ""
    });

    // Auto hide after 5 sec
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <Navbar />

      {/* Contact Header */}
      <Reveal delay={0.2}>
        <section className="py-12 lg:py-20 bg-gradient-to-br from-[#7D4F2C]/10 to-[#FDFBF7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#2C2C2C]">
                Get In <span className="text-[#7D4F2C]">Touch</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#2C2C2C]/80 leading-relaxed max-w-3xl mx-auto">
                Have questions about our handmade products? Interested in wholesale partnerships? 
                We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D6]">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2C2C2C]">
                  Send Us a Message
                </h2>

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                  <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
                        placeholder="Your company (if applicable)"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
                      >
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="general">General Question</option>
                        <option value="custom">Custom Order</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all resize-vertical"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7D4F2C] text-white py-4 px-6 rounded-lg hover:bg-[#6b4125] transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Store Info & Map */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D6]">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2C2C2C]">
                    Visit Our Store
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 text-[#7D4F2C] mt-1">📍</div>
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C]">Address</h3>
                        <p className="text-[#2C2C2C]/80">
                          123 Artisan Street<br />
                          Colaba, Mumbai<br />
                          Maharashtra 400001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 text-[#7D4F2C] mt-1">📞</div>
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C]">Phone</h3>
                        <p className="text-[#2C2C2C]/80">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 text-[#7D4F2C] mt-1">✉️</div>
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C]">Email</h3>
                        <p className="text-[#2C2C2C]/80">hello@handmadehaven.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 text-[#7D4F2C] mt-1">🕒</div>
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C]">Store Hours</h3>
                        <p className="text-[#2C2C2C]/80">
                          Monday - Saturday: 10:00 AM - 8:00 PM<br />
                          Sunday: 11:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D6]">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2C2C2C]">
                    Find Us
                  </h2>

                  <div className="aspect-video bg-gradient-to-br from-[#7D4F2C]/20 to-[#E8E2D6] rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.213260145964!2d72.83260931490036!3d18.92246398717684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e8013133d7%3A0x63fdc309fe7867a5!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v163"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
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
