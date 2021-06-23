import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, useState, VFC } from "react";

import { PrimaryBtn } from "../atoms/button/PrimaryBtn";
import { useAuth } from "../../hooks/useAuth";
import { RepeatIcon } from "@chakra-ui/icons";

export const Login: VFC = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { jwtLogin, register, loading } = useAuth();
  const [loginPage, setLoginPage] = useState(true);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onClickLogin = useCallback(() => {
    jwtLogin({ email, password });
  }, [email, password, jwtLogin]);
  const onClickRegester = useCallback(() => {
    // regiseter hooksを呼び出す
    register({ email, password, username });
  }, [email, password, username, register]);

  const onClickRepeatIcon = useCallback(() => {
    setLoginPage(!loginPage);
  }, [loginPage]);

  return (
    <Center h="100vh">
      <Flex justify="center" align="center">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            勤怠管理App
          </Heading>
          <Divider my={4} />
          <Stack spacing={4} py={4} px={10}>
            <Input placeholder="Email" value={email} onChange={onChangeEmail} />
            <Input
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              type="password"
            />
            {loginPage ? (
              <PrimaryBtn
                onClick={onClickLogin}
                disabled={email === "" || password === "" || loading}
                loading={loading}
              >
                Login
              </PrimaryBtn>
            ) : (
              <>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => onChangeUserName(e)}
                />
                <PrimaryBtn
                  onClick={onClickRegester}
                  disabled={
                    email === "" ||
                    password === "" ||
                    username === "" ||
                    loading
                  }
                  loading={loading}
                >
                  Register
                </PrimaryBtn>
              </>
            )}
          </Stack>
          <Box
            textAlign="center"
            onClick={onClickRepeatIcon}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
          >
            <RepeatIcon boxSize={6} />
          </Box>
        </Box>
      </Flex>
    </Center>
  );
});
