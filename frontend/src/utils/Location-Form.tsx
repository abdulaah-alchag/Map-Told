import type { LocationFormInputsType } from '@types';

export const validateLocationInputs = ({
  street,
  house,
  postcode,
  city,
  longitude,
  latitude,
}: LocationFormInputsType) => {
  const newErrors: Partial<Record<keyof LocationFormInputsType, string>> = {};
  const str = (v?: string | null) => (v ?? '').trim();

  if (!str(street)) newErrors.street = 'Bitte Straße eingeben.';
  if (!str(house)) newErrors.house = 'Bitte Hausnummer eingeben.';
  if (!str(postcode)) newErrors.postcode = 'Bitte PLZ eingeben.';
  if (!str(city)) newErrors.city = 'Bitte Stadt eingeben.';

  const lon = longitude == null ? NaN : Number(longitude);
  if (!Number.isFinite(lon) || lon < 5 || lon > 16)
    newErrors.longitude = 'Längengrad zwischen 5 und 16 eingeben.';

  const lat = latitude == null ? NaN : Number(latitude);
  if (!Number.isFinite(lat) || lat < 47 || lat > 51)
    newErrors.latitude = 'Breitengrad zwischen 47 und 51 eingeben.';

  return newErrors;
};
