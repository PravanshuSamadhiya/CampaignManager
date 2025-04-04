
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  return (
    <header className="border-b border-border bg-[#643969] text-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="outline"
          size="icon"
          className="mr-4 block lg:hidden bg-transparent hover:bg-purple border-purple"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Campaign Spark</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="bg-transparent text-white border-white">
            Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
