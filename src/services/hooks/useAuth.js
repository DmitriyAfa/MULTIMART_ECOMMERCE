import React from "react";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    /**
     * onAuthStateChanged() Adds an observer for changes to the user's sign-in state
     */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  return { currentUser };
};
