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
    case 'SET_MASK':
      return { ...state, mask: action.payload };

    case 'UPDATE_DATA':
      return { ...state, inputs: action.payload };

    default:
      return state;
  }
};

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [locationform, dispatchLocationForm] = useReducer(locationFormReducer, {
    mask: 'address',
    inputs: {
      street: null,
      house: null,
      city: null,
      postcode: null,
      latitude: null,
      longitude: null,
    },
    pending: false,
  });

  return (
    <SessionCtx.Provider value={{ locationform, dispatchLocationForm }}>
      {children}
    </SessionCtx.Provider>
  );
};

export { SessionCtx, SessionProvider };
