import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1f] to-[#09102b] text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full p-8 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg shadow-lg">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mt-4 mb-6 text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
            About Us
          </h1>
        </header>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-2">Our Story</h2>
            <p className="text-lg">
              AlphaStore was founded in 2025 with a vision to revolutionize
              modern fashion. Driven by creativity and a commitment to quality,
              we have quickly emerged as a trendsetter in the industry. Our
              journey is defined by innovation, sustainability, and a passion
              for empowering our customers.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-lg">
              Our mission is to blend cutting-edge design with the latest
              technology to create collections that are both stylish and
              timeless. We believe that fashion should be accessible, inclusive,
              and empower every individual to express their unique style.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">Our Values</h2>
            <p className="text-lg">
              At AlphaStore, we value innovation, integrity, and customer
              satisfaction. We are committed to sustainability and ethical
              practices while delivering exceptional service and high-quality
              products.
            </p>
          </section>
          <section className="text-center mt-8">
            <p className="text-lg">
              Join us on our journey as we continue to redefine modern fashion
              and create a future where style meets innovation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
