
// Class to pass the result of Firebase Authentication
export default class AuthResult {

    constructor(success, result, errorCode) {
        this.success = success;
        this.result = result;
        this.errorMessage = this.getErrorMsg(errorCode);
    }

    /**
     * Get the display error message for the user.
     * 
     * @param {String} errorCode - Error code returned by Firebase.
     */
    getErrorMsg(errorCode) {

        // If there is no error just return null
        if(errorCode == null) return null;

        // Return specific error message for user based on error code
        switch(errorCode) {
            case "auth/email-already-in-use": return "An account with this email already exists!";
            case "auth/invalid-email": return "The provided email is not valid! Please try again.";
            case "auth/weak-password": return "The provided password is invalid. Password must be at-least 6 characters.";
            case "auth/user-not-found": return "Account not found! Try again with a different email.";
            case "auth/invalid-login-credentials": return "Account not found! Either the email or password is wrong!";
            case "auth/missing-password": return "Password is required!";
            case "auth/popup-closed-by-user": return null;
            default: return "Something went wrong! Please try again later.";
        }

    }




}