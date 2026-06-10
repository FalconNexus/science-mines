export const SITE = {
  name: "ScienceMines",
  brandScience: "Science",
  brandMines: "Mines",
  tagline: "Where ideas become reality.",
  description:
    "ScienceMines is an Innovation Lab where students, educators, hobbyists and startups explore Robotics, AI, 3D Printing, Electronics, IoT & Engineering Design — through real, hands-on building.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918860409670",
  email: "hello@sciencemines.com",
  phone: "+91 88604 09670",
  address: "Sciencemines | Robotics & Innovation Labs",
  mapsUrl:
    "https://www.google.com/maps/place/Sciencemines+%7C+Robotics+%26+Innovation+Labs/@29.9711236,76.8193101,17z/data=!4m6!3m5!1s0x390e39198651afe5:0x5c7575301bf66e89!8m2!3d29.9711236!4d76.8193101!16s%2Fg%2F11npy_pk09",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d76.8167352!3d29.9711236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e39198651afe5%3A0x5c7575301bf66e89!2sSciencemines%20%7C%20Robotics%20%26%20Innovation%20Labs!5e0!3m2!1sen!2sin!4v1718000000000",
} as const;

export const HERO_STATS = [
  { value: "500+", label: "Students" },
  { value: "100+", label: "Projects Built" },
  { value: "50+", label: "Workshops" },
  { value: "1000+", label: "Components" },
] as const;

export const NAV_LINKS = [
  { href: "#pillars", label: "Pillars" },
  { href: "#tech", label: "Tech" },
  { href: "#innovation-lab", label: "Lab" },
  { href: "#programs", label: "Workshops" },
  { href: "#projects", label: "Projects" },
  { href: "#schools", label: "Schools" },
  { href: "#contact", label: "Contact" },
] as const;

export const PAGE_LINKS = [
  { href: "/booking", label: "Booking" },
  { href: "/about", label: "About" },
] as const;

export const PILLARS = [
  {
    title: "Learn",
    description:
      "Workshops, training programs, summer camps & technology bootcamps led by working engineers.",
    tags: ["Workshops", "Training Programs", "Summer Camps", "Bootcamps"],
    href: "/booking#courses",
  },
  {
    title: "Build",
    description:
      "Open-access innovation lab for robotics, electronics and end-to-end project development.",
    tags: ["Lab Access", "Robotics", "Electronics", "Project Dev"],
    href: "/booking#lab",
  },
  {
    title: "Print",
    description:
      "Industrial-grade 3D printing & rapid prototyping — from CAD file to working part.",
    tags: ["3D Printing", "Prototyping", "Engineering Models", "Mockups"],
    href: "/booking#print",
  },
  {
    title: "Shop",
    description:
      "Curated electronics components, sensors, modules and STEM kits — available for in-store pickup.",
    tags: ["Sensors", "Modules", "Robotics Parts", "STEM Kits"],
    href: "/booking#products",
  },
] as const;

export const TECH_AREAS = [
  {
    title: "Robotics & Automation",
    description: "From line followers to multi-axis arms.",
    icon: "🤖",
  },
  {
    title: "Artificial Intelligence",
    description: "ML models, chatbots, vision systems.",
    icon: "🧠",
  },
  {
    title: "3D Printing",
    description: "FDM & resin prototyping at production quality.",
    icon: "🖨️",
  },
  {
    title: "Electronics",
    description: "Arduino, ESP32, microcontroller design.",
    icon: "⚡",
  },
  {
    title: "IoT",
    description: "Sensor networks, dashboards, smart devices.",
    icon: "📡",
  },
  {
    title: "Coding",
    description: "Python, C++, embedded & full-stack.",
    icon: "💻",
  },
  {
    title: "Engineering Design",
    description: "CAD, mechanical & product design.",
    icon: "📐",
  },
  {
    title: "VR / AR",
    description: "Immersive learning & interactive experiences.",
    icon: "🥽",
  },
] as const;

export const LAB_ZONES = [
  {
    title: "Robotics Stations",
    description: "Multi-axis arms, mobile bots, sensor rigs.",
  },
  {
    title: "3D Printing Zone",
    description: "FDM + resin printers running 24/7.",
  },
  {
    title: "Electronics Workbench",
    description: "Soldering, scopes, supplies.",
  },
  {
    title: "Arduino / ESP32 Dev Area",
    description: "Boards, breadboards, modules.",
  },
  {
    title: "CAD Workstations",
    description: "Fusion 360, SolidWorks ready.",
  },
  {
    title: "AI Learning Stations",
    description: "GPU-backed model training.",
  },
] as const;

export const PROJECTS = [
  {
    title: "Smart Home Automation",
    description: "ESP32 mesh controlling lights, climate & security.",
    category: "IoT",
  },
  {
    title: "Conversational AI Chatbot",
    description: "Fine-tuned LLM for student support workflows.",
    category: "AI",
  },
  {
    title: "6-DOF Robotic Arm",
    description: "Inverse-kinematics arm with vision-based pick & place.",
    category: "Robotics",
  },
  {
    title: "Line Following Robot",
    description: "PID-tuned chassis on custom PCB.",
    category: "Robotics",
  },
  {
    title: "IoT Weather Station",
    description: "Solar-powered telemetry with live dashboard.",
    category: "IoT",
  },
  {
    title: "FPV Quadcopter",
    description: "Custom flight controller, telemetry-driven tuning.",
    category: "Robotics",
  },
  {
    title: "3D Printed Prosthetic",
    description: "Patient-fit mechanical hand, fully open-source.",
    category: "3D Printing",
  },
  {
    title: "Computer Vision Sorter",
    description: "Real-time defect detection on a conveyor rig.",
    category: "AI",
  },
] as const;

export const SCHOOL_SERVICES = [
  "AI Labs Setup",
  "Robotics Labs Setup",
  "STEM Labs Setup",
  "Electronics Labs Setup",
  "Teacher Training",
  "Innovation Programs",
  "School Workshops",
  "Curriculum Co-Design",
] as const;

export const PRODUCT_FILTERS = [
  "All",
  "AI",
  "Robotics",
  "Electronics",
  "IoT",
  "3D Printing",
] as const;
