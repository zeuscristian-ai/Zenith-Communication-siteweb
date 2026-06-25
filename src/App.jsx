import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Works from "./components/Works";
import Studio from "./components/Studio";
import Industries from "./components/Industries";
import Services from "./components/Services";
import Milestones from "./components/Milestones";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <Works />
        <Services />
        <Studio />
        <Industries />
        <Milestones />
        <Insights />
      </main>
      <Footer />
    </>
  );
}
