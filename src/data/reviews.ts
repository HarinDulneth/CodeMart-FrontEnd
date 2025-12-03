/**
 * Sample reviews for CodeMart project marketplace
 * These can be used for testing or as default content
 */

export interface Review {
  id: number;
  reviewerName: string;
  reviewerRole: string;
  reviewerAvatar?: string;
  projectId: number;
  projectName: string;
  rating: number; // 1-5 stars
  comment: string;
  dateAdded: string;
  helpful?: number;
}

export const sampleReviews: Review[] = [
  {
    id: 1,
    reviewerName: "Sarah Chen",
    reviewerRole: "Full-Stack Developer",
    projectId: 1,
    projectName: "E-commerce Platform",
    rating: 5,
    comment: "Absolutely fantastic! The code quality is exceptional and the documentation is thorough. I was able to integrate this into my existing project within a day. The seller was also very responsive to questions. Worth every penny!",
    dateAdded: "2024-01-15",
    helpful: 24,
  },
  {
    id: 2,
    reviewerName: "Marcus Johnson",
    reviewerRole: "Startup Founder",
    projectId: 2,
    projectName: "Mobile Banking App",
    rating: 5,
    comment: "This mobile banking template saved us months of development time. The security features are well-implemented and the UI/UX is modern and professional. Our investors were impressed with how quickly we got to market. Highly recommend!",
    dateAdded: "2024-02-03",
    helpful: 18,
  },
  {
    id: 3,
    reviewerName: "Emily Rodriguez",
    reviewerRole: "Freelance Developer",
    projectId: 3,
    projectName: "AI Chat Assistant",
    rating: 4,
    comment: "Great starting point for an AI chatbot project. The code is clean and well-structured. I had to customize quite a bit for my specific use case, but the foundation was solid. Documentation could be more detailed, but overall a good purchase.",
    dateAdded: "2024-02-18",
    helpful: 12,
  },
  {
    id: 4,
    reviewerName: "David Kim",
    reviewerRole: "Software Engineer",
    projectId: 4,
    projectName: "Task Management Dashboard",
    rating: 5,
    comment: "Perfect for our team's needs! The Vue.js implementation is clean and the Express backend is well-organized. The real-time updates work flawlessly. The seller provided excellent support during setup. This project exceeded my expectations.",
    dateAdded: "2024-03-01",
    helpful: 31,
  },
  {
    id: 5,
    reviewerName: "Alex Thompson",
    reviewerRole: "Student Developer",
    projectId: 5,
    projectName: "Cryptocurrency Portfolio",
    rating: 4,
    comment: "Really helpful for learning React Native and API integration. The code is well-commented which made it easy to understand. The charts library integration is smooth. Only downside is some outdated dependencies, but easy to update. Great value for the price!",
    dateAdded: "2024-03-12",
    helpful: 8,
  },
  {
    id: 6,
    reviewerName: "Lisa Wang",
    reviewerRole: "Product Manager",
    projectId: 6,
    projectName: "Social Media Analytics",
    rating: 5,
    comment: "Outstanding analytics platform! The D3.js visualizations are beautiful and the data processing logic is robust. We've been using this for 3 months now and it's been rock solid. The Angular architecture is scalable and maintainable. Best purchase I've made on CodeMart!",
    dateAdded: "2024-03-25",
    helpful: 19,
  },
];

// Helper function to get reviews by project ID
export const getReviewsByProjectId = (projectId: number): Review[] => {
  return sampleReviews.filter((review) => review.projectId === projectId);
};

// Helper function to get average rating for a project
export const getAverageRating = (projectId: number): number => {
  const projectReviews = getReviewsByProjectId(projectId);
  if (projectReviews.length === 0) return 0;
  const sum = projectReviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / projectReviews.length;
};

// Helper function to format date
export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

