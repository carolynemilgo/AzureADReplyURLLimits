import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import Button from "react-bootstrap/Button";
import "./styles/App.css";
import { useIsAuthenticated } from "@azure/msal-react";

const MainContent = ({ domain }) => {
  const { instance, accounts } = useMsal();
  const [response, setResponse] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then((tokenResponse) => {
        // Handle redirect response
        setResponse(tokenResponse);
      })
      .catch((error) => {
        console.log("Error::", error);
      });
  }, []);

  useEffect(() => {
    console.log("Response:::", response);
    if(response?.state)
    window.location.href=response.state;
  }, [response?.state]);

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h2>
            Will redirect to the Sub Domain{" "}
            {response?.state ?? "...nowhere, no state"}
          </h2>
          <p>{response ? JSON.stringify(response) : ""}</p>
        </div>
      ) : (
        <h2>Not Authenticated, no redirect</h2>
      )}
    </div>
  );
};

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const onClickHandler = (e) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <PageLayout subdomain={selectedDomain}>
      <MainContent domain={selectedDomain} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          paddingLeft: 100,
        }}
      >
        <div>
          <input
            type="radio"
            id="vehicle1"
            name="subdomain"
            value="https://www.bluebellkenya.com"
            style={{ margin: "10px" }}
            onClick={onClickHandler}
          />
          <label for="vehicle1"> Bluebell Kenya</label>
        </div>
        <div>
          <input
            type="radio"
            id="vehicle2"
            name="subdomain"
            value="subdomainb"
            style={{ margin: "10px" }}
            onClick={onClickHandler}
          />
          <label for="vehicle2"> Subdomain Domain B </label>
        </div>
        <div>
          <input
            type="radio"
            id="vehicle3"
            name="subdomain"
            value="subdomainc"
            style={{ margin: "10px" }}
            onClick={onClickHandler}
          />
          <label for="vehicle3"> Subdomain Domain C</label>
        </div>
      </div>
    </PageLayout>
  );
}
