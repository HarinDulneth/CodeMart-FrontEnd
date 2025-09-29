import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Filter, Search, ChevronDown } from 'lucide-react';

const AllProjects = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Web Development', 'Mobile Development', 'AI/ML', 'Desktop Apps', 'APIs', 'Games'];
  const priceRanges = ['All', 'Under $100', '$100-$300', '$300-$500', 'Over $500'];
  const sortOptions = ['Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Rating'];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Complete React & Node.js e-commerce solution with payment integration',
      price: 299,
      rating: 4.8,
      reviews: 127,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      seller: 'TechCorp',
      tags: ['React', 'Node.js', 'MongoDB'],
      featured: true
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure React Native banking application with biometric authentication',
      price: 499,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/4968371/pexels-photo-4968371.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mobile Development',
      seller: 'FinTech Solutions',
      tags: ['React Native', 'Firebase', 'Auth'],
      featured: false
    },
    {
      id: 3,
      title: 'AI Chat Assistant',
      description: 'Python-based AI chatbot with natural language processing capabilities',
      price: 399,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'AI/ML',
      seller: 'AI Innovations',
      tags: ['Python', 'TensorFlow', 'NLP'],
      featured: true
    },
    {
      id: 4,
      title: 'Task Management Dashboard',
      description: 'Modern Vue.js dashboard for project and task management',
      price: 199,
      rating: 4.6,
      reviews: 203,
      image: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      seller: 'ProductivityCo',
      tags: ['Vue.js', 'Express', 'MySQL'],
      featured: false
    },
    {
      id: 5,
      title: 'Cryptocurrency Portfolio',
      description: 'Real-time crypto tracking app with portfolio management',
      price: 349,
      rating: 4.8,
      reviews: 91,
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mobile Development',
      seller: 'CryptoDevs',
      tags: ['Flutter', 'API', 'Charts'],
      featured: true
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description: 'Advanced analytics platform for social media insights',
      price: 599,
      rating: 4.9,
      reviews: 67,
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      seller: 'DataInsights',
      tags: ['Angular', 'D3.js', 'PostgreSQL'],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Projects</h1>
          <p className="text-gray-600">Discover amazing software projects from developers worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-indigo-600"
                >
                  <Filter className="h-5 w-5 mr-1" />
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                        <span className="ml-2 text-sm text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
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
                        <span className="ml-2 text-sm text-gray-600">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {projects.length} results
              </p>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden card-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {project.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-1">
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  )}
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{project.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({project.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag) => (
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
                        <span className="text-2xl font-bold text-gray-900">${project.price}</span>
                        <p className="text-xs text-gray-500">by {project.seller}</p>
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

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">Previous</button>
                <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg">1</button>
                <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">2</button>
                <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">3</button>
                <span className="px-3 py-2 text-gray-500">...</span>
                <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">42</button>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;