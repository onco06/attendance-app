import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";

import { UserCard } from "../organisms/user/UserCard";
import { statusImage } from "../../default/status/image";
import { statusWord } from "../../default/status/word";
import { useUserListItem } from "../../hooks/useUserListItem";

export const UserList: VFC = memo(() => {
  const { getUserListItem, userList, loading } = useUserListItem();
  useEffect(() => {
    getUserListItem();
  }, [getUserListItem]);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 8 }} justify="center">
          {userList.map((userProfile) => (
            <WrapItem key={userProfile.id}>
              <UserCard
                imageUrl={statusImage[userProfile.status]}
                status={statusWord[userProfile.status]}
                fullName={userProfile.fullName}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
