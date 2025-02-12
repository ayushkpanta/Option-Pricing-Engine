const Header = () => {
    return (
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 py-6 px-8 shadow-md">
            <h1 className="text-white font-bold text-4xl mb-2">
                Options Pricing Engine
            </h1>
            <a 
                href="https://ayushkpanta.github.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-200 transition-colors duration-300 text-sm"
            >
                Created by Ayush Panta
            </a>
        </header>
    );
}

export default Header;
