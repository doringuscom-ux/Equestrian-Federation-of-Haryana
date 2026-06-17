import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
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
            Terms of <span className="text-[#cba358]">Service</span>
          </h1>
          <div className="w-24 h-1 bg-[#cba358] mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              2. User Accounts
            </h2>
            <p className="mb-4">
              If you register an account on our website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              3. Payment and Fees
            </h2>
            <p className="mb-4">
              Certain services, such as event registrations and memberships, require payment of fees. You agree to pay all applicable fees related to your use of our services.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>All payments are processed securely through our authorized payment gateway partners.</li>
              <li>Prices and fees are subject to change without prior notice.</li>
              <li>You agree to provide current, complete, and accurate purchase and account information for all purchases made via our website.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              4. Code of Conduct
            </h2>
            <p className="mb-4">
              You agree to use our website and services only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Posting any unlawful, harassing, defamatory, or abusive content.</li>
              <li>Attempting to gain unauthorized access to any portion of the website or any other systems or networks.</li>
              <li>Interfering with or disrupting the security or performance of the website.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              5. Modification of Terms
            </h2>
            <p className="mb-4">
              The Equestrian Federation of Haryana reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
