import { Container, ThemeProvider } from "@mui/material";
import Routers from "./routers";
import theme from "@/themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routers />
      </Container>
    </ThemeProvider>
  );
}

export default App;
