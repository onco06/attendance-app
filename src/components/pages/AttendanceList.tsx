import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";

import { AttendanceCard } from "../organisms/user/AttendanceCard";
import { useAttendanceListItem } from "../../hooks/useAttendanceListItem";

export const AttendanceList: VFC = memo(() => {
  const {
    getAttendanceListItem,
    attendanceList,
    loading
  } = useAttendanceListItem();
  useEffect(() => {
    getAttendanceListItem();
  }, [getAttendanceListItem]);

  // modal作って編集可能にしたいな
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 8 }} justify="center">
          {attendanceList.map((attendance) => (
            <WrapItem key={attendance.id}>
              <AttendanceCard
                user={attendance.user}
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
      )}
    </>
  );
});
