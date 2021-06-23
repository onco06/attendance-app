import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { theme } from "./theme/theme";
import { Router } from "./router/Router";
import { ProfileProvider } from "./providers/ProfileProvider";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ProfileProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProfileProvider>
    </ChakraProvider>
  );
};
