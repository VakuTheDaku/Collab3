import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar isBordered isBlurred className="dark">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">COLLAB 3</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3" justify="start">
          <NavbarItem>
            <Link color="foreground" href="music">
              Music
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="art" color="foreground">
              Art
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="dev">
              Dev
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
