import React, { useContext } from "react";
import FormLogin from "../components/form/FormLogin";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Bonsoir {user && user.username}</h1>
      <FormLogin show={true} />
    </div>
  );
}

export default HomePage;
