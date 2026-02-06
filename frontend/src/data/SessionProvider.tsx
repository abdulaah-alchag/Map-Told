import { type ReactNode, createContext, useReducer } from 'react';

import {
  LocationFormActionSchema,
  type LocationFormActionType,
  type LocationFormType,
  type SessionContextType,
} from '@types';

const SessionCtx = createContext<SessionContextType | undefined>(undefined);

const locationFormReducer = (
  state: LocationFormType,
  action: LocationFormActionType,
): LocationFormType => {
  LocationFormActionSchema.parse(action);

  switch (action.type) {
    case 'SET_PENDING':
      return { ...state, pending: action.payload };

    case 'SET_MASK':
      return { ...state, mask: action.payload };

    case 'SET_ADDRESS':
      return {
        ...state,
        data: { ...state.data, address: action.payload },
      };

    case 'SET_COORDINATES':
      return {
        ...state,
        data: { ...state.data, coordinates: action.payload },
      };

    default:
      return state;
  }
};

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
    mask: 'address',
  });

  return (
    <SessionCtx.Provider value={{ locationform, dispatchLocationForm }}>
      {children}
    </SessionCtx.Provider>
  );
};

export { SessionCtx, SessionProvider };
