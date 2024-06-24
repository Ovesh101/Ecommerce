// src/components/Footer.js


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#privacy" className="text-sm hover:text-yellow-400">Privacy Policy</a>
          <a href="#terms" className="text-sm hover:text-yellow-400">Terms of Service</a>
          <a href="#contact" className="text-sm hover:text-yellow-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
