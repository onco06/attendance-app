import { memo, VFC } from "react";
import { Box, Stack, Image, Text } from "@chakra-ui/react";

type Props = {
  imageUrl: string;
  status: string;
  fullName: string;
};

export const UserCard: VFC<Props> = memo((props) => {
  const { imageUrl, status, fullName } = props;

  return (
    <Box
      boxSize="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ opacity: 0.8 }}
    >
      <Stack textAlign="center">
        <Image
          src={imageUrl || "https://source.unsplash.com/random"}
          boxSize="160px"
          borderRadius="full"
          alt="profile img"
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {status}
        </Text>
        <Text fontSize="md">{fullName}</Text>
      </Stack>
    </Box>
  );
});
