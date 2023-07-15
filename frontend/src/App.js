import "./App.css";
import Markup from "./Markup/Markup";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <div className="App">
      <Markup />
      <NotificationContainer />
    </div>
  );
}

export default App;
