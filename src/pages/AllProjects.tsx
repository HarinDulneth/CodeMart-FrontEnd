import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, Filter, Search, ChevronDown, Package } from "lucide-react";
import api from "../services/api";

const AllProjects = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [showFilters, setShowFilters] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      console.log(selectedCategory)
      try {
        let response;
        if(selectedCategory !== "All"){
          response = await api.projects.filterByCategory(mapCategoryToEnum(selectedCategory));
          console.log(`All Projects fetched for category ${selectedCategory}`, response);
        }
        else{
          response = await api.projects.getAll();
           console.log("All Projects fetched", response);
      
        }

        if (priceRange !== "All") {
          let minPrice = 0;
          let maxPrice = 999999999;

          if(priceRange === "Under $100"){
            minPrice = 0; maxPrice = 100;
          } 
          else if(priceRange === "$100-$300"){
            minPrice = 100; maxPrice = 300;
          } 
          else if(priceRange === "$300-$500"){
            minPrice = 300; maxPrice = 500;
          } 
          else if(priceRange === "$500-$1000"){
            minPrice = 500; maxPrice = 1000;
          }else if(priceRange === "Over $1000"){
            minPrice = 1000; maxPrice = 999999999;
          }
          console.log("START")
          
          const hh = response.map((p)=>{
            console.log(p.price)
          })
          
          console.log("END")
          response = response.filter(
            (p) => p.price >= minPrice && p.price <= maxPrice
          ); 

          console.log("Filtered FINAL response:", response);
        }

        if (response.length > 1) {
          if (sortBy !== "Popular") {
            if (sortBy === "Newest") {
              response = response.sort((a, b) => b.createdAt - a.createdAt);
            } else if (sortBy === "Price: Low to High") {
              response = response.sort((a, b) => a.price - b.price);
            } else if (sortBy === "Price: High to Low") {
              response = response.sort((a, b) => b.price - a.price);
            } else if (sortBy === "Rating") {
              response = response.sort((a, b) => b.rating - a.rating);
            }
          }
        }

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
        }));

        
        setAllProjects(normalized);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory, priceRange, sortBy]);

  
  const calculateRating = (project: any) => {
    if (!project?.Review || project.Review.length === 0) return 0;

    const total = project.Review.reduce(
      (sum: number, r: any) => sum + r.Rating,
      0
    );

    return (total / project.Review.length).toFixed(1);
  };

    const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "Desktop Apps",
    "APIs",
    "Games",
    "Data Science",
    "DevOps",
  ];

  const priceRanges = [
    "All",
    "Under $100",
    "$100-$300",
    "$300-$500",
    "$500-$1000",
    "Over $1000",
  ];
  const ratingRanges = ["All", "Above 4", "4-3", "Below 3"];
  const sortOptions = [
    "Popular",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
  ];

  const mapCategoryToEnum = (category: string): string => {
    const categoryMap: Record<string, string> = {
      "Web Development": "WebDevelopment",
      "Mobile Development": "MobileDevelopment",
      "AI/ML": "ArtificialIntelligence",
      "Desktop Apps": "DesktopApps",
      "APIs": "APIs",
      "Games": "GameDevelopment",
      "Data Science": "DataScience",
      "DevOps": "DevOps",
      "Artificial Intelligence": "ArtificialIntelligence"
    };
    return categoryMap[category] || category;
  };

  const mapEnumToCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      "WebDevelopment": "Web Development",
      "MobileDevelopment": "Mobile Development",
      "AI/ML": "Artificial Intelligence",
      "DesktopApps": "Desktop Apps",
      "APIs": "APIs",
      "Games": "Game Development",
      "DataScience": "Data Science",
      "DevOps": "DevOps",
      "ArtificialIntelligence": "Artificial Intelligence",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-2xl border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Projects
          </h1>
          <p className="text-gray-600">
            Discover amazing software projects from developers worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-indigo-600"
                >
                  <Filter className="h-5 w-5 mr-1" />
                  {showFilters ? "Hide" : "Show"}
                </button>
              </div>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={range}
                          checked={priceRange === range}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Range
                  </label>
                  {/* <div className="space-y-2">
                    {ratingRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="review"
                          value={range}
                          checked={priceRange === range}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {allProjects.length} results
              </p>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            {allProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Package className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for new projects.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden card-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={project.ImageUrls[0]}
                      alt={project.Name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                          {mapEnumToCategory(project.Category)}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {calculateRating(project)}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({project.Review.length})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {project.Name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.Description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.PrimaryLanguages.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${project.Price}
                          </span>
                          <p className="text-xs text-gray-500">
                            by {project.Owner.fullName}
                          </p>
                        </div>
                        <Link
                          to={`/project/${project.id}`}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {allProjects.length === 0 ? (
              <></>
            ):(
              <div className="flex items-center justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    2
                  </button>
                  <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    3
                  </button>
                  <span className="px-3 py-2 text-gray-500">...</span>
                  <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    42
                  </button>
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
