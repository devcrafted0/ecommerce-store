'use client';

import { usePathname } from 'next/navigation';
import Navabar from './Navabar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register', '/otp', '/termsofservice', '/privacy-policy'];

  const shouldHideNavbar = hideNavbarRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (shouldHideNavbar) return null;

  return <Navabar />;
}
