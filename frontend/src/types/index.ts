export type SessionContextType = {
  locationform: LocationFormType;
  dispatchLocationForm: React.Dispatch<LocationFormActionType>;
};

export type LocationFormType = {
  pending: boolean;
  data: {
    address: AddressType;
    coordinates: CoordinatesType;
  };
  input: 'address' | 'coordinates';
};

type AddressType = {
  street: string | null;
  house: string | null;
  city: string | null;
  postalcode: string | null;
};

type CoordinatesType = {
  latitude: number | null;
  longitude: number | null;
};

export type LocationFormActionType =
  | { type: 'SET_PENDING'; payload: boolean }
  | { type: 'SET_INPUT'; payload: LocationFormType['input'] }
  | { type: 'SET_ADDRESS'; payload: AddressType }
  | { type: 'SET_COORDINATES'; payload: CoordinatesType };
