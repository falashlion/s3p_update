import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Authentication from './components/Authentication';
import ClientLibraries from './components/ClientLibraries';
import ApiReference from './components/ApiReference';
import UseCases from './components/UseCases';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
      <Footer />
    </div>
  );
}

export default App