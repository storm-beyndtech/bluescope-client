import Hero from "../components/Home/Hero";
import WhoWeAre from "../components/Home/WhoWeAre";
import InvestorCard from "../components/Home/InvestorCard";
import Cta from "../components/Home/Cta";
import UnifiedBusinessSections from "../components/Home/UnifiedBusinessSections";
import TransactionsSection from "../components/Home/TransactionsSection";
import MissionVision from "../components/About/MissionVison";
import StepsSection from "@/components/Home/StepsSection";
import InvestmentOverviewSection from "@/components/Home/InvestmentOverviewSection";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<WhoWeAre />
			<StepsSection />
			<InvestmentOverviewSection />
			<MissionVision />
			<UnifiedBusinessSections />
			<InvestorCard />
			<TransactionsSection />
			<Cta />
		</div>
	);
};

export default Home;
