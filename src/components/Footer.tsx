const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Imoleayo Moses. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://linkedin.com/in/imoleayomoses" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/imoleayomoses" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  