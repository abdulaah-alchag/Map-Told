import { type ReactNode, createContext, useReducer } from 'react';

import type { LocationFormActionType, LocationFormType, SessionContextType } from '@types';

const SessionCtx = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [locationform, dispatchLocationForm] = useReducer(locationFormReducer, {
    pending: false,
    data: {
      address: {
        street: null,
        house: null,
        city: null,
        postalcode: null,
      },
      coordinates: {
        latitude: null,
        longitude: null,
      },
    },
    input: 'address',
  });

  return (
    <SessionCtx.Provider value={{ locationform, dispatchLocationForm }}>
      {children}
    </SessionCtx.Provider>
  );
};

export { SessionCtx, SessionProvider };

function locationFormReducer(
  locationform: LocationFormType,
  action: LocationFormActionType,
): LocationFormType {
  const { type } = action;

  switch (type) {
    case 'SET_PENDING': {
      return { ...locationform, pending: action.payload };
      break;
    }
    case 'SET_INPUT': {
      return { ...locationform, input: action.payload };
      break;
    }
    case 'SET_ADDRESS': {
      return { ...locationform, data: { ...locationform.data, address: action.payload } };
      break;
    }
    case 'SET_COORDINATES': {
      return { ...locationform, data: { ...locationform.data, coordinates: action.payload } };
      break;
    }
    default:
      return locationform;
  }
}
