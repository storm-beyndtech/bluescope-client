import { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";

export default function AdminDepositCards() {
	const [transactions, setTransactions] = useState<any[]>([]);
	const [totalDeposit, setTotalDeposit] = useState(0);
	const [pendingDeposits, setPendingDeposits] = useState(0);
	const [rejectedDeposit, setRejectedDeposits] = useState(0);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchUserTransactions = async () => {
		try {
			const res = await fetch(`${url}/transactions`);
			const data = await res.json();

			if (res.ok) setTransactions(data);
			else throw new Error(data.message);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserTransactions();

		if (transactions.length > 0) {
			const depositsTransactions = transactions.filter((transaction: any) => transaction.type === "deposit");

			const depositSum = depositsTransactions
				.filter((transaction: any) => transaction.status === "success")
				.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

			const pendingSum = depositsTransactions.filter(
				(transaction: any) => transaction.status === "pending",
			).length;

			const failedSum = depositsTransactions.filter(
				(transaction: any) => transaction.status === "failed",
			).length;

			setTotalDeposit(depositSum);
			setPendingDeposits(pendingSum);
			setRejectedDeposits(failedSum);
		}
	}, [transactions.length]);

	return (
		<div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Total Deposit</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						{Number(totalDeposit).toLocaleString("en-US")}
						<span className="text-xs font-light text-gray-600">$</span>
					</h2>
					<CiSaveDown2 className="text-3xl text-green-500" />
				</div>
			</div>

			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Pending Deposits</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						{Number(pendingDeposits).toLocaleString("en-US")}
					</h2>
					<CiSaveDown2 className="text-3xl text-warning" />
				</div>
			</div>

			<div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
				<p className="text-xs font-light text-gray-600 dark:text-gray-300">Rejected Deposits</p>

				<div className="w-full flex items-end justify-between">
					<h2 className="text-4xl font-medium text-gray-800 dark:text-slate-300">
						{Number(rejectedDeposit).toLocaleString("en-US")}
					</h2>
					<CiSaveDown2 className="text-3xl text-rose-500" />
				</div>
			</div>
		</div>
	);
}
