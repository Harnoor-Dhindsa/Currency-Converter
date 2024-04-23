import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center relative ml-20">
      <div className="flex-grow text-center">
        <span className="text-white text-3xl font-poppins font-bold">
          Currency Converter
        </span>
      </div>
      <div>
        <Link
          className="text-white text-lg font-semibold px-8 py-2 rounded-xl hover:bg-gray-900"
          href="./Trendings"
        >
          Trendings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
