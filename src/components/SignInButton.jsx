import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = (props) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginRedirect({ ...loginRequest, state: props.subdomain })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button variant="secondary" onClick={handleLogin}>
      Sign In
    </Button>
  );
};
