import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/animations/Reveal";
import ContactForm from "@/components/ContactForm"; // ADD THIS IMPORT

export default function Contact() {
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

             
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D6]">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2C2C2C]">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>

              
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