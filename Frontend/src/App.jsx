import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/router/routs";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
