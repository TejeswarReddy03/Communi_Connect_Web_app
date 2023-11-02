import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    markonmap,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "chats",
      title: "chats",
    },
    {
      id: "announcements",
      title: "announcements",
    },
    {
      id: "posts",
      title: "posts",
    },
    
    {
      id: "maps",
      title: "maps",
    },
    {
      id: "viewmarkers",
      title: "viewmarkers",
    },
    {
      id: "multilingannc",
      title:"multilingannc"
    }

  ];
  
  const services = [
    {
      title: "Connecting",
      icon: web,
    },
    {
      title: "Supportive",
      icon: mobile,
    },
    {
      title: "Engaging",
      icon: backend,
    },
    {
      title: "Inclusive",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: markonmap,
    },
    {
      name: "CSS 3",
      icon: starbucks,
    },
    {
      name: "JavaScript",
      icon: tesla,
    },
    {
      name: "JavaScript",
      icon: meta,
    },
    //{
    //   name: "TypeScript",
    //   icon: typescript,
    // },
    // {
    //   name: "React JS",
    //   icon: reactjs,
    // },
    // {
    //   name: "Redux Toolkit",
    //   icon: redux,
    // },
    // {
    //   name: "Tailwind CSS",
    //   icon: tailwind,
    // },
    // {
    //   name: "Node JS",
    //   icon: nodejs,
    // },
    // {
    //   name: "MongoDB",
    //   icon: mongodb,
    // },
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
    // {
    //   name: "git",
    //   icon: git,
    // },
    // {
    //   name: "figma",
    //   icon: figma,
    // },
    // {
    //   name: "docker",
    //   icon: docker,
    // },
  ];
  
  const experiences = [
    {
      title: "Chats",
      company_name: "Starbucks",
      icon: starbucks,
      iconBg: "#383E56",
      date: "March 2020 - April 2021",
      points: [
        "Direct Communication: Enables users to have direct, real-time conversations with administrators or support staff.",
        "Problem Resolution: Users can discuss their concerns, seek assistance, or report issues, leading to faster problem resolution.",
        "Privacy and Security: Ensures private and secure communication channels, maintaining user confidentiality"
        ,
        "Efficiency: Streamlines the communication process, reducing response times and improving overall user satisfaction.",
        "Feedback Loop: Creates a feedback loop for users to express their opinions, suggestions, and feedback directly to administrators."
      ],
    },
    {
      title: "Announcements",
      company_name: "Tesla",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: "Jan 2021 - Feb 2022",
      points: [
        "Official messages for important news.",
        "Key Information: Essential details for clarity.",
        "Targeted Audience: Specific recipients for relevance.",
        "Official Record: Records of significant events.",
      ],
    },
    {
      title: "Mark On Map",
      company_name: "Shopify",
      icon: markonmap,
      iconBg: "#383E56",
      date: "Jan 2022 - Jan 2023",
      points: [
        "Users can mark significant incidents directly on a map.",
        "Noteworthy Events: It allows users to highlight incidents, events, or locations of importance.",
        "Geospatial Data: Utilizes geospatial data to pinpoint exact locations.",
        "Visual Reference: Provides a visual reference for incidents and their geographical context.",
        "Community Awareness: Enhances community awareness by sharing and visualizing important information."
      ],
    },
    {
      title: "Multilingual Content Support",
      company_name: "Meta",
      icon: meta,
      iconBg: "#E6DEDD",
      date: "Jan 2023 - Present",
      points: [
        "Multilingual Content Support with NLP for Community Participation",
        "NLP Integration: Implement NLP algorithms and tools that support multiple Indian languages, allowing users to post, communicate, and engage in their preferred languages.",
        "User-Friendly Interface: Create an intuitive user interface that allows users to easily switch between languages and access content in the language of their choice.",
        "Community Inclusivity: Promote inclusivity by making the platform accessible to people who may speak regional languages or English, fostering active participation.",
        "Translation Services: automated translation services within the community platform to help users understand and communicate in languages they might not be fluent in."
      ],
    },
   
  ];
  
  const testimonials = [
    {
      testimonial:
"This website is a game-changer! I recently had an issue, and I decided to use the chat feature to report it. To my surprise, the response was lightning-fast. "  ,    name: "Rahul",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
"With this website, I can now seamlessly communicate in my regional language. It's not just about language; it's about feeling connected with my roots and the people around me."    ,  name: "Pranay",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
"I've been using this website to interact with the administrators regarding community concerns, and it's been a breeze. "    ,
  name: "Siva Sai",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };