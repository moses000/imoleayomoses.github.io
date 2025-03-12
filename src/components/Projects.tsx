const projects = [
  {
    title: "Pikia Market",
    description: "An AI/ML-powered e-commerce platform for African vendors.",
    link: "#",
  },
  {
    title: "MTN NG Report Automation",
    description: "Automated network outage reports for real-time analysis.",
    link: "#",
  },
];

const Projects = () => (
  <section className="py-20">
    <h2 className="text-3xl font-bold text-center">Projects</h2>
    <div className="flex flex-wrap justify-center mt-8">
      {projects.map((project, index) => (
        <div key={index} className="m-4 p-4 bg-white shadow-lg rounded-md">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
          <a href={project.link} className="text-blue-500 hover:underline">
            View Project
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
