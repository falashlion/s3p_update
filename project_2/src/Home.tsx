import React from 'react';
import Header from './home/components/Header';
import Hero from './home/components/Hero';
import Services from './home/components/Services';
import Authentication from './home/components/Authentication';
import ClientLibraries from './home/components/ClientLibraries';
import ApiReference from './home/components/ApiReference';
import UseCases from './home/components/UseCases';
import Contact from './home/components/Contact';
// import Footer from './home/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-hidden">
      <div className="animated-gradient absolute inset-0 -z-10">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <Header />
      <main>
        <Hero />
        <Services />
        <Authentication />
        <ClientLibraries />
        <ApiReference />
        <UseCases />
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App