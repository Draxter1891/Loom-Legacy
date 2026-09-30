import { NavLink } from "react-router";
import { Search, Bookmark, ShoppingBag, UserRound } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "HOME", path: "/home" },
    { name: "ALL PRODUCTS", path: "/shop" },
    { name: "CART", path: "/cart" },
    { name: "PROFILE", path: "/profile" },
  ];

  return (
    <header className="w-full bg-[#121216] text-[#e8e1d8]">
      <nav className="mx-auto flex h-20 w-full items-center justify-between px-4 lg:px-10">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-3 shrink-0">
          {/* Logo mark */}
          <div className="relative flex h-7 w-7 items-center justify-center">
            <span className="text-xl font-light text-[#cdb58c]">⌘</span>
          </div>

          <span className="font-serif text-[22px] font-semibold tracking-tight">
            Loom & Legacy
          </span>
        </NavLink>

        {/* Navigation */}
        <div className="hidden items-center gap-14 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-7 text-[12px] font-semibold tracking-[0.08em] transition-colors ${
                  isActive
                    ? "text-[#d7b987]"
                    : "text-[#bdb8b1] hover:text-[#e8e1d8]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-5 left-0 h-px w-full bg-[#d7b987]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-[#c9c3ba] transition hover:text-[#e5d0ae]"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          <button
            aria-label="Wishlist"
            className="hidden text-[#c9c3ba] transition hover:text-[#e5d0ae] sm:block"
          >
            <Bookmark size={19} strokeWidth={1.8} />
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            aria-label="Cart"
            className="relative text-[#c9c3ba] transition hover:text-[#e5d0ae]"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {/* Cart count */}
            <span className="absolute -right-2 -top-3 flex h-4.25 min-w-4.25 items-center justify-center rounded-full bg-[#dfc18f] px-1 text-[9px] font-bold text-[#25211c]">
              2
            </span>
          </NavLink>

          {/* Profile */}
          <button
            aria-label="Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0c293] text-[#28231d] transition hover:bg-[#ead0a6]"
          >
            <UserRound size={17} strokeWidth={1.8} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
