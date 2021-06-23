import { memo, useContext, VFC } from "react";
import { ProfileContext } from "../../providers/ProfileProvider";

export const Settings: VFC = memo(() => {
  const { profile } = useContext(ProfileContext);

  return <p>Settings Page</p>;
});
