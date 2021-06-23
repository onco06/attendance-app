import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  onClick: () => void;
};

export const MenuIconBtn: VFC<Props> = memo((props) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="menu-icon"
      icon={<HamburgerIcon />}
      size="sm"
      variant="unstyled"
      mr={4}
      display={{ base: "block", md: "none" }}
      onClick={onClick}
    />
  );
});
