import React from 'react';
import { useStateContext } from './contexts/StateContextProvider';
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import SearchRoutes from './components/SearchRoutes'


const App = () => {
  const { darkTheme, setDarkTheme, searchTerm } = useStateContext()

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
        <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <SearchRoutes />
        {searchTerm && <Footer />}
      </div>
    </div>

  );
};

export default App;
