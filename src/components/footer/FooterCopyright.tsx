
const FooterCopyright = () => {
  return (
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-400 text-center md:text-left">
          &copy; 2024 EmpowerLink. All rights reserved. Transforming communities across India.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span className="hover:text-white transition-colors cursor-default">Powered by AI</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-default">Verified Impact</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-default">Global Community</span>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
