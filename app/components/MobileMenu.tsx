"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { navigationList } from "./NavBar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {};

const MobileMenu = (props: Props) => {
  const location = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex flex-col px-2 gap-4">
          {navigationList.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={cn(
                location === item.href
                  ? "bg-muted"
                  : "hover:bg-muted bg-opacity-75",
                "group flex items-center p-2 text-sm font-medium rounded-lg"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <SheetFooter className="mt-[200px]">
            <a href="mailto:your-email@example.com?subject=Contact%20Request&body=Hi%20Mriganka,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you%20regarding%20[Your%20Reason%20Here].%0D%0A%0D%0AThank%20you!">
              <Button
                className=" transform transition-transform duration-700 ease-in-out hover:scale-105 "
                variant="default"
              >
                Contact Me
              </Button>
            </a>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
