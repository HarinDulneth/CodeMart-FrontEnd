import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Shield, Download, Heart, Share2, User, Clock, Code, Globe } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const project = {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Complete React & Node.js e-commerce solution with payment integration, user authentication, admin dashboard, and mobile-responsive design.',
    longDescription: `This comprehensive e-commerce platform is built with modern technologies and best practices. It includes everything you need to launch your online store: user authentication, product management, shopping cart functionality, secure payment processing with Stripe, order management, admin dashboard, and much more.

The platform is fully responsive and optimized for performance, with clean, maintainable code that's easy to customize and extend. Perfect for entrepreneurs, developers, and businesses looking to establish their online presence quickly and professionally.`,
    price: 299,
    rating: 4.8,
    reviews: 127,
    images: [
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://neontri.com/wp-content/uploads/2024/04/Illustration-Innovative_Features_That_will_Define_Mobile_Banking_Apps_By_2030_512x512_v001.png',
      'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Web Development',
    seller: {
      name: 'TechCorp',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      projects: 23
    },
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    features: [
      'User Authentication & Authorization',
      'Product Catalog Management',
      'Shopping Cart & Checkout',
      'Payment Integration (Stripe)',
      'Order Management System',
      'Admin Dashboard',
      'Responsive Design',
      'API Documentation'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe API'],
    deliveryTime: '2-3 days',
    lastUpdated: '2024-12-15'
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent project! Clean code and great documentation. Saved me months of development time.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Professional quality code with all the features I needed. Great value for money!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Davis',
      rating: 4,
      comment: 'Well-structured project with good documentation. Minor customization needed but overall great.',
      avatar: 'https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
              <img
                src={project.images[selectedImage]}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-indigo-600' : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              <p className="text-gray-600 mb-6">{project.description}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(project.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold text-gray-900">{project.rating}</span>
                </div>
                <span className="text-gray-600">({project.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">${project.price}</span>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className="w-full btn-primary text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Add to Cart - ${project.price * quantity}
                </button>

                <button className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 text-center border-t pt-6">
                <div>
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Quality Guarantee</p>
                </div>
                <div>
                  <Download className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Instant Download</p>
                </div>
                <div>
                  <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Lifetime Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
              <div className="prose prose-gray max-w-none">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-8 shadow-sm animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {testimonials.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Seller Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Seller</h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={project.seller.avatar}
                  alt={project.seller.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{project.seller.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{project.seller.rating}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Projects:</span>
                  <p className="font-semibold">{project.seller.projects}</p>
                </div>
                <div>
                  <span className="text-gray-500">Rating:</span>
                  <p className="font-semibold">{project.seller.rating}/5</p>
                </div>
              </div>
              <button className="w-full mt-4 border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                Contact Seller
              </button>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-500">Delivery:</span>
                    <p className="font-semibold">{project.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Code className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-500">Technologies:</span>
                    <p className="font-semibold">{project.technologies.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <p className="font-semibold">{project.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;