import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Shield, Code2 } from "lucide-react";
import lap from "../assets/download.png";
import "./Home.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import novs from "../assets/projectex.png";
import vs from "../assets/vs1.png";
import TeamCarousel from "../components/TeamCarousel";

const Home = () => {
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize comparison animations
    gsap.utils.toArray(".comparisonSection").forEach((section: any) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+=350 center",
          // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
          end: () => "+=" + section.offsetWidth,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });
      // animate the container one way...
      tl.fromTo(
        section.querySelector(".afterImage"),
        { xPercent: 100, x: 0 },
        { xPercent: 0 }
      )
        // ...and the image the opposite way (at the same time)
        .fromTo(
          section.querySelector(".afterImage img"),
          { xPercent: -100, x: 0 },
          { xPercent: 0 },
          0
        );
    });

    document.querySelectorAll(".ticker").forEach((ticker) => {
  const inner = ticker.querySelector(".ticker-wrap");
  if (!inner) return; // prevent null error

  const content = inner.querySelector(".ticker-text");
  if (!content) return; // prevent null error

  const duration = ticker.getAttribute("data-duration") || "10";

  // Clone content
  inner.append(content.cloneNode(true));

  const animations: gsap.core.Tween[] = [];

  inner.querySelectorAll(".ticker-text").forEach((element) => {
    const animation = gsap.to(element, {
      x: "-100%",
      repeat: -1,
      duration: Number(duration),
      ease: "linear",
    });
    animations.push(animation);
  });

  ticker.addEventListener("mouseenter", () => {
    animations.forEach((anim) => anim.pause());
  });

  ticker.addEventListener("mouseleave", () => {
    animations.forEach((anim) => anim.play());
  });
});


    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack React & Node.js e-commerce solution",
      price: 299,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Web Development",
      seller: "TechCorp",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure React Native banking application",
      price: 499,
      rating: 4.9,
      image:
        "https://neontri.com/wp-content/uploads/2024/04/Illustration-Innovative_Features_That_will_Define_Mobile_Banking_Apps_By_2030_512x512_v001.png",
      category: "Mobile Development",
      seller: "FinTech Solutions",
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description: "Python-based AI chatbot with NLP capabilities",
      price: 399,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "AI/ML",
      seller: "AI Innovations",
    },
  ];

  const stats = [
    { label: "Projects Sold", value: "10,000+", icon: Code2 },
    { label: "Happy Customers", value: "5,000+", icon: Users },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Secure Transactions", value: "100%", icon: Shield },
  ];

  return (
    <div className="animate-fade-in relative">
      {/* <div
        className="
    absolute inset-x-0 top-0 h-[50vh]
    bg-[radial-gradient(115%_100%_at_75%_0%,rgba(150,25,255,0.5)_0%,rgba(165,50,255,0.5)_25%,rgba(200,75,255,0.5)_50%,transparent_95%)]
    -z-2
    pointer-events-none
  "
      ></div> */}
      <div
        className="
    absolute inset-x-0 top-0 h-[50vh]
    pointer-events-none -z-2
    gradient-animate
    bg-[radial-gradient(115%_100%_at_70%_0%,rgba(150,50,255,0.5)_0%,rgba(200,100,255,0.5)_40%,transparent_95%)]
  "
      ></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <section className="relative bg-gradient-to-br from-white/20 via-gray-100/20 to-indigo-100/20 text-gray-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-white bg-opacity-0"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up text-transparent bg-clip-text bg-gradient-to-l from-[#200a33] to-[#51197f]">
                Buy & Sell
                <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#200a33] to-[#51197f]">
                  Software Projects
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto animate-slide-up">
                Discover amazing software projects or sell your own creations to
                developers worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link
                  to="/projects"
                  className="btn text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-[rgb(65,0,165)] to-[rgb(110,0,165)] hover:bg-indigo-700"
                >
                  Browse Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/sell"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 border border-indigo-600"
                >
                  Start Selling
                </Link>
              </div>

              {/* App Preview (centered, glowing, glassy) */}
              <div className="relative flex justify-center mt-16 animate-fade-in">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                  <div
                    className="w-full max-w-full h-full rounded-2xl blur-2xl opacity-80 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 animate-glow"
                    style={{ filter: "blur(32px)" }}
                  ></div>
                </div>
                <div>
                  {/* <section className="comparisonSection">
            <div className="comparisonImage beforeImage">
              <img src={novs} alt="before" className='rounded-xl p-0 m-0'/>
            </div>
            <div className="comparisonImage afterImage">
              <img src={vs} alt="after" className='rounded-xl p-0 m-0'/>
            </div>
          </section> */}
                </div>
              </div>

              <section className="comparisonSection">
                <div className="comparisonImage beforeImage">
                  <img src={novs} alt="before" className="rounded-xl p-0 m-0" />
                </div>
                <div className="comparisonImage afterImage">
                  <img src={vs} alt="after" className="rounded-xl p-0 m-0" />
                </div>
              </section>
              {/* <section className="panel">
            <h4 className="header-section">Scroll to see the before/after</h4>
          </section> */}

              {/* <section className="comparisonSection">
            <div className="comparisonImage beforeImage">
              <img src="https://assets.codepen.io/16327/before.jpg" alt="before"/>
            </div>
            <div className="comparisonImage afterImage">
              <img src="https://assets.codepen.io/16327/after.jpg" alt="after"/>
            </div>
          </section> */}
            </div>
          </div>
        </section>

        {/* Project Spotlight Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}

              <div className="relative animate-fade-in">
                <img src={lap} className="w- p-0 m-0" />
              </div>
              <div className="animate-fade-in">
                <div className="text-sm text-indigo-600 font-semibold mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  CodeMart is a software marketplace
                  <span className="text-indigo-600">
                    {" "}
                    helping developers
                  </span>{" "}
                  turn projects into
                  <span className="text-indigo-600"> profitable ventures.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our task was to craft a bold, conversion-focused website that
                  reflects their innovative approach and expertise, while making
                  their platform accessible and makes their numbers shine.
                </p>
              </div>

              {/* Right Content - Project Showcase */}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pt-10 pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="techslider">
      <div className="ticker" data-duration="20">
        <div className="ticker-wrap">
          <div className="ticker-text">
            • Java • C# • Python • JavaScript • C# • React • Fluter • Angular • Next •php • C++ • HTML • CSS 
          </div>
        </div>
      </div>

      <div className="ticker" data-duration="20">
        <div className="ticker-wrap">
          <div className="ticker-text">
            •Web{" "}<span className="accent">Applications</span> {"  "}
            •Mobile{" "}<span className="accent">Applications</span>{"  "}
            •UI/UX{" "}<span className="accent">Designs</span> {"  "}
            • ML{" "}<span className="accent">Models</span>{"  "}
            • API{" "}<span className="accent">&</span> Microservices{"  "}
            •Database{" "}<span className="accent">Schemas</span> {"  "}
            •Automation{" "}<span className="accent">Scripts</span> {"  "}
            •Full-Stack{" "}<span className="accent">Projects</span> {"  "}
            •DevOps{" "}<span className="accent">Tools</span>{"  "}
          </div>
        </div>
      </div>
    </div>

        {/* Featured Projects */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top Projects
              </h2> */}
              <h1 className="featured-projects-title">Top Projects</h1>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Discover high-quality software projects from our top developers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden card-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {project.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${project.price}
                        </span>
                        <p className="text-sm text-gray-500">
                          by {project.seller}
                        </p>
                      </div>
                      <Link
                        to={`/project/${project.id}`}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/projects"
                className="btn-primary text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center"
              >
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <TeamCarousel />

      {/* <HowItWorks/> */}
      {/* How It Works */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
         
       
           
          </div> */}

      {/* </div> */}
      {/* </section> */}
    </div>
  );
};

export default Home;
