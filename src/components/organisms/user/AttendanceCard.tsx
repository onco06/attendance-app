import { memo, VFC } from "react";
import {
  Box,
  Stack,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot
} from "@chakra-ui/react";

import { RecordOfAttendance } from "../../../types/api/attendance";

export const AttendanceCard: VFC<Omit<RecordOfAttendance, "id">> = memo(
  (props) => {
    const {
      user = null,
      leaveWork,
      commuting,
      lunchBreakStart,
      lunchBreakEnd,
      overtimeStart,
      overtimeEnd,
      restStart,
      restEnd,
      date
    } = props;

    return (
      <Box
        bg="white"
        w="270px"
        borderRadius="10px"
        shadow="md"
        p={4}
        _hover={{ opacity: 0.8 }}
      >
        <Stack textAlign="start">
          <Table variant="simple">
            <TableCaption placement="top">
              {user ? `日付: ${date} user: ${user}` : `日付: ${date}`}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>出勤</Td>
                <Td>{commuting}</Td>
              </Tr>
              <Tr>
                <Td>昼休憩入り</Td>
                <Td>{lunchBreakStart}</Td>
              </Tr>
              <Tr>
                <Td>昼休憩戻り</Td>
                <Td>{lunchBreakEnd}</Td>
              </Tr>
              <Tr>
                <Td>退勤</Td>
                <Td>{leaveWork}</Td>
              </Tr>
              {overtimeStart ? (
                <>
                  <Tr>
                    <Td>残業入り</Td>
                    <Td>{overtimeStart}</Td>
                  </Tr>
                  <Tr>
                    <Td>残業終わり</Td>
                    <Td>{overtimeEnd}</Td>
                  </Tr>
                  <Tr>
                    <Td>休憩入り</Td>
                    <Td>{restStart}</Td>
                  </Tr>
                  <Tr>
                    <Td>休憩戻り</Td>
                    <Td>{restEnd}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Status</Th>
                <Th>Time</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Stack>
      </Box>
    );
  }
);
