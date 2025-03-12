import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Server Monitoring Dashboard",
    description: "A real-time server monitoring platform.",
    link: "#",
  },
  {
    title: "Pikia Market (E-Commerce App)",
    description: "A fullstack e-commerce platform for African food vendors.",
    link: "#",
  },
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
