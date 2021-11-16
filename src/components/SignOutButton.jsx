import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/esm/Button";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };
  return (
    <Button variant="danger" onClick={handleLogout}>
      Sign Out
    </Button>
  );
};
