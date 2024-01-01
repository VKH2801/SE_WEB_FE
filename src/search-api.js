const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

console.log(query);

// Get data user from local storage
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the data from localStorage when screen init
  const encodedData = localStorage.getItem("userLoginData");
  let userRole;
  console.log(encodedData);
  if (encodedData) {
    const decodedData = JSON.parse(decodeURIComponent(encodedData));
    userRole = decodedData.role;
    // Use the data as needed
    console.log("User Data:", decodedData);

    // Display the user's name
    const welcomeMessages = document.getElementsByClassName("user-name");
    for (const welcomeMessage of welcomeMessages) {
      welcomeMessage.textContent = `${decodedData.name}`;
    }

    const userRoleDisplay = document.getElementsByClassName("role");
    for (const role of userRoleDisplay) {
      role.textContent = `${decodedData.role}`;
    }
    localStorage.setItem("userId", decodedData._id);

    // Hide links for non-admin users
    if (userRole === "student") {
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
    } else {
      document.getElementById("editPostLink").style.display = "flex";
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
      //document.getElementById("adminLink").style.display = "flex";
    }
  } else {
    // If no data found, handle accordingly
    console.error("No user data found in localStorage.");
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const playlistSearch = document.getElementById("coursesSearch");
  const errorMessage = document.getElementById("error-message");
  try {
    const response = await fetch(
      `https://uit-edu.onrender.com/api/courses/search?query=${query}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.success) {
      if (data.message) {
        data.message.forEach((item) => {
          const boxElement = document.createElement("a");
          const dateObj = new Date(item.uploadedTime);
          const itemTime = `${dateObj.getDate()}-${
            dateObj.getMonth() + 1
          }-${dateObj.getFullYear()}`;
          const totalCoursesVid = item.video.length;
          boxElement.className = "row";
          boxElement.style.marginTop = "5rem";
          boxElement.style.cursor = 'pointer';
          boxElement.href = `playlist.html?id=${item._id}`;
          boxElement.innerHTML = `
          <div class="column">

          <div class="thumb" id="thumbnail-banner">
             <img alt="video thumbnail" src="${item.thumbnail}" />
             <span>${totalCoursesVid} video</span>
          </div>
       </div>
       <div class="column">
          <div class="tutor" id="tutor-info">
             <img src="images/pic-2.jpg" alt="tutor avatar" />
             <div>
                <h3>Hoàng</h3>
                <span>${itemTime}</span>
             </div>
          </div>

          <div class="details" id="courses-details">
             <h3>${item.title}</h3>
             <p>${item.description}</p>
             
          </div>
       </div>
          `;

          playlistSearch.appendChild(boxElement);
        });
      } else {
        errorMessage.textContent = "*Sorry no couses match your requirement";
      }
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
});
