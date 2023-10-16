import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser, retrieveSketch } from '../firebase/UserFunctions'
import { AuthContext } from "./Contexts";

const auth =  getAuth();

// Proider for AuthContext
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

      // Keep track of Authentication stage (logged-in or logged out)
      onAuthStateChanged(auth, async (changedUser) => {
        if(changedUser != null) {
          const userInfo = await getUser( changedUser.uid);

          console.log(userInfo);
          
          if(userInfo != null) {
            setUser(userInfo);

            // Retrieve all sketch url's
            for (let i = 1; i <= userInfo.trialDay ; i++) {
              const url = await retrieveSketch(userInfo.uid, i);
              userInfo.attempts = (
                [...userInfo.attempts, 
                {
                  day: "Day " + i, 
                  sketch: <img 
                    src={url} 
                    alt={"Day " + i + " Sketch"} 
                    loading="eager" 
                    height="100%"
                    width="100%"/>
                }]);
            }
          }

        } else {
          setUser(null);
        }
      })
    }, []);
  
    return (
      <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>
    );
  };
