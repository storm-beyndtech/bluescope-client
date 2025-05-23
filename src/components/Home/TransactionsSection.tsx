"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { useState } from "react";

// Transaction data
const transactions = [
	{
		id: 1,
		name: "Amanda Linna",
		hash: "79f0bfa9ec31ed742d1e7ae257f768534b9494b2ba8a40908b7219178247187b",
		amount: 5179.5772493174,
	},
	{
		id: 2,
		name: "Gina Fernandez",
		hash: "27b06afa15fb3591d9720128ba4df24827e44a2d463fbf003d8439fc2bddaf4c",
		amount: 3761.7779237398,
	},
	{
		id: 3,
		name: "Omkaar Shayana",
		hash: "57f363ce0b3da853b7e7ba02ac25bfc0302c54e0b1fd1248c52f80211879dafe",
		amount: 10015.9243351331,
	},
	{
		id: 4,
		name: "Ariana Mehus",
		hash: "2f5bf4943243a8d83c015afa744e06b81e825e7f29393d579ae39176451376b8",
		amount: 5102.24387,
	},
	{
		id: 5,
		name: "Roland Williams",
		hash: "ebf28da251ec9676d5d31e5c5f205d00e7edebc1b9e58d31d9b9fee8342c37bb",
		amount: 68821.0873599894,
	},
	{
		id: 6,
		name: "Lorraine Murphy",
		hash: "d10e1d90367be5d800764683e21f8d28303269aa7ae7a7789054560f93bde989",
		amount: 4436.7338,
	},
	{
		id: 7,
		name: "Luke Terry",
		hash: "3ab9509fbf349c1707aad0e0d4501952da6a4c02cb3d0fbb98840805a1dfee87",
		amount: 60846.8602941237,
	},
	{
		id: 8,
		name: "Amy Obrien",
		hash: "f6b7f4a890c2e2d5d622c1fbccd3af44a6e913804c1fa8fbcb581050a06fb85f",
		amount: 66084.2027083337,
	},
	{
		id: 9,
		name: "Maria Nemanjić",
		hash: "68ee9197dcae668eb3e22b7592a3a1ff0bdbf2b590598aad465cc5fae2d2d805",
		amount: 60452.7718510725,
	},
	{
		id: 10,
		name: "Rachel Watson",
		hash: "e7fc86de03326fc569e819dbd36e2a01afa9a160349c5341b3f55faa877b7f01",
		amount: 4888.6927803715,
	},
];

export default function TransactionsSection() {
	const [visibleTransactions, setVisibleTransactions] = useState(5);

	// Format hash to show only first and last few characters
	const formatHash = (hash: string) => {
		return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
	};

	// Format amount with commas and 2 decimal places
	const formatAmount = (amount: number) => {
		return amount.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

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
					<h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4">
						Recent Bulk <span className="text-blue-600">Transactions</span>
					</h2>
				</motion.div>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					{/* Table container with controlled width and overflow */}
					<div className="w-full overflow-x-auto" style={{ maxWidth: "100%" }}>
						<table className="w-full min-w-full table-fixed">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
										Name
									</th>
									<th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/5">
										Transaction Hash
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
										Amount (USD)
									</th>
									<th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-16">
										<span className="sr-only">Action</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{transactions.slice(0, visibleTransactions).map((transaction, index) => (
									<motion.tr
										key={transaction.id}
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										viewport={{ once: true }}
										className="hover:bg-gray-50"
									>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-900">
											{transaction.name}
										</td>
										<td className="px-4 py-3 sm:py-4 truncate text-xs sm:text-sm text-gray-500 font-mono">
											{formatHash(transaction.hash)}
										</td>
										<td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-right text-gray-900">
											<div className="flex items-center justify-end">
												<DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-[#1e56ff] mr-1 flex-shrink-0" />
												<span className="truncate">{formatAmount(transaction.amount)}</span>
											</div>
										</td>
										<td className="px-4 py-3 sm:py-4 text-right text-xs sm:text-sm font-medium">
											<a
												href={`/transactions/${transaction.hash}`}
												className="text-[#1e56ff] hover:text-blue-700 block"
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
							<button onClick={showMore} className="text-sm text-[#1e56ff] hover:text-blue-700 font-medium">
								View All Transactions
							</button>
						) : (
							<button onClick={showLess} className="text-sm text-[#1e56ff] hover:text-blue-700 font-medium">
								Show Less
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
