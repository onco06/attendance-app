import { Button } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const PrimaryBtn: VFC<Props> = memo((props) => {
  const { children, onClick = null, disabled = false, loading = false } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      disabled={disabled}
      isLoading={loading}
    >
      {children}
    </Button>
  );
});
