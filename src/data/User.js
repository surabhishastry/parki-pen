// User object to track patients info
export class User {

    /**
     * Constructor for initial creation
     * 
     * @param {String} firstName - User's firstname.
     * @param {String} lastName - User's lastname.
     * @param {String} email - User's email.
     * @param {String} uid - User's Firebase UID.
     */
    constructor (firstName, lastName, email, uid) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.uid = uid;
        this.chosenTrial = null;
        this.trialDay = 0;
        this.accuracies  = [];
        this.attempts = [];
    }

    /**
     * Alternative to second constructor. Helper to save fields derived from Firebase
     * 
     * @param {Number} chosenTrial - Number of trial days chosen.
     * @param {Number} trialDay - Current trial day.
     * @param {[Number]} errors - Average error for each sketch on every trial day.
     * @param {[<img>]} attempts - Sketch images for every trial day.
     */
    setSupplemental(chosenTrial, trialDay, accuracies, attempts) {
        this.chosenTrial = chosenTrial;
        this.trialDay = trialDay;
        this.accuracies = accuracies;
        this.attempts = attempts;
    }

    /**
     * Coverts User object into a string representation: (Firstname Lastname)
     * 
     * @returns String representation of User.
     */
    toString() {
        return this.firstName + " " + this.lastName;
    }
}

/**
 * Converter to facilitate data transition between Firestore document and User object.
 */
export const userConverter = {

    // Convert a User object into a JSON object 
    toFirestore: (user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            uid: user.uid,
            chosenTrial: user.chosenTrial,
            trialDay: user.trialDay,
            errors: user.accuracies,
            attempts: []
        };
    },

    // Convert Firestore snapsot into a user object
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        let userDoc = new User(
            data.firstName,
            data.lastName,
            data.email,
            data.uid,
        );
        userDoc.setSupplemental(data.chosenTrial, data.trialDay, data.accuracies, data.attempts);
        
        return userDoc;
    }
}



export const trialOptions = [null, 7, 14, 30]; // null is not enrolled in a trial program
