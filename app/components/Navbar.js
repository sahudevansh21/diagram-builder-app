"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-logo">
          Diagram Builder
        </Link>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/editor" className={`nav-link ${pathname.startsWith('/editor') ? 'active' : ''}`}>
            Editor
          </Link>
          <Link href="/my-diagrams" className={`nav-link ${pathname.startsWith('/my-diagrams') ? 'active' : ''}`}>
            My Diagrams
          </Link>
          <Link href="/export" className={`nav-link ${pathname.startsWith('/export') ? 'active' : ''}`}>
            Export
          </Link>
        </div>
      </div>
    </nav>
  );
}
