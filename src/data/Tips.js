
// Explanation of graph
export const graphDef = "A lower slope value, closer to 1, indicates a higher level of accuracy and control in your motor skills. As the slope increases toward 100, it suggests a reduction in motor skill control and increased tremors. Therefore, strive for a lower slope to maintain better motor control and quality of life.";

// Tips for each level of slope
const slopeTips = {
    1: "Your average error is “1-5,” and this is truly excellent news. It means your ability to control your motor skills is exceptional. You're maintaining your motor skills admirably, showing minimal to no signs of the tremors often associated with Parkinson's Disease. Keep up the remarkable work!",
    2: "Your average error falls between “5-10,” indicating that there may be some occasional tremors, but you're still in relatively good control of your motor skills. You're doing a commendable job of managing your condition, and we're here to support you on this journey.",
    3: "Your average error registers at “10-20,” suggesting that you're experiencing increased tremors. These tremors may make fine motor skills more challenging, and you might notice a bit more effort required in your day-to-day tasks. It's important to stay proactive and consider seeking assistance or therapies as needed.",
    4: "With a average error between “20-30,” you're facing a moderate loss of motor control due to tremors. This level of slope indicates noticeable difficulties with fine motor skills. It might be an opportune time to explore additional assistance and therapies to enhance your quality of life.",
    5: "Your average error is “30-50,” signifying a higher frequency of tremors. This could lead to difficulties in fine motor skills and may significantly impact your daily activities. Your commitment to managing these challenges is commendable, and it's advisable to consult with a healthcare professional for further guidance.",
    6: "Your average error falls within the range of “50-70,” indicating a substantial loss of motor control. Tremors may be severe, making it difficult to perform fine motor tasks. Daily living activities may be increasingly challenging. We recommend seeking expert advice and exploring advanced management options.",
    7: "With a average error of “70-100,” there is a considerable loss of motor control and frequent, severe tremors. It is imperative to consult with a healthcare professional promptly to explore advanced management options and therapies to enhance your quality of life."
};

/**
 * Retrieve the improvement tip corresponding to the average error.
 * 
 * @param {Number} average - Average error across all trial days.
 * @returns Appropriate tip to improve future sketches.
 */
export function getTip(average) {

    if(average <= 5) return slopeTips[1];
    else if(average > 5 && average <= 10) return slopeTips[2];
    else if(average > 10 && average <= 20) return slopeTips[3];
    else if(average > 20 && average <= 30) return slopeTips[4];
    else if(average > 30 && average <= 50) return slopeTips[5];
    else if(average > 50 && average <= 70) return slopeTips[6];
    else return slopeTips[7];

}

// Advisory Warning for following sketches
export const AdvisoryWarning = "Please remember that this is a general assessment, and individual experiences may vary. Regular tracking is essential to monitor your progress and assess the effectiveness of treatments and interventions. We are here to support you at every step of your journey towards better health.";

// General methods to improve arthiritis conditons.
export const TroubleshootTips = {
    "Adressing Flexibility": { 
        1: "Place your palms together (as if in prayer).",
        2: "Take a steady breath in, and as you breathe out, lower your shoulders and slowly push your hands against one another. You should feel a slight stretch in your fingers and palms.",
        3: "Hold for 30 seconds and try to maintain even pressure on each side. Make sure that your stronger hand doesn’t push the other one sideways.",
        4: "To make it more challenging, raise your elbows out towards the shoulders so the wrists are stretched further.",
        5: "Now repeat the same exercise above, but incorporate your arms.Link your fingers, then turn your hands so your palms are facing away from your body, and push your arms out.",
        6: "Stretch your arms gently. Try not to raise your shoulders. Try and hold for 30 seconds."
    },
    "Addressing Grip Control Issues": {
        1: "Hold a sheet of paper between your thumb and first two fingers.",
        2: "Using your other hand, try and pull the paper from your grip. Hold the paper tight to prevent this from happening.",
        3: "Try it with different objects, such as a mug or a ball.",
        4: "Repeat with the other hand."
    },
    "Additional Tips for Easier Writing": {
        a: ["Choose Specialized Tools:", "Consider using pens, pencils, or other writing instruments that are weighted or have built-up grips. Specially designed instruments can make writing more comfortable and legible for those with PD."],
        b: ["Pay Attention to Posture:", "Make sure you're sitting with proper body positioning when writing. Maintaining good posture can significantly support your handwriting and overall writing experience."]
    }
};