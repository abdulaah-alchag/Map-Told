import React from 'react';
import { LuLoader, LuSearch } from 'react-icons/lu';

import { useSession } from '@data';
import type { LocationFormInputsType } from '@types';
import { sleep } from '@utils';

export const LocationForm = () => {
  const { locationform, dispatchLocationForm } = useSession();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.currentTarget;
    const newValue = value === '' ? null : type === 'number' ? Number(value) : value;
    const newInputs: LocationFormInputsType = {
      ...locationform.inputs,
      [name]: newValue,
    };
    dispatchLocationForm({ type: 'UPDATE_DATA', payload: newInputs });
  };

  const submitAction = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchLocationForm({ type: 'SET_PENDING', payload: true });

    if (locationform.mask === 'address') {
      console.log('TODO: convert address to coordinates');
    }

    await sleep(2000);

    console.log('Submitted: ');

    dispatchLocationForm({ type: 'SET_SUCCESS', payload: true });
    dispatchLocationForm({ type: 'SET_PENDING', payload: false });
  };

  return (
    <section
      id='Location-Form'
      className={`grid lg:grid-cols-2 ${locationform.pending ? 'bg-mt-color-13' : locationform.mask === 'address' ? 'bg-mt-color-4' : 'bg-mt-color-20'}`}
    >
      <div id='Location-Form-Image' className='bg-mt-color-5'>
        <div className='form-beside-image h-full w-full'></div>
      </div>

      <div id='Location-Form-Container' className=''>
        {/* MASK FORM BUTTONS ============================================= */}
        <div id='Location-Form-Control-Buttons' className='mb-5 grid grid-cols-2'>
          <button
            type='button'
            className={`btn btn-location-form-control ${locationform.pending ? 'bg-green-100' : locationform.mask === 'address' ? 'bg-purple-100' : ''}`}
            disabled={locationform.pending}
            onClick={() => dispatchLocationForm({ type: 'SET_MASK', payload: 'address' })}
          >
            Adresse
          </button>
          <button
            type='button'
            className={`btn btn-location-form-control ${locationform.pending ? 'bg-green-100' : locationform.mask === 'coordinates' ? 'bg-yellow-100' : ''}`}
            disabled={locationform.pending}
            onClick={() => dispatchLocationForm({ type: 'SET_MASK', payload: 'coordinates' })}
          >
            Koordinaten
          </button>
        </div>

        <div
          id='Location-Form-Centering-Wrapper'
          className='m-auto min-w-fit px-15 pt-10 pb-25 sm:w-3/4 md:w-1/2 lg:w-3/4 xl:w-2/3'
        >
          <h2>
            {locationform.pending ? (
              <span className='text-green-600'>Die Suche läuft...</span>
            ) : locationform.mask === 'address' ? (
              'Ort eingeben:'
            ) : (
              'Punkt eingeben:'
            )}
          </h2>
          {/* START FORM ================================================== */}
          <form onSubmit={submitAction} className='grid gap-2'>
            {/* ADDRESS FORM ============================================== */}
            {locationform.mask === 'address' && (
              <>
                <div className='grid grid-cols-[75%_1fr] gap-2'>
                  <input
                    name='street'
                    type='text'
                    className='input w-full'
                    placeholder='Strasse'
                    disabled={locationform.pending}
                    value={locationform.inputs.street ?? ''}
                    onChange={changeHandler}
                  />
                  <input
                    name='house'
                    type='text'
                    className='input w-full'
                    placeholder='Nr'
                    disabled={locationform.pending}
                    value={locationform.inputs.house ?? ''}
                    onChange={changeHandler}
                  />
                </div>
                <div className='grid grid-cols-[30%_1fr] gap-2'>
                  <input
                    name='postcode'
                    type='text'
                    className='input w-full'
                    placeholder='PLZ'
                    disabled={locationform.pending}
                    value={locationform.inputs.postcode ?? ''}
                    onChange={changeHandler}
                  />
                  <input
                    name='city'
                    type='text'
                    className='input w-full'
                    placeholder='Stadt'
                    disabled={locationform.pending}
                    value={locationform.inputs.city ?? ''}
                    onChange={changeHandler}
                  />
                </div>
              </>
            )}
            {/* COORDINATES FORM ========================================== */}
            {locationform.mask === 'coordinates' && (
              <div className='grid gap-2'>
                <input
                  name='longitude'
                  type='number'
                  className='input w-full'
                  placeholder='Längengrad (Longitude)'
                  min={5}
                  max={16}
                  step={0.0001}
                  disabled={locationform.pending}
                  value={locationform.inputs.longitude ?? ''}
                  onChange={changeHandler}
                />
                <input
                  name='latitude'
                  type='number'
                  className='input w-full'
                  placeholder='Breitengrad (Latitude)'
                  min={47}
                  max={51}
                  step={0.0001}
                  disabled={locationform.pending}
                  value={locationform.inputs.latitude ?? ''}
                  onChange={changeHandler}
                />
              </div>
            )}

            <div id='Errors-Container' className='min-h-20'></div>
            {/* SUBMIT BUTTON ============================================= */}
            <button
              className={`btn btn-secondary m-auto mt-2 w-full text-white ${locationform.pending ? 'bg-mt-color-11 cursor-not-allowed' : 'bg-mt-color-31'}`}
              disabled={locationform.pending}
            >
              {locationform.pending ? (
                <>
                  <LuLoader className='animate-spin' />
                  bitte Geduld...
                </>
              ) : (
                <>
                  <LuSearch />
                  Suchen
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
