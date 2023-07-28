import React, { useState } from "react";

function CodeExecution(props) {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [output, setOutput] = useState();
  const [bool, setBool] = useState(false);

  const getLanguages = async () => {
    if (bool === true) return;
    const response = await fetch("http://localhost:5500/getLanguages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    try{
      const result = await response.json(response);
      setLanguages(result);
      props.showAlert("Languages Loaded", "success");
      setBool(true);
    }
    catch(e){
      props.showAlert("Language fetching failed, Unexpected Error", "danger");
    }
  };

  const HandleCode = async (event) => {
    event.preventDefault();

    if (code === "") {
      props.showAlert("Code block cannot be Empty!", "warning");
      return;
    }
    if (language === "") {
      props.showAlert("Select Language!", "warning");
      return;
    }

    let data = {
      code: JSON.stringify(code),
      language: language,
      input: JSON.stringify(input),
    };

    try {
      const response = await fetch("http://localhost:5500/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result.status.description === "Accepted") {
        setOutput(result.stdout);
        props.showAlert("Code Executed Successfully!", "success");
      } else if (result.status.description === "Compilation Error") {
        setOutput(result.compile_output);
        props.showAlert(result.status.description, "warning");
      } else if (result.status.description === "Time Limit Exceeded") {
        setOutput(result.stderr);
        props.showAlert(result.status.description, "warning");
      } else {
        setOutput(result.stderr);
        props.showAlert(result.status.description, "danger");
      }
    } catch (e) {
      setOutput("Unexpected Error");
      props.showAlert("Unexpected Error", "danger");
    }
  };

  return (
    <>
      <form
        onSubmit={HandleCode}
        className="container mt-4"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <div className="row">
          <div className="col">
            <h5> Select Language :</h5>
            <select
              name="cars"
              id="Languages"
              style={{
                backgroundColor: props.mode === "dark" ? "#141414" : "white",
                color: props.mode === "dark" ? "white" : "black",
                width: "200px",
                height: "30px",
                textAlign: "center",
                borderRadius: "3px",
              }}
              onChange={(e) => setLanguage(e.target.value)}
              onClick={getLanguages}
            >
              {languages.map((lang) => (
                <option value={lang.id} key={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <h5> Enter Input :</h5>
            <textarea
              type="text"
              className="form-control"
              style={{
                backgroundColor: props.mode === "dark" ? "#141414" : "white",
                color: props.mode === "dark" ? "white" : "black",
                border: "2px solid grey"
              }}
              name="input"
              id="input"
              value={input}
              onChange={(e) =>
                setInput(e.target.value == null ? null : e.target.value)
              }
              placeholder="Enter Inputs"
            />
            <br />
          </div>
        </div>

        <h5> Write Code Here :</h5>

        <textarea
          className="form-control"
          style={{
            backgroundColor: props.mode === "dark" ? "#141414" : "white",
            color: props.mode === "dark" ? "white" : "black",
            border: "2px solid grey"
          }}
          name="code"
          id="code"
          cols="100"
          rows="10"
          value={code}
          onChange={(e) =>
            setCode(e.target.value == null ? null : e.target.value)
          }
          placeholder="Write your code here"
        />
        <p>* Class name should be Main</p>

        <input className="btn btn-primary mx-2" type="submit" value="Submit" />
      </form>

      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Output :- </h2>
        <textarea
          className="form-control"
          style={{
            backgroundColor: props.mode === "dark" ? "#141414" : "white",
            color: props.mode === "dark" ? "white" : "black",
            border: "2px solid grey"
          }}
          name="output"
          id="output"
          cols="50"
          rows="5"
          value={output}
          readOnly
          placeholder="Press Submit"
        ></textarea>
      </div>
    </>
  );
}

export default CodeExecution;
