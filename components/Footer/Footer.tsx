import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-between items-center px-[5vmax] py-[3vmax] absolute bottom-0 z-40">
      <p className="font-mono font-semibold tracking-widest text-[0.9vmax] text-secondary cursor-text selection:bg-secondary selection:text-primary">
        &copy;2023
      </p>
      <div className="flex items-center">
        <Link
          className="font-mono font-semibold uppercase will-change-transform tracking-widest mr-[2vmax] text-[0.9vmax] text-transparent relative select-none link before:content-['Linked-In'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Linked-In'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:italic hover:after:italic hover:before:translate-x-[-10%]"
          href="https://ca.linkedin.com/"
        >
          Linked-In
        </Link>
        <Link
          className="font-mono font-semibold uppercase will-change-transform tracking-widest text-[0.9vmax] text-transparent relative select-none link before:content-['Github'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Github'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:italic hover:after:italic hover:before:translate-x-[-10%]"
          href="https://github.com/saddagada1"
        >
          Github
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
