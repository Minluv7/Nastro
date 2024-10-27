
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="my-6">
        <p>© {currentYear}</p>
        <a href="https://nese-yildirim-neses-projects.vercel.app/" target="_blank"  className="no-underline hover:underline" >
            <p className="">Made by Nese Yildirim</p>
        </a>
      </footer>
    );
  };
  
  export default Footer;
  