
# Parki-Pen

Parki-Pen represents the synergy of cutting-edge technology with the clinical applications of Parkinson's Disease. At its core, the app implements an accuracy algorithm of Euclidean distance measurement, a mathematical method renowned for its precision in assessing fine motor skills. Users are prompted to trace a spiral, a motion that closely mimics real-world motor tasks, and then analyze the intricacies of their movement. This technology enables an accurate assessment of handwriting accuracy percentage, a crucial aspect of fine motor control, providing users with a detailed chart showcasing their progress over time. The Users are able to select a trial period ranging from 7 days, 14 days, to 30 days to experience the tangible benefits of the Parki-Pen, witness their motor skill enhancements, and embrace the advice that comes with personalized insights and actionable advice.

The website is live at www.parkipen.org.


## Tech Stack

**Client:** ReactJS

**Server:** Firebase

Server management code is handled on the client side, while server security rules were integrated on Firebase.

## Installation

Clone project
```bash
git clone https://github.com/Suchith3004/hokiesmartsheet_backend.git
```

Install dependencies
```bash
cd pdapp
npm install
```

Login to Firebase - [Add your Firebase project configuration variables to the enviornment variables](https://firebase.google.com/docs/firestore/quickstart)
```bash
firebase login
```
    
## Deployment

Build project files for deployment
```bash
npm run build
```

[Deploy project with Firebase hosting](https://firebase.google.com/docs/hosting)
```bash
firebase deploy --only hosting
```



## Run Locally

Launch Firebase emulators
```
firebase emulators:start
```

Launch the website locally
```bash
npm run start
```

## Authors

- Surabhi Shastry - [@surabhishastry](https://www.github.com/surabhishastry)
- Suchith Suddala - [@suchith3004](https://www.github.com/suchith3004)

