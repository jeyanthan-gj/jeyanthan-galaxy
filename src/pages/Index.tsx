import SpaceBackground from '@/components/3d/SpaceBackground';
import Navigation from '@/components/portfolio/Navigation';
import Header from '@/components/portfolio/Header';
import About from '@/components/portfolio/About';
import Profiles from '@/components/portfolio/Profiles';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

/**
 * Main portfolio index page with 3D animations and smooth scrolling
 * Features comprehensive sections showcasing Jeyanthan GJ's professional profile
 */
const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* 3D Animated Background */}
      <SpaceBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 mx-auto">
        {/* Hero Section */}
        <section id="home">
          <Header />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Profiles Section */}
        <section id="profiles">
          <Profiles />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Experience />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
