//document.addEventListener(`DOMContentLoaded`, async function(event) {
firebase.auth().onAuthStateChanged(async function(user) {

  // check if user is logged in
  if (user) {

    console.log(`logged in`)
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

      // redirect to the home page
      document.location.href = `index.html`
    })

    // Build the URL for our posts API
    let url = `/.netlify/functions/posts`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Grab a reference to the element with class name "posts" in memory
    let postsDiv = document.querySelector(`.posts`)

    // Loop through the JSON data, for each Object representing a post:
    for (let i = 0; i < json.length; i++) {

      // Store each object ("post") in memory
      let post = json[i]

      // Create some markup using the post data, insert into the "posts" element
      postsDiv.insertAdjacentHTML(`beforeend`, `
      <div class="md:mt-16 mt-8">
        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">${post.userName}</span>
        </div>
        <div class="my-8">
          <img src="${post.imageUrl}" class="w-full">
        </div>

      </div>
      `)

      let commentsArray = post.comments

      for (let commentIndex = 0; commentIndex < commentsArray.length; commentIndex++) {

        let currentComment = commentsArray[commentIndex]

        console.log(currentComment)
        let commentUser = currentComment.userName
        let commentBody = currentComment.body

        //console.log(commentUser)
        //console.log(commentBody)

        postsDiv.insertAdjacentHTML(`beforeend`, `
        <div><strong>${commentUser}</strong> ${commentBody}</div>
        `)
        // <!-- comments -->
        // <div><strong>Anonymous User</strong> Tacos for breakfast</div>
      }


      // e.g.
      // Practice... how would you do the comments?
    }
  }
  else {
    console.log(`logged out`)
    // user is not logged-in, so show login
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
  }
})