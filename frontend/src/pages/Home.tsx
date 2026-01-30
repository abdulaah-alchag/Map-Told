import { GoLocation } from 'react-icons/go';

import { App_Logo } from '@/components/elements';

export const Home = () => {
  return (
    <>
      <title>MapTold - Home</title>
      <main className=''>
        <div id='Hero' className='hero bg-base-200 hero-bg-image min-h-screen'>
          <div className='hero-content h-full pt-10 text-center'>
            <div className='flex h-[80%] max-w-md flex-col items-center justify-between'>
              <App_Logo className='w-30'></App_Logo>
              <h1 className='px-6 text-5xl font-bold'>Dein virtueller Aussichtsturm</h1>
              <p className='px-10 py-8 italic'>
                Gib einen geografischen Punkt an und erhalte relevante Informationen zu seiner
                Umgebung, serviert von unserer Standort-KI.
              </p>
              <button className='btn btn-primary'>
                <GoLocation />
                Aktuellen Standort zeigen
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
