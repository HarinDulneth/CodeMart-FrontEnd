import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Code } from "lucide-react";
import api, { getCurrentUser, getAuthToken } from "@/services/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // const handelSearch = (value:string)=>{
  //   setSearchQuery(value);
  //    if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }
  //   try{

  //     const timeout = setTimeout(async()=>{

  //       if(value.trim().length > 0){
  //         const response = await api.projects.search(value);
  //         setResults(response)
  //       }
  //     },1000);

  //   setTypingTimeout(timeout);

  //   }catch (err) {
  //     console.error("getting search items failed:", err);
  //   }
  // }

  const user = getCurrentUser();

  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      const response = await api.users.getCartItems(user.id);
      console.log("getting cart items successful:", response);

      const normalized = response.map((p) => ({
        id: p.id,
        Name: p.name,
        Category: p.category,
        Owner: p.owner,
        Description: p.description,
        Price: p.price,
        ImageUrls: p.imageUrls ?? [],
        PrimaryLanguages: p.primaryLanguages ?? [],
        SecondryLanguages: p.secondaryLanguages ?? [],
        Review: p.review ?? [],
        quantity: 1,
      }));

      setCartItems(normalized);
    } catch (err) {
      console.error("getting cart items failed:", err);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsLogged(true);
    }

    fetchCart();

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("focus", fetchCart);

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await api.projects.search(searchQuery);
        setResults(response);
        console.log(response);
      } catch (err) {
        console.log("Search failed", err);
      }
      setIsSearching(false);
    }, 400);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("focus", fetchCart);
      clearTimeout(delay);
    };
  }, [user?.id, searchQuery]);

  useEffect(() => {
    if (isLogged && user?.id) {
      fetchCart();
    }
  }, [location.pathname, isLogged, user?.id]);

  const getProfilePic = () => {
    return user?.profilePicture ?? null;
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="relative overflow-visible">
        <nav className="bg-white border border-b-gray-300 relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold text-gray-800 mr-6"
              >
                <Code className="h-8 w-8 text-[rgb(95,0,205)]" />
                <span className="bg-gradient-to-r from-[rgb(120,8,180)] to-[rgb(125,8,255)] bg-clip-text text-transparent pb-1">
                  CodeMart
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/projects"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Browse Projects
                </Link>
                <Link
                  to="/sell"
                  className="text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Sell Project
                </Link>
              </div>

              {/* Search Bar */}
              <form
                // onSubmit={handleSearch}
                className="hidden md:flex items-center flex-1 max-w-lg mx-8"
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-6">
                {isLogged ? (
                  <>
                    <Link
                      to="/cart"
                      className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems?.length ?? 0}
                      </span>
                    </Link>
                  </>
                ) : (
                  ""
                )}

                <Link to="/dashboard" className="relative group">
                  {isLogged ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[rgb(120,8,180)] to-[rgb(125,8,255)] p-[2px] hover:shadow-lg transition-all duration-200">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src={
                              getProfilePic() ??
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Dashboard
                  </span>
                </Link>
                {!isLogged ? (
                  <>
                    <Link
                      to="/signin"
                      className="text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[rgb(75,0,185)] text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t animate-fade-in">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for projects..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>
                <div className="space-y-2">
                  <Link
                    to="/projects"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Projects
                  </Link>
                  <Link
                    to="/sell"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sell Project
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cartItems?.length ?? 0})
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isLogged ? (
                      <>
                        <img
                          src={
                            getProfilePic() ??
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </>
                    ) : (
                      ""
                    )}
                    Dashboard
                  </Link>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-indigo-600 text-white rounded-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
