import React, { useEffect, useState } from "react";
import {
	X,
	TrendingUp,
	Clock,
	CheckCircle,
	XCircle,
	Users,
	DollarSign,
	Calendar,
	AlertCircle,
} from "lucide-react";

interface User {
	id: string;
	email: string;
	name: string;
}

interface WalletData {
	address?: string;
	network?: string;
	coinName?: string;
	convertedAmount?: number;
}

interface PlanData {
	plan: string;
	duration: string;
	interest: number;
}

interface ITransaction {
	_id: string;
	type: string;
	user: User;
	status: "pending" | "approved" | "rejected" | "completed";
	amount: number;
	date: string;
	walletData: WalletData;
	planData: PlanData;
}

interface ManageInvestmentModalProps {
	toggleModal: (e: boolean) => void;
	investment: ITransaction | null;
}

const ManageInvestmentModal: React.FC<ManageInvestmentModalProps> = ({ toggleModal, investment }) => {
	const [error, setError] = useState<string | null>(null);
	const [successLoading, setSuccessLoading] = useState(false);
	const [rejectedLoading, setRejectedLoading] = useState(false);
	const [completedLoading, setCompletedLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const convertDate = (date: string): string => {
		return new Date(date).toLocaleString();
	};

	const calculateMaturityDate = (startDate: string, duration: string): string => {
		const start = new Date(startDate);
		const durationNum = parseInt(duration);
		const maturity = new Date(start);
		maturity.setDate(start.getDate() + durationNum);
		return maturity.toLocaleDateString();
	};

	const calculateInterestAmount = (amount: number, interest: number): number => {
		return (amount * interest) / 100;
	};

	const startUpdate = async (status: "approved" | "rejected" | "completed") => {
		setError(null);
		setSuccess(null);

		if (status === "approved") setSuccessLoading(true);
		else if (status === "rejected") setRejectedLoading(true);
		else setCompletedLoading(true);

		try {
			const res = await fetch(`${url}/plans/investment/${investment?._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					status,
				}),
			});

			const data = await res.json();

			if (res.ok) setSuccess(data.message);
			else throw new Error(data.message);
		} catch (error: any) {
			setError(error.message);
			console.log(error.message);
		} finally {
			setSuccessLoading(false);
			setRejectedLoading(false);
			setCompletedLoading(false);
		}
	};

	if (!investment) return null;

	const interestAmount = calculateInterestAmount(investment.amount, investment.planData.interest);
	const totalReturn = investment.amount + interestAmount;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
			<div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
							<TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Investment</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">{investment.planData.plan} Plan</p>
						</div>
					</div>
					<button
						onClick={() => toggleModal(false)}
						className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Status Badge */}
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
						<span
							className={`px-3 py-1 rounded-full text-xs font-semibold ${
								investment.status === "pending"
									? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
									: investment.status === "approved"
									? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
									: investment.status === "completed"
									? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
									: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
							}`}
						>
							{investment.status.toUpperCase()}
						</span>
					</div>

					{/* User Information */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<Users className="w-4 h-4" />
							Investor Details
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">{investment.user.name}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
									{investment.user.email}
								</p>
							</div>
						</div>
					</div>

					{/* Investment Details */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<DollarSign className="w-4 h-4" />
							Investment Details
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{investment.planData.plan}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{investment.planData.duration} days
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Principal Amount</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									${investment.amount.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{investment.planData.interest}%
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Interest Amount</p>
								<p className="text-sm font-medium text-green-600 dark:text-green-400">
									${interestAmount.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Total Return</p>
								<p className="text-sm font-medium text-blue-600 dark:text-blue-400">
									${totalReturn.toLocaleString()}
								</p>
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
						<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							Timeline
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Start Date</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{convertDate(investment.date)}
								</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 dark:text-gray-400">Maturity Date</p>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{calculateMaturityDate(investment.date, investment.planData.duration)}
								</p>
							</div>
						</div>
					</div>

					{/* Payment Information */}
					{investment.walletData.coinName && (
						<div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
							<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								Payment Information
							</h4>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-gray-500 dark:text-gray-400">Method</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{investment.walletData.coinName}
									</p>
								</div>
								<div>
									<p className="text-xs text-gray-500 dark:text-gray-400">Network</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{investment.walletData.network || "N/A"}
									</p>
								</div>
								<div className="col-span-2">
									<p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
									<p className="text-sm font-medium text-gray-900 dark:text-white break-all">
										{investment.walletData.address || "N/A"}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					{investment.status === "pending" && (
						<div className="flex gap-3">
							<button
								onClick={() => startUpdate("approved")}
								disabled={successLoading}
								className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
							>
								<CheckCircle className="w-4 h-4" />
								{successLoading ? "Approving..." : "Approve"}
							</button>
							<button
								onClick={() => startUpdate("rejected")}
								disabled={rejectedLoading}
								className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
							>
								<XCircle className="w-4 h-4" />
								{rejectedLoading ? "Rejecting..." : "Reject"}
							</button>
						</div>
					)}

					{investment.status === "approved" && (
						<button
							onClick={() => startUpdate("completed")}
							disabled={completedLoading}
							className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
						>
							<TrendingUp className="w-4 h-4" />
							{completedLoading ? "Completing..." : "Mark as Completed"}
						</button>
					)}

					{/* Success/Error Messages */}
					{error && (
						<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
							<span className="text-sm text-red-700 dark:text-red-300">{error}</span>
						</div>
					)}

					{success && (
						<div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
							<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
							<span className="text-sm text-green-700 dark:text-green-300">{success}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const ManageInvestments: React.FC = () => {
	const [investments, setInvestments] = useState<ITransaction[]>([]);
	const [singleInvestment, setSingleInvestment] = useState<ITransaction | null>(null);
	const [toggle, setToggle] = useState(false);
	const [filter, setFilter] = useState<string>("all");
	const [loading, setLoading] = useState(true);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const toggleModal = (e: boolean) => {
		setToggle(e);
	};

	const manageInvestment = (investment: ITransaction) => {
		setSingleInvestment(investment);
		toggleModal(true);
	};

	const fetchInvestments = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${url}/transactions/investments`);
			const data = await res.json();

			if (res.ok) {
				setInvestments(data.filter((inv: ITransaction) => inv.type === "investment"));
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchInvestments();
	}, [toggle]);

	const filteredInvestments = investments.filter((investment) => {
		if (filter === "all") return true;
		return investment.status === filter;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
			case "approved":
				return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
			case "completed":
				return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
			case "rejected":
				return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
			default:
				return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20";
		}
	};

	const stats = {
		total: investments.length,
		pending: investments.filter((inv) => inv.status === "pending").length,
		approved: investments.filter((inv) => inv.status === "approved").length,
		completed: investments.filter((inv) => inv.status === "completed").length,
		totalValue: investments.reduce((sum, inv) => sum + inv.amount, 0),
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Manage Investments</h1>
					<p className="text-gray-600 dark:text-gray-400">Monitor and manage all investment transactions</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
								<Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
								<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
								<TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 px-3 shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
								<DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">
									${stats.totalValue.toLocaleString()}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filter Tabs */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
					<div className="flex flex-wrap gap-2">
						{["all", "pending", "approved", "completed", "rejected"].map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
									filter === status
										? "bg-blue-600 text-white"
										: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
								}`}
							>
								{status === "all" ? "All Investments" : status.charAt(0).toUpperCase() + status.slice(1)}
							</button>
						))}
					</div>
				</div>

				{/* Investments Table */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					{loading ? (
						<div className="p-8 text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-gray-600 dark:text-gray-400">Loading investments...</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-4">
											Investor
										</th>
										<th scope="col" className="px-6 py-4">
											Plan Details
										</th>
										<th scope="col" className="px-6 py-4">
											Amount
										</th>
										<th scope="col" className="px-6 py-4">
											Date
										</th>
										<th scope="col" className="px-6 py-4">
											Status
										</th>
										<th scope="col" className="px-6 py-4">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredInvestments.length > 0 ? (
										filteredInvestments.map((investment, i) => (
											<tr
												key={i}
												className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
											>
												<td className="px-6 py-4">
													<div className="flex items-center">
														<img
															className="w-10 h-10 rounded-full"
															src={`https://robohash.org/${investment.user.id}`}
															alt="Avatar"
														/>
														<div className="ml-3">
															<div className="text-sm font-medium text-gray-900 dark:text-white">
																{investment.user.name.length > 20
																	? investment.user.name.slice(0, 18) + "..."
																	: investment.user.name}
															</div>
															<div className="text-sm text-gray-500 dark:text-gray-400">
																{investment.user.email.length > 25
																	? investment.user.email.slice(0, 23) + "..."
																	: investment.user.email}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900 dark:text-white">
														{investment.planData.plan}
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														{investment.planData.duration} days • {investment.planData.interest}%
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900 dark:text-white">
														${investment.amount.toLocaleString()}
													</div>
													<div className="text-sm text-gray-500 dark:text-gray-400">
														+${((investment.amount * investment.planData.interest) / 100).toLocaleString()}{" "}
														interest
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
													{investment.date.slice(0, 10)}
												</td>
												<td className="px-6 py-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
															investment.status,
														)}`}
													>
														{investment.status.toUpperCase()}
													</span>
												</td>
												<td className="px-6 py-4">
													<button
														onClick={() => manageInvestment(investment)}
														className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
													>
														Manage
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={6} className="px-6 py-12 text-center">
												<TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
												<p className="text-gray-500 dark:text-gray-400">No investments found</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Modal */}
				{toggle && <ManageInvestmentModal toggleModal={toggleModal} investment={singleInvestment} />}
			</div>
		</div>
	);
};

export default ManageInvestments;
