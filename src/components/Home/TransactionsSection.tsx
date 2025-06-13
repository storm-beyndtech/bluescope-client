import { motion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface Transaction {
	hash: string;
	time: number;
	value: number;
	from: string;
	to: string;
	symbol: string;
}

// Fallback data that looks like platform transactions
const fallbackTransactions: Transaction[] = [
	{
		hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
		time: Date.now() - 300000,
		value: 15647.89,
		from: "0x742d35Cc6A4E...89Ab",
		to: "0x8ba1f109551bD...23Cd",
		symbol: "USDT",
	},
	{
		hash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
		time: Date.now() - 450000,
		value: 0.045672,
		from: "0x951bD432aA4E...12Ef",
		to: "0x4d35Cc6A742E...67Gh",
		symbol: "BTC",
	},
	{
		hash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
		time: Date.now() - 600000,
		value: 2.847539,
		from: "0x32aA4E951bD4...34Ij",
		to: "0xc6A742d35E8b...78Kl",
		symbol: "ETH",
	},
	{
		hash: "0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
		time: Date.now() - 750000,
		value: 8925.14,
		from: "0x4E951bD432aA...56Mn",
		to: "0x742d35Cc6A8b...90Op",
		symbol: "USDC",
	},
	{
		hash: "0xe5f6789012345678901234567890abcdef1234567890abcdef1234567890",
		time: Date.now() - 900000,
		value: 156.789234,
		from: "0x51bD432aA4E9...12Qr",
		to: "0x2d35Cc6A742E...45St",
		symbol: "BNB",
	},
	{
		hash: "0xf6789012345678901234567890abcdef1234567890abcdef12345678901",
		time: Date.now() - 1200000,
		value: 50000.0,
		from: "0xD432aA4E951b...67Uv",
		to: "0x35Cc6A742d8b...89Wx",
		symbol: "USDT",
	},
	{
		hash: "0x789012345678901234567890abcdef1234567890abcdef123456789012",
		time: Date.now() - 1350000,
		value: 1.256789,
		from: "0x2aA4E951bD43...23Yz",
		to: "0xCc6A742d35E8...56Ab",
		symbol: "ETH",
	},
	{
		hash: "0x89012345678901234567890abcdef1234567890abcdef1234567890123",
		time: Date.now() - 1500000,
		value: 0.0089567,
		from: "0xA4E951bD432a...78Cd",
		to: "0x6A742d35CcE8...01Ef",
		symbol: "BTC",
	},
];

export default function TransactionsSection() {
	const [transactions, setTransactions] = useState<Transaction[]>(fallbackTransactions);
	const [visibleTransactions, setVisibleTransactions] = useState(5);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Format hash to show only first and last few characters
	const formatHash = (hash: string) => {
		return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
	};

	// Format address to show only first and last few characters
	const formatAddress = (address: string) => {
		return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
	};

	// Format amount with appropriate decimal places based on currency
	const formatAmount = (amount: number, symbol: string) => {
		const decimals = ["BTC", "ETH"].includes(symbol) ? 6 : 2;
		return amount.toLocaleString("en-US", {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		});
	};

	// Format time to show relative time
	const formatTime = (timestamp: number) => {
		const now = Date.now();
		const diff = now - timestamp;
		const minutes = Math.floor(diff / 60000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes}m ago`;

		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;

		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	};

	// Simulate periodic data refresh
	useEffect(() => {
		const interval = setInterval(() => {
			setIsRefreshing(true);

			// Simulate API call delay
			setTimeout(() => {
				// Update timestamps to make transactions appear fresh
				setTransactions((prev) =>
					prev.map((tx) => ({
						...tx,
						time: tx.time + Math.random() * 300000, // Add some randomness
					})),
				);
				setIsRefreshing(false);
			}, 800);
		}, 30000); // Refresh every 30 seconds

		return () => clearInterval(interval);
	}, []);

	const showMore = () => {
		setVisibleTransactions(transactions.length);
	};

	const showLess = () => {
		setVisibleTransactions(5);
	};

	return (
		<section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-x-hidden relative w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-8 sm:mb-12"
				>
					<div className="flex items-center gap-3 mb-2 sm:mb-4">
						<h2 className="text-2xl sm:text-3xl font-semibold">
							Latest <span className="text-blue-600">Transactions</span>
						</h2>
						{isRefreshing && <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />}
					</div>
					<p className="text-gray-600 text-sm sm:text-base">
						Real-time transactions across multiple blockchains
					</p>
				</motion.div>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
						<table className="w-full min-w-full table-fixed">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/3">
										Transaction Hash
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
										From
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
										To
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/6">
										Amount
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/8">
										Time
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-16">
										<span className="sr-only">Action</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{transactions.slice(0, visibleTransactions).map((transaction, index) => (
									<motion.tr
										key={transaction.hash}
										initial={{ opacity: 0, y: 10 }}
										animate={{
											opacity: isRefreshing ? 0.6 : 1,
											y: 0,
										}}
										transition={{
											duration: 0.3,
											delay: index * 0.05,
										}}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-900 font-mono">
											{formatHash(transaction.hash)}
										</td>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-500 font-mono">
											{formatAddress(transaction.from)}
										</td>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-500 font-mono">
											{formatAddress(transaction.to)}
										</td>
										<td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-right text-gray-900">
											<div className="flex items-center justify-end">
												<span className="text-xs text-gray-500 mr-1">{transaction.symbol}</span>
												<span className="truncate font-mono">
													{formatAmount(transaction.value, transaction.symbol)}
												</span>
											</div>
										</td>
										<td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
											{formatTime(transaction.time)}
										</td>
										<td className="px-4 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
											<a
												href="#"
												onClick={(e) => e.preventDefault()}
												className="text-blue-600 hover:text-blue-700 block"
											>
												<ArrowUpRight className="h-4 w-4 ml-auto" />
											</a>
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="px-4 py-3 bg-gray-50 text-right">
						{visibleTransactions < transactions.length ? (
							<button onClick={showMore} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
								View All Transactions
							</button>
						) : (
							<button onClick={showLess} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
								Show Less
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
