import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status }: any = useSession<any>();
  const router = useRouter();

  return (
    <Navbar isBlurred isBordered className="bg-black">
      <NavbarBrand>
        <p className="font-bold text-inherit">COLLAB 3</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/profile" className={`text-white ${router.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === '/marketplace'}>
          <Link href="/marketplace" className="text-white" aria-current="page">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/mixer" className={`text-white ${router.pathname === '/mixer' ? 'active' : ''}`}>
            Mixer
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button onClick={() => {
            status !== "authenticated" ? signIn("spotify") : signOut();
          }}>
            {
              status === "authenticated" ?
                session.user.display_name
                :
                "Login"
            }
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
