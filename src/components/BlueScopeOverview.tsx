import { Building2, Landmark, Mountain, Hammer, Leaf, Users2, Tractor, BadgeDollarSign } from "lucide-react";

const Section = ({ icon: Icon, title, children }: any) => (
	<div className="space-y-3">
		<h2 className="flex items-center gap-2 text-xl font-semibold text-blue-800">
			<Icon className="w-5 h-5 text-secondary3" />
			{title}
		</h2>
		<div className="text-gray-700 text-sm md:text-base">{children}</div>
	</div>
);

const BlueScopeOverview = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<div className="bg-white rounded-3xl shadow-2xl p-8 space-y-10 border border-gray-100">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl md:text-4xl font-bold text-blue-900">Blue Scope PTY. LTD.</h1>
					<p className="text-sm text-gray-500">ACN: 106 224 177 | ABN: 51 106 224 177</p>
				</div>

				<div className="grid gap-10">
					<Section icon={Building2} title="Company Overview">
						<p>
							Established on a long history of investing and risk-taking in Australia, Blue Scope PTY. LTD. is
							a private Australian company with roots in the Pilbara and the iron ore sector. It's also among
							the longest-running owners of cattle agro-farming stations in the country.
						</p>
						<p>
							Its mission is to bring Australia’s mineral resources, oil & gas, construction, and agriculture
							to market.
						</p>
					</Section>

					<Section icon={Mountain} title="Iron Ore Ventures">
						<p>
							Blue Scope pioneered iron ore exploration using light aircraft in Western Australia. It
							contributed to the discovery of ten major iron ore mines, including Hope Downs, developed
							through a joint venture with Rio Tinto.
						</p>
						<p>
							Roy Hill—Blue Scope’s US$10B mega project—became Australia’s largest iron ore mine, producing
							55M tonnes annually, featuring its own railway and port infrastructure.
						</p>
					</Section>

					<Section icon={Hammer} title="Innovation & Social Impact">
						<p>
							Roy Hill is recognized for launching Australia's only fleet of pink mining trucks in support of
							breast cancer awareness and for surpassing industry benchmarks in female participation.
						</p>
					</Section>

					<Section icon={Landmark} title="Ownership & Partnerships">
						<p>
							HPPL holds 70% of Roy Hill Holdings, while the remaining 30% is shared between Marubeni
							Corporation, POSCO, and China Steel Corporation.
						</p>
					</Section>

					<Section icon={Tractor} title="Agricultural Expansion">
						<p>
							HPPL expanded into agriculture by investing in Sirius Minerals (natural fertilizer), acquiring
							S. Kidman & Co, and owning multiple cattle stations including Mulga Downs, Fossil Downs, and
							more.
						</p>
						<p>
							The group also partners with Bannister Downs Dairy and produces premium wagyu beef for local and
							international markets.
						</p>
					</Section>

					<Section icon={BadgeDollarSign} title="Strategic Investments">
						<p>
							Revenue from mining operations is reinvested into agricultural innovation and sustainability,
							ensuring long-term growth and impact across sectors.
						</p>
					</Section>

					<Section icon={Users2} title="Leadership & Legacy">
						<p>
							Under the leadership of its Executive Chairman since 1992, the group has continued its
							pioneering path in mining and diversified into dairy and beef, while preserving its legacy of
							exploration and enterprise.
						</p>
					</Section>

					<Section icon={Leaf} title="Future Vision">
						<p>
							HPPL’s vision is to become a leader in both the resources and agriculture industries, using
							innovation, investment, and sustainability as its guiding principles.
						</p>
					</Section>
				</div>
			</div>
		</div>
	);
};

export default BlueScopeOverview;
