import { AlertContext } from "./Contexts";
import { useEffect, useState } from "react";

/**
 * Provider for AlertsContext.
 */
export const AlertsProvider = ({children}) => {
    // States for alert display
    const [isAlertVisible, setAlertVisibility] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [severity, setSeverity] = useState("info");

    /**
     * Sets the severity and message of the alert and dispalys it.
     * 
     * @param {String} severity - Severity of the alert ('info', 'success', 'error', 'warn')
     * @param {String} message - Message to be displayed for the user
     */
    function showAlert(severity, message) {
        setSeverity(severity);
        setAlertMsg(message);
        setAlertVisibility(true);
    }

    // Close the alert after 5 seconds
    useEffect(() => {

        if(isAlertVisible)
            setTimeout(() => {setAlertVisibility(false)}, 3000);

    }, [isAlertVisible]);

    return (
        <AlertContext.Provider 
            value={[
                isAlertVisible, alertMsg, severity, setAlertVisibility, showAlert
            ]}>
                {children}
            </AlertContext.Provider>
    );
}