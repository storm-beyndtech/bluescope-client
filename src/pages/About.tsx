import AboutSection from "../components/About/AboutSection";
import Hero from "../components/About/Hero";
import MissionVison from "../components/About/MissionVison";
import PartnersThoughts from "../components/About/PartnersThoughts";
import Testimonials from "../components/About/Testimonials";

const About = () => {
  return (
    <div>
      <Hero/>
      <PartnersThoughts/>
      <MissionVison/>
      <AboutSection/>
      <Testimonials/>
    </div>
  );
}

export default About;
