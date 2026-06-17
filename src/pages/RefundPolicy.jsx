import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
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
            Refund & Cancellation <span className="text-[#cba358]">Policy</span>
          </h1>
          <div className="w-24 h-1 bg-[#cba358] mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              1. General Policy
            </h2>
            <p className="mb-4">
              At the Equestrian Federation of Haryana, we strive to ensure a smooth and transparent registration process for all events, memberships, and activities. This policy outlines the conditions under which refunds and cancellations are processed.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              2. Event Registrations
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-400">
              <li>
                <strong className="text-white">Cancellations by Participant:</strong> If you cancel your registration at least 14 days before the event start date, you are eligible for a 50% refund. Cancellations made less than 14 days prior to the event are strictly non-refundable.
              </li>
              <li>
                <strong className="text-white">Event Modifications or Cancellations:</strong> If the Equestrian Federation of Haryana cancels or postpones an event due to unforeseen circumstances (e.g., weather conditions, regulatory directives), registered participants will be offered the choice of a full refund or transferring their registration to the rescheduled date.
              </li>
              <li>
                <strong className="text-white">No-Shows:</strong> No refunds will be provided for participants who fail to attend an event without prior notification.
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              3. Memberships
            </h2>
            <p className="mb-4">
              Membership fees (annual, lifetime, etc.) are non-refundable once processed. Memberships cannot be transferred to another individual.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              4. Processing Time
            </h2>
            <p className="mb-4">
              Approved refunds will be processed within 7-14 business days. The refunded amount will be credited back to the original payment method used during the transaction. Please note that it may take additional time for your bank or credit card company to process and post the refund to your account.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#cba358] rounded-full inline-block"></span>
              5. How to Request a Refund
            </h2>
            <p className="mb-4">
              To request a refund or cancellation, please email us directly with your transaction details and reason for cancellation:
            </p>
            <div className="bg-black/30 p-6 rounded border border-white/5">
              <p>Email: <a href="mailto:effharyana@gmail.com" className="text-[#cba358] hover:underline">effharyana@gmail.com</a></p>
              <p>Please include your Registration ID, Name, and Event details in the email subject line.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
