import { memo, useContext, useEffect, VFC } from "react";
import { ProfileContext } from "../../providers/ProfileProvider";

import { useHomeItem } from "../../hooks/useHomeItem";
import { UserCard } from "../organisms/user/UserCard";
import { AttendanceCard } from "../organisms/user/AttendanceCard";
import { statusWord } from "../../default/status/word";
import { statusBtnList, statusBtnDisable } from "../../default/status/btn";
import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { StatusBtn } from "../atoms/button/StatusBtn";
import { useChangeStatus } from "../../hooks/useChangeStatus";

export const Home: VFC = memo(() => {
  const { profile } = useContext(ProfileContext);
  const { getHomeItem, myAttendances, setMyAttendances } = useHomeItem();
  const { onClickStatusBtn } = useChangeStatus({
    myAttendances,
    setMyAttendances
  });

  useEffect(() => {
    getHomeItem();
  }, [getHomeItem]);

  useEffect(() => {
    console.log(`change profile: ${Date.now()}`);
  }, [profile]);

  console.log(`"Home": ${Date.now()}`);
  console.log(profile);
  console.log(myAttendances);

  return (
    <>
      <p>Home Page</p>
      <Flex justify="center">
        <Flex direction="column" p={{ base: 4, md: 8 }}>
          <UserCard
            imageUrl={profile?.img}
            status={statusWord[profile?.status] || "退勤"}
            fullName={profile?.fullName}
          />
          {profile?.status ? (
            <>
              {statusBtnList.map((statusBtnWord, idx) => (
                <Box key={statusBtnWord}>
                  {/* {!statusBtnDisable[profile.status][idx] ? (
                    <StatusBtn
                      disabled={statusBtnDisable[profile.status][idx]}
                      onClick={() => onClickStatusBtn(idx.toString())}
                    >
                      {statusBtnWord}
                    </StatusBtn>
                  ) : null} */}
                  <StatusBtn
                    disabled={statusBtnDisable[profile.status][idx]}
                    onClick={() => onClickStatusBtn(idx.toString())}
                  >
                    {statusBtnWord}
                  </StatusBtn>
                </Box>
              ))}
            </>
          ) : null}
        </Flex>
        <Wrap p={{ base: 4, md: 8 }} justify="center">
          {myAttendances.slice(0, 5).map((attendance) => (
            <WrapItem key={attendance.id}>
              <AttendanceCard
                user={undefined}
                leaveWork={attendance.leaveWork}
                commuting={attendance.commuting}
                lunchBreakStart={attendance.lunchBreakStart}
                lunchBreakEnd={attendance.lunchBreakEnd}
                overtimeStart={attendance.overtimeStart}
                overtimeEnd={attendance.overtimeEnd}
                restStart={attendance.restStart}
                restEnd={attendance.restEnd}
                date={attendance.date}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </>
  );
});
