import React, { useEffect, useState } from "react";
import {
	TrendingUp,
	Calendar,
	Filter,
	Search,
	Eye,
	Download,
	BarChart3,
	PieChart,
	Activity,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";

interface User {
	id: string;
	email: string;
	name: string;
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
	planData: PlanData;
}

interface InvestmentDetailsModalProps {
	investment: ITransaction | null;
	onClose: () => void;
}

const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({ investment, onClose }) => {
	if (!investment) return null;

	const interestAmount = (investment.amount * investment.planData.interest) / 100;
	const totalReturn = investment.amount + interestAmount;
	const startDate = new Date(investment.date);
	const maturityDate = new Date(startDate);
	maturityDate.setDate(startDate.getDate() + parseInt(investment.planData.duration));

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "completed":
				return <ArrowUpRight className="w-4 h-4 text-green-500" />;
			case "rejected":
				return <ArrowDownRight className="w-4 h-4 text-red-500" />;
			default:
				return <Activity className="w-4 h-4 text-blue-500" />;
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
			<div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white/20 rounded-lg">
								<TrendingUp className="w-6 h-6" />
							</div>
							<div>
								<h2 className="text-xl font-bold">Investment Details</h2>
								<p className="text-blue-100">Transaction ID: {investment._id.slice(-8)}</p>
							</div>
						</div>
						<button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div className="p-6 space-y-6">
					{/* Status and Progress */}
					<div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								{getStatusIcon(investment.status)}
								<span className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
									{investment.status}
								</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								{new Date(investment.date).toLocaleDateString()}
							</div>
						</div>

						{/* Progress Bar */}
						<div className="mb-4">
							<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
								<span>Progress</span>
								<span>
									{investment.status === "completed"
										? "100%"
										: investment.status === "approved"
										? "50%"
										: "25%"}
								</span>
							</div>
							<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
								<div
									className={`h-2 rounded-full transition-all duration-500 ${
										investment.status === "completed"
											? "bg-green-500 w-full"
											: investment.status === "approved"
											? "bg-blue-500 w-1/2"
											: investment.status === "rejected"
											? "bg-red-500 w-1/4"
											: "bg-yellow-500 w-1/4"
									}`}
								/>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4 text-center">
							<div
								className={`p-2 rounded-lg ${
									investment.status !== "pending"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Created</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">✓</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "approved" || investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Approved</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "approved" || investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Matured</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
							<div
								className={`p-2 rounded-lg ${
									investment.status === "completed"
										? "bg-green-100 dark:bg-green-900/20"
										: "bg-gray-100 dark:bg-gray-700"
								}`}
							>
								<div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{investment.status === "completed" ? "✓" : "○"}
								</div>
							</div>
						</div>
					</div>

					{/* Financial Summary */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-blue-500 rounded-lg">
									<TrendingUp className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-blue-900 dark:text-blue-100">Principal Amount</h3>
							</div>
							<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
								${investment.amount.toLocaleString()}
							</p>
						</div>

						<div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-green-500 rounded-lg">
									<BarChart3 className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-green-900 dark:text-green-100">Interest Earned</h3>
							</div>
							<p className="text-2xl font-bold text-green-900 dark:text-green-100">
								${interestAmount.toLocaleString()}
							</p>
							<p className="text-sm text-green-700 dark:text-green-300">
								{investment.planData.interest}% return
							</p>
						</div>

						<div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-2 bg-purple-500 rounded-lg">
									<PieChart className="w-5 h-5 text-white" />
								</div>
								<h3 className="font-semibold text-purple-900 dark:text-purple-100">Total Return</h3>
							</div>
							<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
								${totalReturn.toLocaleString()}
							</p>
							<p className="text-sm text-purple-700 dark:text-purple-300">
								{((interestAmount / investment.amount) * 100).toFixed(1)}% gain
							</p>
						</div>
					</div>

					{/* Investment Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investment Plan</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Plan Type</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.planData.plan}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Duration</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.planData.duration} days
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.planData.interest}%
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Status</span>
									<span
										className={`font-medium capitalize ${
											investment.status === "completed"
												? "text-green-600 dark:text-green-400"
												: investment.status === "approved"
												? "text-blue-600 dark:text-blue-400"
												: investment.status === "rejected"
												? "text-red-600 dark:text-red-400"
												: "text-yellow-600 dark:text-yellow-400"
										}`}
									>
										{investment.status}
									</span>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Start Date</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{startDate.toLocaleDateString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Maturity Date</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{maturityDate.toLocaleDateString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
									<span className="font-medium text-gray-900 dark:text-white">
										{investment.status === "completed"
											? "Completed"
											: Math.max(
													0,
													Math.ceil((maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
											  )}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600 dark:text-gray-400">Investment ID</span>
									<span className="font-mono text-sm text-gray-900 dark:text-white">
										{investment._id.slice(-12)}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Investor Information */}
					<div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investor Information</h3>
						<div className="flex items-center gap-4">
							<img
								src={`https://robohash.org/${investment.user.id}`}
								alt="Avatar"
								className="w-12 h-12 rounded-full"
							/>
							<div>
								<p className="font-medium text-gray-900 dark:text-white">{investment.user.name}</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">{investment.user.email}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const InvestmentHistory: React.FC = () => {
	const [investments, setInvestments] = useState<ITransaction[]>([]);
	const [filteredInvestments, setFilteredInvestments] = useState<ITransaction[]>([]);
	const [selectedInvestment, setSelectedInvestment] = useState<ITransaction | null>(null);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateRange, setDateRange] = useState("all");
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchInvestments = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${url}/transactions/investments`);
			const data = await res.json();

			if (res.ok) {
				const investmentData = data.filter((inv: ITransaction) => inv.type === "investment");
				setInvestments(investmentData);
				setFilteredInvestments(investmentData);
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
	}, []);

	useEffect(() => {
		let filtered = investments;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(inv) =>
					inv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					inv.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
					inv.planData.plan.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Status filter
		if (statusFilter !== "all") {
			filtered = filtered.filter((inv) => inv.status === statusFilter);
		}

		// Date range filter
		if (dateRange !== "all") {
			const now = new Date();
			let startDate = new Date();

			switch (dateRange) {
				case "7days":
					startDate.setDate(now.getDate() - 7);
					break;
				case "30days":
					startDate.setDate(now.getDate() - 30);
					break;
				case "90days":
					startDate.setDate(now.getDate() - 90);
					break;
				case "1year":
					startDate.setFullYear(now.getFullYear() - 1);
					break;
			}

			filtered = filtered.filter((inv) => new Date(inv.date) >= startDate);
		}

		setFilteredInvestments(filtered);
	}, [investments, searchTerm, statusFilter, dateRange]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
			case "approved":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
			case "completed":
				return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
			case "rejected":
				return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
		}
	};

	const calculateStats = () => {
		const completed = filteredInvestments.filter((inv) => inv.status === "completed");
		const totalInvested = filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0);
		const totalReturns = completed.reduce((sum, inv) => {
			const interest = (inv.amount * inv.planData.interest) / 100;
			return sum + inv.amount + interest;
		}, 0);
		const avgReturn =
			completed.length > 0
				? completed.reduce((sum, inv) => sum + inv.planData.interest, 0) / completed.length
				: 0;

		return {
			totalInvestments: filteredInvestments.length,
			totalInvested,
			totalReturns,
			avgReturn,
			completed: completed.length,
		};
	};

	const stats = calculateStats();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Investment History</h1>
							<p className="text-gray-600 dark:text-gray-400">
								Track and analyze all investment transactions and their performance
							</p>
						</div>
						<button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
							<Download className="w-4 h-4" />
							Export Data
						</button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
					<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Investments</p>
								<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
									{stats.totalInvestments}
								</p>
							</div>
							<TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-green-700 dark:text-green-300">Total Invested</p>
								<p className="text-2xl font-bold text-green-900 dark:text-green-100">
									${stats.totalInvested.toLocaleString()}
								</p>
							</div>
							<BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Returns</p>
								<p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
									${stats.totalReturns.toLocaleString()}
								</p>
							</div>
							<PieChart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg. Return</p>
								<p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
									{stats.avgReturn.toFixed(1)}%
								</p>
							</div>
							<Activity className="w-8 h-8 text-orange-600 dark:text-orange-400" />
						</div>
					</div>

					<div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800/30">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Completed</p>
								<p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.completed}</p>
							</div>
							<Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search by investor name, email, or plan..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
							/>
						</div>

						{/* Status Filter */}
						<div className="flex items-center gap-3">
							<Filter className="w-5 h-5 text-gray-400" />
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-[140px]"
							>
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="approved">Approved</option>
								<option value="completed">Completed</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>

						{/* Date Range Filter */}
						<div className="flex items-center gap-3">
							<Calendar className="w-5 h-5 text-gray-400" />
							<select
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
								className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-[140px]"
							>
								<option value="all">All Time</option>
								<option value="7days">Last 7 Days</option>
								<option value="30days">Last 30 Days</option>
								<option value="90days">Last 90 Days</option>
								<option value="1year">Last Year</option>
							</select>
						</div>
					</div>
				</div>

				{/* Investment History Table */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
					{loading ? (
						<div className="p-12 text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
							<p className="text-gray-600 dark:text-gray-400">Loading investment history...</p>
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
											Plan
										</th>
										<th scope="col" className="px-6 py-4">
											Amount
										</th>
										<th scope="col" className="px-6 py-4">
											Returns
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
										filteredInvestments.map((investment, i) => {
											const interestAmount = (investment.amount * investment.planData.interest) / 100;
											const totalReturn = investment.amount + interestAmount;

											return (
												<tr
													key={i}
													className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
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
																	{investment.user.name.length > 18
																		? investment.user.name.slice(0, 16) + "..."
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
													</td>
													<td className="px-6 py-4">
														<div className="text-sm font-medium text-gray-900 dark:text-white">
															${interestAmount.toLocaleString()}
														</div>
														<div className="text-sm text-gray-500 dark:text-gray-400">
															Total: ${totalReturn.toLocaleString()}
														</div>
													</td>
													<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
														{new Date(investment.date).toLocaleDateString()}
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
															onClick={() => setSelectedInvestment(investment)}
															className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
														>
															<Eye className="w-4 h-4" />
															View
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan={7} className="px-6 py-12 text-center">
												<TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
												<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
													No investments found
												</h3>
												<p className="text-gray-500 dark:text-gray-400">
													{searchTerm || statusFilter !== "all" || dateRange !== "all"
														? "Try adjusting your search or filter criteria."
														: "No investment history available."}
												</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Pagination */}
				{filteredInvestments.length > 0 && (
					<div className="flex items-center justify-between mt-6">
						<div className="text-sm text-gray-700 dark:text-gray-300">
							Showing <span className="font-medium">{filteredInvestments.length}</span> of{" "}
							<span className="font-medium">{investments.length}</span> investments
						</div>
						<div className="flex items-center gap-2">
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								Previous
							</button>
							<button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
								1
							</button>
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								2
							</button>
							<button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
								Next
							</button>
						</div>
					</div>
				)}

				{/* Investment Details Modal */}
				{selectedInvestment && (
					<InvestmentDetailsModal
						investment={selectedInvestment}
						onClose={() => setSelectedInvestment(null)}
					/>
				)}
			</div>
		</div>
	);
};

export default InvestmentHistory;
