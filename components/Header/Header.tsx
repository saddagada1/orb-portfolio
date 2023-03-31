import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-between items-center px-[5vmax] py-[3vmax] absolute z-40">
      <Link
        href="/"
        className="group font-sans font-black uppercase tracking-widest text-[1.25vmax] text-secondary flex selection:bg-secondary selection:text-primary"
      >
        <span className="italic text-transparent will-change-transform relative mr-[0.5vmax] link before:content-['Saivamsi'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Saivamsi'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary group-hover:before:translate-x-[-10%]">
          Saivamsi
        </span>
        Addagada
      </Link>
      <div className="flex items-center">
        <Link
          className="font-mono font-semibold uppercase will-change-transform tracking-widest mr-[2vmax] text-[0.9vmax] text-transparent relative select-none link before:content-['Index'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Index'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:italic hover:after:italic hover:before:translate-x-[-15%]"
          href="/"
        >
          Index
        </Link>
        <Link
          className="font-mono font-semibold uppercase will-change-transform tracking-widest mr-[2vmax] text-[0.9vmax] text-transparent relative select-none link before:content-['Projects'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Projects'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:italic hover:after:italic hover:before:translate-x-[-10%]"
          href="/projects"
        >
          Projects
        </Link>
        <Link
          className="font-mono font-semibold uppercase will-change-transform tracking-widest text-[0.9vmax] text-transparent relative select-none link before:content-['About'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['About'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:italic hover:after:italic hover:before:translate-x-[-15%]"
          href="/about"
        >
          About
        </Link>
      </div>
    </header>
  );
};

export default Header;
