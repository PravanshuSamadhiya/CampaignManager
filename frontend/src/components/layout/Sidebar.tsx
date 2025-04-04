
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageSquareText, X } from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#643969] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold">Campaign Spark</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <nav className="p-4 space-y-2">
        <Link to="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white hover:text-purple"
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Campaign Dashboard
          </Button>
        </Link>
        <Link to="/linkedin-generator">
          <Button
            variant="ghost"
             className="w-full justify-start text-white hover:bg-white hover:text-purple"
          >
            <MessageSquareText className="mr-2 h-5 w-5" />
            LinkedIn Generator
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
