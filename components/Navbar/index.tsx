import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
	MenuIcon,
} from "@/components/Icons";
import { useAppContext } from "@/contexts/appContext";

export const Navbar = () => {
	const { setSidebar } = useAppContext();

	return (
		<NextUINavbar 
			maxWidth="full" 
			position="sticky" 
			className="shadow-navbar border-b-[1px] border-[#e5e7eb] dark:border-[#3b3b3b] bg-[white] dark:bg-[#111827]"
			onMenuOpenChange={() => setSidebar((prev) => ({ expanded: !prev.expanded }))}
		>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand 
					as="li"
					className="gap-3 max-w-fit"
				>
					<div className="relative flex items-center justify-center w-[30px] h-[30px] border-[4px] border-solid border-[#076dff] rounded-[8px] rotate-45 before:block before:bg-[#007bff] before:w-[10px] before:h-[10px] before:rounded-[50%]" />
				</NavbarBrand>
				<div className="grid w-full">
					<span className="text-medium whitespace-nowrap text-ellipsis box-border list-none font-semibold overflow-hidden">Apenas um texto de exemplo para testar a responsividade do navbar perante, sim, perante um texto grande</span>
				</div>
			</NavbarContent>

			<NavbarContent className="basis-1 !flex-grow-0 pl-4" justify="end">
				<ThemeSwitch />
				<div className="bg-[#e5e7eb] w-[1px] h-6 mx-2 lg:hidden" />
				<NavbarMenuToggle 
					className="lg:hidden"
					id="navbar-toggle"
				/>
			</NavbarContent>
		</NextUINavbar>
	);
};
