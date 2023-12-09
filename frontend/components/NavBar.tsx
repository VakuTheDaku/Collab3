import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status }: any = useSession<any>()
  return (
    <Navbar isBlurred isBordered className="bg-black">
      <NavbarBrand>
        <p className="font-bold text-inherit">COLLAB 3</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/music" className="text-white">
            Music
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/marketplace" className="text-white" aria-current="page">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/mixer" className="text-white">
            Mixer
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button onClick={() => {
            status !== "authenticated" ? signIn("spotify") : signOut()
          }}>
            {
              status === "authenticated" ?
                session.user.display_name
                :
                "Login"
            }</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
