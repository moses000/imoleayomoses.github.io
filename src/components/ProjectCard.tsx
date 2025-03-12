interface ProjectProps {
    title: string;
    description: string;
    link: string;
  }
  
  const ProjectCard: React.FC<ProjectProps> = ({ title, description, link }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <a
          href={link}
          target="_blank"
          className="text-blue-500 mt-2 inline-block"
        >
          View Project →
        </a>
      </div>
    );
  };
  
  export default ProjectCard;
  