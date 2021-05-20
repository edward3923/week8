document.addEventListener(`DOMContentLoaded`, async function(event) {

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
  for (let i=0; i < json.length; i++) {
    // Store each object ("post") in memory
    let post = json[i]

    // Create an empty string for the comments
    let comments = ``

    // Loop through the post's comments
    for (let j=0; j < post.comments.length; j++) {
      // Create a variable for each comment
      let comment = post.comments[j]

      // Add HTML markup for the comment to the comment string
      comments = comments + `<div><strong>${comment.userName}</strong> ${comment.body}</div>`
    }

    // Create some markup using the post data, insert into the "posts" element
    postsDiv.insertAdjacentHTML(`beforeend`, `
      <div class="md:mt-16 mt-8">
        <div class="md:mx-0 mx-4 mt-8">
          <span class="font-bold text-xl">${post.userName}</span>
        </div>
    
        <div class="my-8">
          <img src="${post.imageUrl}" class="w-full">
        </div>

        ${comments}
      </div>
    `)
  }
})
