import React from "react";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1f] to-[#09102b] text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full p-8 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg shadow-lg">
        <header className="text-center mb-12">
          <h1 className="products-title">Terms &amp; Conditions</h1>
          <p className="mt-4 text-lg">Effective Date: January 1, 2025</p>
        </header>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
            <p className="text-lg">
              By accessing and using the AlphaStore website (the "Service"), you
              agree to be bound by these Terms and Conditions. If you do not
              agree with any part of these terms, please refrain from using our
              Service.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">2. Purchases</h2>
            <p className="text-lg">
              All purchases made on AlphaStore are subject to our return and
              refund policies. We recommend reviewing these policies before
              making any transaction.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">
              3. Intellectual Property
            </h2>
            <p className="text-lg">
              All content, designs, and graphics on this website are owned by
              AlphaStore and protected by intellectual property laws.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">
              4. Limitation of Liability
            </h2>
            <p className="text-lg">
              AlphaStore shall not be liable for any damages or losses arising
              from the use of our Service.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">
              5. Modifications to Terms
            </h2>
            <p className="text-lg">
              We reserve the right to modify these Terms and Conditions at any
              time. Continued use of the Service implies acceptance of any
              updated terms.
            </p>
          </section>
          <section className="text-center mt-8">
            <p className="text-lg">
              If you have any questions regarding these Terms, please contact
              our support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
