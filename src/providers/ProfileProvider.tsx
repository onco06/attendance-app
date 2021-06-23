import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";

import { Profile } from "../types/api/profile";

type Props = {
  children: ReactNode;
};

type ContextType = {
  profile?: Profile | null;
  setProfile?: Dispatch<SetStateAction<Profile>>;
};

export const ProfileContext = createContext<ContextType>({});

export const ProfileProvider = (props: Props) => {
  const { children } = props;
  const [profile, setProfile] = useState<Profile>({} as Profile);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
