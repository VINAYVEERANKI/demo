import "./App.css";
import Index from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;