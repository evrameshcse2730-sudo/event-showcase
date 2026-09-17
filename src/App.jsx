import Home from "./pages/home";
import Admin from "./pages/Admin";

function App() {
  const path = window.location.pathname;

  if (path === "/admin") {
    return <Admin />;
  }

  return <Home />;
}

export default App;

