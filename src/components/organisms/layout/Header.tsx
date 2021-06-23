import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";

import { MenuIconBtn } from "../../atoms/button/MenuIconBtn";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickLogout = useCallback(() => {
    // tokenの削除処理してloginPageへ
    localStorage.clear();
    history.push("/");
  }, [history]);
  const onClickUserList = useCallback(() => history.push("/home/user_list"), [
    history
  ]);
  const onClickAttendanceList = useCallback(
    () => history.push("/home/attendance_list"),
    [history]
  );
  const onClickMyAttendanceList = useCallback(
    () => history.push("/home/myattendance_list"),
    [history]
  );
  const onClickSettings = useCallback(() => history.push("/home/settings"), [
    history
  ]);

  const onClickMenuIconBtn = () => onOpen();
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
      >
        <Box
          as="a"
          mr={8}
          _hover={{ cursor: "pointer", opacity: 0.8 }}
          onClick={onClickHome}
        >
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            padding={{ base: 2, md: 4 }}
          >
            勤怠管理App
          </Heading>
        </Box>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          <Box
            as="a"
            pr={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickUserList}
          >
            UserList
          </Box>
          <Box
            as="a"
            pr={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickAttendanceList}
          >
            AttendanceList
          </Box>
          <Box
            as="a"
            pr={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickMyAttendanceList}
          >
            MyAttendanceList
          </Box>
          <Box
            as="a"
            pr={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickSettings}
          >
            Settings
          </Box>
          <Box
            as="a"
            pr={4}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
            onClick={onClickLogout}
          >
            Logout
          </Box>
        </Flex>
        <MenuIconBtn onClick={onClickMenuIconBtn} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickLogout={onClickLogout}
        onClickUserList={onClickUserList}
        onClickAttendanceList={onClickAttendanceList}
        onClickMyAttendanceList={onClickMyAttendanceList}
        onClickSettings={onClickSettings}
      />
    </>
  );
});
