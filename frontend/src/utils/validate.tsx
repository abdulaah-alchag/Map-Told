import type { ErrorFields, LocationFormInputsType } from '@/types';

export function validate(inputs: LocationFormInputsType, mask: 'address' | 'coordinates') {
  const errors: ErrorFields = {
    address: { street: '', house: '', city: '', postcode: '' },
    coordinates: { longitude: '', latitude: '' },
  };

  if (mask === 'address') {
    const { street, house, city, postcode } = inputs;

    if (!street?.trim()) errors.address.street = 'Die Strasse darf nicht leer sein.';

    if (!house?.trim()) errors.address.house = 'Die Hausnummer darf nicht leer sein.';
    else if (!Number(house) || Number(house) <= 0)
      errors.address.house = 'Die Hausnummer muss eine gültige Zahl sein.';

    if (!city?.trim()) errors.address.city = 'Die Stadt darf nicht leer sein.';

    if (!postcode?.trim()) {
      errors.address.postcode = 'Die Postleitzahl darf nicht leer sein.';
    } else if (!Number(postcode)) {
      errors.address.postcode = 'Die Postleitzahl muss eine gültige Zahl sein.';
    }
  } else if (mask === 'coordinates') {
    const { latitude, longitude } = inputs;
    if (!latitude || !Number(latitude))
      errors.coordinates.latitude = 'Die Latitude muss eine gültige Zahl sein.';
    if (!longitude || !Number(longitude))
      errors.coordinates.longitude = 'Die Longitude muss eine gültige Zahl sein.';
  }
  return errors;
}
