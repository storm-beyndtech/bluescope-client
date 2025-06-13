import Header from "@/components/Layouts/KycLayout/Header";
import ProofOfIdentificationForm from "@/components/ProofOfIdentificationForm";

export default function KYC() {
	return (
		<div className="bg-slate-50 dark:bg-slate-950">
			<Header />
			<ProofOfIdentificationForm />;
		</div>
	);
}
