import { useState } from "react";
import Alert from "./component/Alert";
import CodeExecution from "./component/CodeExecution";
import Navbar from "./component/Navbar";

function App() {
  const [mode, setMode] = useState("light"); // whether dark mode is enabled or not
  const [alert, setAlert] = useState(null); // alert is an object
  // type : danger, success, primary ...
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode Enabled", "light");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark Mode Enabled", "dark");
    }
  };
  return (
    <>
      <Navbar mode={mode} title="MyCodeExecuter" toggleMode={toggleMode} />
      <Alert alert={alert} />
      <CodeExecution mode={mode} showAlert={showAlert} />
    </>
  );
}

export default App;
