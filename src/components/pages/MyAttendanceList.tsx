import { memo, useContext, useEffect, VFC } from "react";
import { ProfileContext } from "../../providers/ProfileProvider";

import { useMyAttendanceListItem } from "../../hooks/useMyAttendanceListItem";
import { AttendanceCard } from "../organisms/user/AttendanceCard";
import { Wrap, WrapItem } from "@chakra-ui/react";

export const MyAttendanceList: VFC = memo(() => {
  const { profile } = useContext(ProfileContext);
  const { getMyAttendanceListItem, myAttendances } = useMyAttendanceListItem();

  useEffect(() => {
    getMyAttendanceListItem();
  }, [getMyAttendanceListItem]);

  useEffect(() => {
    console.log(`change profile: ${Date.now()}`);
  }, [profile]);

  console.log(`"Home": ${Date.now()}`);
  console.log(profile);
  console.log(myAttendances);

  return (
    <>
      <p>MyAttendanceList Page</p>

      <Wrap p={{ base: 4, md: 8 }} justify="start">
        {myAttendances.slice(0, 20).map((attendance) => (
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
    </>
  );
});
