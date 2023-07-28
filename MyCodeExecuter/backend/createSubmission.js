const axios = require("axios");
module.exports.createSubmission = async function (code, language, input) {
  //btoa() takes a string and encodes it to Base64.
  var encoded_code = btoa(code);
  var encoded_input = btoa(input);
  const options = {
    method: "POST",
    url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "d476650112mshce9dbca70399f75p1f18a8jsn398ffe13c414",
      "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
    },
    data: {
      language_id: language,
      source_code: encoded_code,
      stdin: encoded_input,
    },
  };
  let output = "";
  try {
    const response = await axios.request(options);
    output = await getSubmission(response.data.token);
    return output;
  } catch (e) {
    console.log("error occurred");
    output = {
      status: { description: "error" },
      stderr: `${e}\nInternal Error! Please try after some time`,
    };
  }
  return output;
};
const getSubmission = async (token) => {
  token = token.trim();
  const options = {
    method: "GET",
    url: `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "d476650112mshce9dbca70399f75p1f18a8jsn398ffe13c414",
      "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
    },
  };
  try {
    var response = await axios.request(options);
    while (
      response.data.status.description == "Processing" ||
      response.data.status.description == "In Queue"
    ) {
      response = await axios.request(options);
    }
    return response.data;
  } catch (e) {
    return {
      status: { description: "error" },
      stderr: `${e}\nInternal Error! Please try after some time`,
    };
  }
};
