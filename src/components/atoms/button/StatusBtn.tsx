import { Button } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const StatusBtn: VFC<Props> = memo((props) => {
  const { children, disabled = false, onClick } = props;

  return (
    <Button colorScheme="teal" isDisabled={disabled} m={1} onClick={onClick}>
      {children}
    </Button>
  );
});
