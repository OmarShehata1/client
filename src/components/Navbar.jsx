import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCreateExamOpen && !event.target.closest("#create-exam-dropdown")) {
        setIsCreateExamOpen(false);
      }
      if (isUserMenuOpen && !event.target.closest("#user-menu-dropdown")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreateExamOpen, isUserMenuOpen]);

  const toggleCreateExamDropdown = () => {
    setIsCreateExamOpen(!isCreateExamOpen);
  };

  const toggleUserMenuDropdown = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center">
            <div className="relative bg-blue-600 text-white text-xl font-bold px-1.5 py-1 rounded mr-2">
            <span className="absolute -top-3 -left-5 text-3xl rotate-[-45deg]">🎓</span>
              S
            </div>
            <span
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              style={{ fontFamily: "Patrick Hand", cursive: "cursive" }}
            >
              SALMA
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation Links - Center (hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              <NavLink to="/" label="Home" />
              <NavLink to="/student" label="Student" />

              {/* Create Exam Dropdown */}
              <div className="relative" id="create-exam-dropdown">
                <button
                  onClick={toggleCreateExamDropdown}
                  className="px-4 py-2 rounded-lg font-medium transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50 flex items-center"
                >
                  Create Exam
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isCreateExamOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to="/create"
                        onClick={() => setIsCreateExamOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Customize Exam
                      </Link>
                      <Link
                        to="/create/full"
                        onClick={() => setIsCreateExamOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Full Exam
                      </Link>
                      <Link
                        to="/create/bank"
                        onClick={() => setIsCreateExamOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Bank Questions
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/grades" label="Grades" />
            </div>
          </div>

          {/* Auth Buttons or User Menu - Right (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2">
            {currentUser ? (
              <div className="relative" id="user-menu-dropdown">
                <button
                  onClick={toggleUserMenuDropdown}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{currentUser.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu (shown when menu button is clicked) */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <MobileNavLink
                to="/"
                label="Home"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Mobile Create Exam Submenu */}
              <div className="px-4 py-2">
                <div className="font-medium text-gray-800 mb-2">
                  Create Exam
                </div>
                <div className="ml-4 space-y-2">
                  <MobileNavLink
                    to="/create/customize"
                    label="Create Customize Exam"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    to="/create/full"
                    label="Create Full Exam"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    to="/create/bank"
                    label="Create Bank Questions"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              </div>

              <MobileNavLink
                to="/grades"
                label="Grades"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <div className="border-t border-gray-200 my-2 pt-2"></div>

              {currentUser ? (
                <>
                  <div className="px-4 py-2">
                    <div className="font-medium text-gray-800 mb-2">
                      Signed in as{" "}
                      <span className="text-blue-600">
                        {currentUser.username}
                      </span>
                    </div>
                  </div>
                  <MobileNavLink
                    to="/profile"
                    label="Profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    to="/dashboard"
                    label="Dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink
                    to="/login"
                    label="Login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    icon={<LogIn className="w-4 h-4" />}
                  />
                  <MobileNavLink
                    to="/register"
                    label="Register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    icon={<UserPlus className="w-4 h-4" />}
                    isButton
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const NavLink = ({ to, label, activePaths = [] }) => {
  const location = useLocation();

  const isActive =
    location.pathname === to ||
    activePaths.some((path) => location.pathname.startsWith(path));

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, onClick, icon, isButton = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
        isButton
          ? "bg-blue-600 text-white"
          : isActive
          ? "bg-blue-100 text-blue-600"
          : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
};
