import { GoSearch } from 'react-icons/go';

export const LocationForm = () => {
  return (
    <div id='Location-Form' className='bg-mt-color-4 flex flex-col justify-center lg:flex-row'>
      <div className='bg-mt-color-5 hidden h-150 w-[50%] xl:flex'>
        <div className='form-beside-image h-full w-full'></div>
      </div>
      <form className='location-form-grid p-5 pt-10 pb-25 lg:px-10'>
        <h2>Zielort eingeben:</h2>
        <input type='text' className='input' placeholder='Strasse' />
        <div className='grid grid-cols-[30%_1fr] gap-2'>
          <input type='text' className='input' placeholder='PLZ' />
          <input type='text' className='input' placeholder='Stadt' />
        </div>
        <div className='grid grid-cols-2 gap-2 pt-2'>
          <input type='number' className='input' placeholder='Longitude' />
          <input type='number' className='input' placeholder='Latitude' />
        </div>

        <button className='btn btn-secondary m-auto mt-14 w-full' type='button'>
          <GoSearch />
          Suchen
        </button>
      </form>
    </div>
  );
};
