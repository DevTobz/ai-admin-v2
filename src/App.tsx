import { Provider } from "react-redux";
import { Toaster } from "sonner";
import MainNavigation from "./router";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <MainNavigation />
    </Provider>
  );
}

export default App;
