import { Avatar, AvatarFallback, AvatarImage } from "../../UI/avatar";
import { useEffect, useState } from "react";
import DarkModeSwitcher from "@/components/UI/DarkModeSwitcher";
import { contextData } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { user } = contextData();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className="bg-slate-50 dark:bg-slate-950 mb-20 px-4 md:px-6 py-2 flex items-center justify-between transition-colors duration-300">
			{/* Left side - Logo/Home link */}
			<div className="flex items-center">
				<Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
					<img src="/logo.png" alt="Company Logo" className="h-8 w-auto" />
				</Link>
			</div>

			{/* Right side - Theme toggle and Avatar */}
			<div className="flex items-center gap-4">
				{/* Theme Toggle */}
				<DarkModeSwitcher variant="neutral" />

				{/* User Avatar (without popover) */}
				<div className="flex items-center space-x-3">
					<div className="relative">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=3b82f6&color=fff`}
								alt="User avatar"
							/>
							<AvatarFallback className="bg-primary text-primary-foreground text-sm">JG</AvatarFallback>
						</Avatar>
						{/* Active green dot */}
						<span className="absolute -bottom-0.5 -right-0.5 block w-3 h-3 rounded-full ring-2 ring-background bg-green-500" />
					</div>
					<div className="hidden md:flex flex-col items-start">
						<span className="text-sm font-medium text-foreground dark:text-white">{user.username}</span>
						<span className="text-xs text-muted-foreground">{user.email}</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
