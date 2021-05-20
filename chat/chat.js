// Goal: Use everything you've learned so far to create a chat application
// Step 1: Put your Firebase configuration in index.html
// Step 2: Read through and understand how basic authentication is implemented using Firebase
// Step 3: Make sure you can create a user account. Verify that the user exists in Firebase,
//         using the Firebase console.
// Step 4: Implement the recipe provided to make our chat app!

// The main event listener when using Firebase Auth
firebase.auth().onAuthStateChanged(async function(user) {

  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // write the user Object to the JavaScript console
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to or reload the home page
      window.location.href = `/chat`
    })

    // Show the messages form
    document.querySelector(`.message-form`).classList.remove(`hidden`)

    // 🔥 Step 4 begins here
    // get a reference to the "submit message" button

    // handle the "submit message" button being clicked

      // ignore the default form submit behavior

      // get a reference to the "message" input box

      // get the message that was typed in the "message" input box

      // the lambda function to create a message is already written and available at:
      // https://kiei451.com/.netlify/functions/create_message?userName=_______&body=________
      // it accepts two querystring parameters: 
      // - a userName (display name of the currently signed-in user)
      // - body (the body of the message)
      // if successfully called, the return value of the lambda is an Array of all messages

      // build the URL of the lambda function

      // Fetch the url, wait for a response, store the response in memory

      // Ask for the json-formatted data from the response, wait for the data, store it in memory

      // Grab a reference to the element with class name "messages" in memory

      // Clear anything already in the "messages" element

      // Loop through the JSON data, for each Object representing a message:

        // Store each object ("message") in memory

        // Create some markup using the post data, insert into the "messages" element
        // Sample HTML to use:
        // <div class="md:mx-0 mx-4 mt-8 w-1/2 mx-auto">
        //   <span class="font-bold">Brian says... </span>
        //   I love tacos!
        // </div>

      // clear out the messages input box
  } else {
    // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `/chat` // where to go after we`re done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)

    // Hide the messages form
    document.querySelector(`.message-form`).classList.add(`hidden`)
  }
})