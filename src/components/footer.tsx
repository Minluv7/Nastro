
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="my-6">
        <p>© {currentYear}</p>
            <p className="">Made by Nese Yildirim</p>
      </footer>
    );
  };
  
  export default Footer;
  