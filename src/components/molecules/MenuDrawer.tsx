import { memo, VFC } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickLogout: () => void;
  onClickUserList: () => void;
  onClickAttendanceList: () => void;
  onClickMyAttendanceList: () => void;
  onClickSettings: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    onClickHome,
    onClickLogout,
    onClickUserList,
    onClickAttendanceList,
    onClickMyAttendanceList,
    onClickSettings
  } = props;
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xs" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          bg="gray.100"
          textAlign="center"
          style={{ transition: "all 0.3s" }}
          _hover={{ opacity: 0.8, backgroundColor: "gray.300" }}
        >
          <Link onClick={onClickHome} style={{ textDecoration: "none" }}>
            Home
          </Link>
        </DrawerHeader>
        <DrawerBody p={0} bg="gray.100">
          <Button w="100%" onClick={onClickUserList}>
            UserList
          </Button>
          <Button w="100%" onClick={onClickAttendanceList}>
            AttendanceList
          </Button>
          <Button w="100%" onClick={onClickMyAttendanceList}>
            MyAttendanceList
          </Button>
          <Button w="100%" onClick={onClickSettings}>
            Settings
          </Button>
          <Button w="100%" onClick={onClickLogout}>
            Logout
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
