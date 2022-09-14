# Event Manager

The Event Manager web app keeps track of different events and tasks for an individual or groups of individuals. 

## Inspiration

My wife was the inspiration for the development of this app. Between us, we have five busy children who travel between multiple households. We wanted the kids to be able to easily enter their own practices, chores, homework, etc. as events. We also wanted them to be able to prioritize tasks for a day, which at least one of the children was doing on paper. Unfortunately, the tasks list was occasionally lost or needed to be modified.

## Technologies used
*Bcrypt  
*Cookie-session  
*Express  
*Mongoose  
*MongoDB  
*Node.js  
*React.js  
*Axios  
*Bootstrap  


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Authentication

Bcrypt and Cookie-session are used to authenticate users after they have created a new user account and then successfully logged in with their credentials.

## Application Settings View

There are three sections of the Settings View:  
* **View Defaults:** Determines the View displayed when first going to the Events or Tasks View or after logging in.  
* **Event and Tasks Defaults:** Determines the default settings to use when opening the New Event or New Task form.  
* **Change Password:** Allows the user to change their password after authenticating their current password.  

![App Settings View](https://drive.google.com/uc?id=1d_VO7yDxOd5PGSmsEgbAFVMQ0mS6rIVU)

## Group Settings View

There are four sections of the Groups View:  

![App Groups View](https://drive.google.com/uc?id=1Nm6Xgw-m69zk0o4FhDcoM_3wtwhnx3xF)

* **Group Invitations:** Lists all open invitations to Groups from other users.  

![Group Invitations](https://drive.google.com/uc?id=1CDwTf5JV0HNfAPKgdi7jeDqbBlG1Ypp_)

* **Create a New Group:** Creates a new group using only the Group Name.  
* **Owned Groups:** There are two views, depending on the position of the Edit Groups switch.  
   - **Overview:** Displays the owner, editor members, viewer members and people invited to the Group.  
      
   ![Overview of Owned Groups](https://drive.google.com/uc?id=1AAiVzC70yssftZw-cUyuYDrEIQsSyPTz)

   - **Edit:** The owner of the Group can change member permissions, as well as remove members and send invitations to join the group.
      
   ![Initial Edit View for a new Group](https://drive.google.com/uc?id=1Zqpl8U4Kc9Y4OmQ9ZnmqkUX03fPsriMg)
      
   ![Search for new members to invite to Group](https://drive.google.com/uc?id=1eqtDZLcaqURmVEAM4XO9htZDJBSm54ig)
      
   ![Owner view of Group after member accepted invitation](https://drive.google.com/uc?id=1sAiD533sjWf84Fts7bUDZPDKjbmsSTi9)
      
   ![Displayed warning when deleting a Group](https://drive.google.com/uc?id=141vDPmo7ee_PeIaZRm-zKU1zkGaRnZWx)

* **Group Membership:** Lists all the Groups for which the user is a member, but does not own.

![View of Groups that are members of, but do not own](https://drive.google.com/uc?id=1BE2XPwNXnEuik3kHvx7NLIwUylo7gu90)

## Events View

There are two different subviews for Events:  
* **By Week:** Displays the next seven days of events, organizing them to personal events and events by Group.  

   ![Events By Week View](https://drive.google.com/uc?id=1sG-Bx2kJvadms5j-5gSxlD2gRY38rpPr)

* **By Day:** There are two sections of this subview. 
   * **All Day Events:** Lists events that do not have an included time range.  
   
   ![Events By Day View - All Day Events Section](https://drive.google.com/uc?id=1KCn9DChlWjW1QAYKxj4Da9k3Nkze2gkC)

   * **Time range events:** Displays every 15 minutes for the day, collapsing any hour that does not have a time range event.  
   
   ![Events By Day View - Time range section](https://drive.google.com/uc?id=1eoC-iph-m7X-vlFPSEggjX1LkDYweUlU)

* **New Event:**  

   ![New Events](https://drive.google.com/uc?id=1Srm1eyY6LtVCqSX-Li0bcOcQJj9CT2no)

* **Individual Events:** Events can be clicked on to display a detailed view, which gives options to Edit or Delete the event, if the user has the permissions to do so.  

   ![Detailed View of individual events](https://drive.google.com/uc?id=1-zm9acqAWSenMF9CtvUg5LWROc6Trc17)

## Tasks View

There are two different subviews for Tasks:
* **By Priority:** Tasks are sorted and displayed in priority groups: Critical, High, Medium, and Low.  

   ![Tasks View - By Priority](https://drive.google.com/uc?id=17zeorn37vzmtIW9v4eqGhgZASAFTx2p3)

* **By Due Date:*** Tasks are sorted and displayed in due date groups: Past Due, Due Today, Due Tomorrow, Due WIthin the Next 7 Days and Future Due Dates.  

   ![Tasks View - By Due Date](https://drive.google.com/uc?id=18ohyKXuR12ZU1V9skxq21etVmS5w4qLL)

* **Individual Tasks:** Tasks can be clicked on to display a detailed view, which gives options to Complete, Edit or Delete the task, if the user has the permissions to do so.  

   ![Detailed View of individual events](https://drive.google.com/uc?id=1bnoJa4VDcsw3FYQAgh7NOoRK9pjS8ouG)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
