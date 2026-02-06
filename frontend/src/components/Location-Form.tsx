import type React from 'react';
import { LuLoader, LuSearch } from 'react-icons/lu';

import { useSession } from '@data';
import { sleep } from '@utils';

export const LocationForm = () => {
  const { locationform, dispatchLocationForm } = useSession();

  const controlFormTo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnName = e.currentTarget.name;

    if (btnName === 'address') {
      await dispatchLocationForm({ type: 'SET_MASK', payload: btnName });

      const { address } = locationform.data;
      const streetEl = document.querySelector('input[name="street"]') as HTMLInputElement | null;
      const houseEl = document.querySelector('input[name="house"]') as HTMLInputElement | null;
      const cityEl = document.querySelector('input[name="city"]') as HTMLInputElement | null;
      const postalEl = document.querySelector(
        'input[name="postalcode"]',
      ) as HTMLInputElement | null;

      if (streetEl) streetEl.value = address.street ?? '';
      if (houseEl) houseEl.value = address.house ?? '';
      if (cityEl) cityEl.value = address.city ?? '';
      if (postalEl) postalEl.value = address.postalcode ?? '';
    }

    if (btnName === 'coordinates') {
      await dispatchLocationForm({ type: 'SET_MASK', payload: btnName });

      const { coordinates } = locationform.data;
      const latEl = document.querySelector('input[name="latitude"]') as HTMLInputElement | null;
      const lonEl = document.querySelector('input[name="longitude"]') as HTMLInputElement | null;

      if (latEl) latEl.value = coordinates.latitude != null ? String(coordinates.latitude) : '';
      if (lonEl) lonEl.value = coordinates.longitude != null ? String(coordinates.longitude) : '';
    }
  };
  const handleInputChange = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (locationform.mask === 'address') {
      dispatchLocationForm({
        type: 'SET_ADDRESS',
        payload: {
          street: toNullableString('street'),
          house: toNullableString('house'),
          city: toNullableString('city'),
          postalcode: toNullableString('postalcode'),
        },
      });

      function toNullableString(name: string): string | null {
        const v = formData.get(name);
        if (v === null) return null;
        return String(v).trim() === '' ? null : String(v);
      }
    }

    if (locationform.mask === 'coordinates') {
      dispatchLocationForm({
        type: 'SET_COORDINATES',
        payload: {
          latitude: toNullableNumber('latitude'),
          longitude: toNullableNumber('longitude'),
        },
      });

      function toNullableNumber(name: string): number | null {
        const v = formData.get(name);
        if (v === null) return null;
        const normalized = String(v).replace(',', '.').trim();
        return normalized === '' ? null : Number(normalized);
      }
    }
  };
  const submitAction = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchLocationForm({ type: 'SET_PENDING', payload: true });

    if (locationform.mask === 'address') {
      console.log('TODO: convert address to coordinates');
    }

    await sleep(2000);

    console.log('Submitted: ', locationform.data.coordinates);
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
        <div id='Location-Form-Control-Buttons' className='mb-5 grid grid-cols-2'>
          <button
            type='button'
            className={`btn btn-location-form-control ${locationform.pending ? 'bg-green-100' : locationform.mask === 'address' && 'bg-purple-100'}`}
            disabled={locationform.pending}
            onClick={controlFormTo}
            name='address'
          >
            Adresse
          </button>
          <button
            type='button'
            className={`btn btn-location-form-control ${locationform.pending ? 'bg-green-100' : locationform.mask === 'coordinates' && 'bg-yellow-100'}`}
            disabled={locationform.pending}
            onClick={controlFormTo}
            name='coordinates'
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

          <form onSubmit={submitAction} onChange={handleInputChange} className='grid gap-2'>
            {locationform.mask === 'address' && (
              <>
                <div className='grid grid-cols-[75%_1fr] gap-2'>
                  <input
                    name='street'
                    type='text'
                    className='input w-full'
                    placeholder='Strasse'
                    disabled={locationform.pending}
                  />
                  <input
                    name='house'
                    type='text'
                    className='input w-full'
                    placeholder='Nr'
                    disabled={locationform.pending}
                  />
                </div>
                <div className='grid grid-cols-[30%_1fr] gap-2'>
                  <input
                    name='postalcode'
                    type='text'
                    className='input w-full'
                    placeholder='PLZ'
                    disabled={locationform.pending}
                  />
                  <input
                    name='city'
                    type='text'
                    className='input w-full'
                    placeholder='Stadt'
                    disabled={locationform.pending}
                  />
                </div>
              </>
            )}

            {locationform.mask === 'coordinates' && (
              <div className='grid gap-2'>
                <input
                  name='longitude'
                  type='number'
                  className='input w-full'
                  placeholder='Längengrad (Longitude)'
                  disabled={locationform.pending}
                  min='5'
                  max='16'
                  step='any'
                />
                <input
                  name='latitude'
                  type='number'
                  className='input w-full'
                  placeholder='Breitengrad (Latitude)'
                  min='47'
                  max='51'
                  disabled={locationform.pending}
                  step='any'
                />
              </div>
            )}

            <div id='Errors-Container' className='min-h-20'></div>

            <button
              className={`btn btn-secondary m-auto mt-2 w-full text-white ${
                locationform.pending ? 'bg-mt-color-11 cursor-not-allowed' : 'bg-mt-color-31'
              }`}
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
