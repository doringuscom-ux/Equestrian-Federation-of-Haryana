import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-['Inter'] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#cba358]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#cba358]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 pt-32 pb-24 px-4 md:px-8 max-w-[1000px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
            Privacy <span className="text-[#cba358]">Policy</span>
          </h1>
          <div className="w-24 h-1 bg-[#cba358] mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              1. Introduction
            </h2>
            <p className="mb-4">
              Welcome to the Equestrian Federation of Haryana ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              2. Data We Collect
            </h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier, title, date of birth and gender.</li>
              <li><strong className="text-white">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong className="text-white">Financial Data:</strong> includes bank account and payment card details processed securely through our payment gateway.</li>
              <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              3. How We Use Your Data
            </h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., event registration, memberships).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              4. Data Security
            </h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
            <p>
              All payment transactions are encrypted and processed securely by our authorized payment gateway partners. We do not store your complete credit/debit card details on our servers.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              5. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-black/30 p-6 rounded border border-white/5">
              <p>Email: <a href="mailto:effharyana@gmail.com" className="text-[#cba358] hover:underline">effharyana@gmail.com</a></p>
              <p>Phone: +91 94680 00044</p>
              <p>Address: G-1, Shopping Arcade, South City-1, Gurgaon, Haryana – 122001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
