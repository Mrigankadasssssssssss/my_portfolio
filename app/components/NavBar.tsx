"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

type Props = {};
export const navigationList = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "GuestBox",
    href: "/guestbox",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];
const NavBar = (props: Props) => {
  const pathname = usePathname();
  return (
    <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5 grid grid-cols-12 ">
      <div className="col-span-6 flex md:col-span-3">
        <Link href="/">
          <h1 className="lg:text-3xl font-bold text-xl">
            Mriganka <span className="text-blue-500 ">Das</span>
          </h1>
        </Link>
      </div>
      <div className="hidden sm:flex justify-center items-center col-span-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationList.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center justify-end md:col-span-3 col-span-6">
        <a href="mailto:your-email@example.com?subject=Contact%20Request&body=Hi%20Mriganka,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you%20regarding%20[Your%20Reason%20Here].%0D%0A%0D%0AThank%20you!">
          <Button
            className="hidden sm:block transform transition-transform duration-700 ease-in-out hover:scale-105"
            variant="default"
          >
            Contact Me
          </Button>
        </a>
        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
