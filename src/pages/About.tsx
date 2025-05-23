import AboutSection from "../components/About/AboutSection";
import Hero from "../components/About/Hero";
import MissionVison from "../components/About/MissionVison";
import Testimonials from "../components/About/Testimonials";
import BlueScopeOverview from "../components/BlueScopeOverview";

const About = () => {
	return (
		<div>
			<Hero />
			<MissionVison />
			<AboutSection />
			<BlueScopeOverview />
			<Testimonials />
		</div>
	);
};

export default About;
