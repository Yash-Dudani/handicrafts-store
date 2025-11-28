import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '',
    inquiryType: 'wholesale',
    message: '' 
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMsg("Full Name is required.");
      setStatus('idle');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus('idle');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `
Inquiry Type: ${formData.inquiryType}
Company: ${formData.company || 'Not provided'}
Message: ${formData.message}
          `
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '',
          inquiryType: 'wholesale',
          message: '' 
        });
      } else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "Failed to send message. Please try again.");
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setErrorMsg("Network error occurred.");
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {status === 'success' && (
        <p className="p-3 mb-4 bg-green-100 text-green-700 rounded-md">
          Thank you! Your message has been sent successfully.
        </p>
      )}
      {errorMsg && (
        <p className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
          Error: {errorMsg}
        </p>
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
              className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
              disabled={status === 'loading'}
              required
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
              className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
              disabled={status === 'loading'}
              required
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#2C2C2C] mb-2">
              Phone Number (10 digits) *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#E8E2D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D4F2C]/50 focus:border-[#7D4F2C] transition-all"
              disabled={status === 'loading'}
              required
              placeholder="Your 10-digit phone number"
            />
          </div>

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
              disabled={status === 'loading'}
              placeholder="Your company (if applicable)"
            />
          </div>
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
            disabled={status === 'loading'}
          >
            <option value="wholesale">Wholesale Inquiry</option>
            <option value="general">General Question</option>
            <option value="custom">Custom Order</option>
            <option value="collaboration">Collaboration</option>
            <option value="Become an Artisan">Become an Artisan</option>
            <option value="other">Other</option>
          </select>
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
            disabled={status === 'loading'}
            placeholder="Tell us about your inquiry..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#7D4F2C] text-white py-4 px-6 rounded-lg hover:bg-[#6b4125] transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;