import React from 'react';
import BrandsPage from './pages/BrandsPage';

const App: React.FC = () => {
  React.useEffect(() => {
    document.title = 'AutoID+ AdminPanel';
  }, []);
  return (
    <div className="font-nunito bg-white min-h-screen text-secondary-900">
      <header className="bg-white py-6 text-center shadow-lg border-b-4 border-yellow-400">
        <h1 className="text-4xl tracking-wide m-0 text-secondary-900">
          AutoID<sup className="align-super text-base">+</sup> <span className="text-yellow-400">Admin Panel</span>
        </h1>
        <div className="mt-2 text-lg text-yellow-400 font-bold">ADMIN ACCESS</div>
      </header>
      <main className="py-8 w-auto px-4 mx-auto bg-white">
        <h1 className="text-4xl mb-6 text-center text-secondary-900 font-bold">Brand Management</h1>
        <BrandsPage />
      </main>
    </div>
  );
};

export default App;
