const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const userData = localStorage.getItem("userLoginData");
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");
const form = document.getElementById("updateCoursesForm");
const descriptionContent = document.getElementById("content");
const videoPlaylistContainer = document.getElementById(
  "container-playlist-video"
);
const errorMessageContainer = document.getElementById("error-message");
const modal = document.getElementById("confirmModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const closeButton = document.querySelector(".modal .close:not(.confirm)");
let selectedVideoIds = [];

// Show modal
function showModal() {
  modal.style.display = "flex";
}

// Hide modal
function hideModal() {
  modal.style.display = "none";
}

// Event listeners for modal
confirmDeleteButton.addEventListener("click", handleConfirmDelete);
closeButton.addEventListener("click", hideModal);

// Function to handle delete confirmation
async function handleConfirmDelete() {
  // Check if any courses are selected for deletion
  if (selectedVideoIds.length > 0) {
    // Iterate over the selected course IDs
    for (const cardId of selectedVideoIds) {
      // Call the API to delete each course
      await deleteVideoAPI(cardId);
    }

    // Clear the array of selected card IDs
    selectedVideoIds = [];
  }

  // Reset the flag and hide the modal
  isSelectedForDelete = false;
  hideModal();
}

// Function to delete a video item
async function deleteItem(videoId) {
  const apiUrl = `https://uit-edu.onrender.com/api/videos/${videoId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log(`Video with ID ${videoId} deleted successfully`);
      // Reload the page or update the UI as needed
      window.location.reload();
    } else {
      console.error("Failed to delete video:", data.message);
    }
  } catch (error) {
    console.error("Error during API call:", error.message);
  }
}

function createVideoPlaylistSkeleton() {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const actionContainer = document.createElement("div");
  actionContainer.className = "action-container skeleton";
  actionContainer.innerHTML = `
<i class="fa-solid fa-pen-to-square"></i>
<i class="fa-solid fa-trash"></i>
`;
  cardElement.appendChild(actionContainer);

  const cardImage = document.createElement("div");
  cardImage.className = "card-image skeleton";
  cardImage.innerHTML = `
<img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlsbHVzdHJhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
`;
  cardElement.appendChild(cardImage);

  const cardTitle = document.createElement("a");
  cardTitle.href = "#";
  cardTitle.className = "card-title skeleton";
  cardTitle.textContent = "Card title here";
  cardElement.appendChild(cardTitle);
  return cardElement;
}

document.addEventListener("DOMContentLoaded", async function () {
  // Create skeleton loading
  for (let i = 0; i <= 5; i++) {
    const cardElement = createVideoPlaylistSkeleton();
    videoPlaylistContainer.appendChild(cardElement);
  }

  const welcomeMessages = document.getElementsByClassName("user-name");
  const userRoleDisplay = document.getElementsByClassName("role");
  const titleCourses = document.getElementById("");
  if (userData) {
    const decodedData = JSON.parse(decodeURIComponent(userData));
    console.log(decodedData);
    for (const welcomeMessage of welcomeMessages) {
      welcomeMessage.textContent = `${decodedData.name}`;
    }
    for (const role of userRoleDisplay) {
      role.textContent = `${decodedData.role}`;
    }

    // Hide links for non-admin users
    if (decodedData.role === "student") {
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
    } else {
      document.getElementById("editPostLink").style.display = "flex";
      document.getElementById("aboutLink").style.display = "flex";
      document.getElementById("coursesLink").style.display = "flex";
      document.getElementById("adminLink").style.display = "flex";
    }
  }

  //=================== update elements when screen init
  const apiUrl = `https://uit-edu.onrender.com/api/courses/${courseId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    });

    const dataRes = await response.json();
    console.log(dataRes);
    if (dataRes.success === true) {
      form.querySelector('[name="title"]').value = dataRes.message.title;
      descriptionContent.innerText = dataRes.message.description;

      replaceSkeletonWithActualContent(dataRes.message.video);
    }
  } catch (e) {
    console.log("Error in fetch with _id", e.message);
  }





  //Handle submit data courses (title and description)
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Retrieve data from the form
    const title = form.querySelector('[name="title"]').value;
    const description = document.getElementById("content").innerText;

    // Prepare the request body
    const requestBody = {
      title: title,
      description: description,
      // Add any other data you need to send to the API
    };

    // Make the API call
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
          "Refresh-Token": refreshToken,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Handle the API response as needed
      if (data.success) {
        console.log("Course updated successfully");
        window.location.href = "edit-post.html";
      } else {
        // Handle errors or display error messages
        console.error("Failed to update course:", data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  });

  videoPlaylistContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-trash")) {
      // Get the parent action container
      const actionContainer = event.target.parentElement;

      // Get the card ID
      const cardId = actionContainer.dataset.cardId;

      // Toggle the selected class on the action container
      actionContainer.classList.toggle("selected");

      // Update the flag based on the selection
      isSelectedForDelete = actionContainer.classList.contains("selected");

      // Update the array of selected card IDs
      if (isSelectedForDelete) {
        selectedVideoIds.push(cardId);
      } else {
        // Remove the card ID if the item is deselected
        const index = selectedVideoIds.indexOf(cardId);
        if (index !== -1) {
          selectedVideoIds.splice(index, 1);
        }
      }

      // Show the modal when the delete icon is clicked and at least one item is selected
      if (isSelectedForDelete && selectedVideoIds.length > 0) {
        showModal();
      }
    }
  });
});

// Function to create a card with actual content
function createCardWithData(video) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  // Populate card with actual data from the API
  // Update properties like course.instructor, course.thumbnail, etc.
  cardElement.innerHTML = `
      
      <div class="card-image">
         <img src="${video.thumbnail}" alt="">
      </div>
      <div >
        <a href="watch-video.html?id=${video._id}" class="card-title">${video.title}</a>
        <div data-card-id="${video._id}" id="action-container-delete-video">
          <i class="fa-solid fa-trash"></i></div>
        
      </div>
      
      `;

  return cardElement;
}

// Function to remove skeletons and append actual content
function replaceSkeletonWithActualContent(dataVideos) {
  const videoPlaylistContainer = document.getElementById(
    "container-playlist-video"
  );

  // Remove existing skeletons
  const skeletons = videoPlaylistContainer.querySelectorAll(".skeleton");
  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });

  // Remove existing cards
  const existingCards = videoPlaylistContainer.querySelectorAll(".card");
  existingCards.forEach((card) => {
    card.remove();
  });

  dataVideos.forEach((course) => {
    const cardElement = createCardWithData(course);
    videoPlaylistContainer.appendChild(cardElement);
  });
}

// Handle skeleton UX
const allSkeleton = document.querySelectorAll(".skeleton");

// Thực hiện sau khi trang đã được load
window.addEventListener("load", function () {
  // Delay 2 giây
  setTimeout(function () {
    allSkeleton.forEach((item) => {
      item.classList.remove("skeleton");
    });
  }, 900); // 2000 milliseconds = 2 seconds
});

// Hàm gọi API để xóa card
async function deleteVideoAPI(videoId) {
  console.log(videoId);
  const response = await fetch(
    `https://uit-edu.onrender.com/api/videos/${videoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
    }
  );

  const data = await response.json();

  if (data.success) {
    window.location.reload();
  } else {
    console.log("Fail");
  }

  isSelectedForDelete = false;
}

// Handle submit image and video to clound
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dsumaah4a/upload";
const videoFileInput = document.getElementById("video-input");
const imageFileInput = document.getElementById("thumbnail-video-input");
let isImageUploadComplete = false;
let isVideoUploadComplete = false;
let thumbnailUrl;
let videoUrl;
let decodeData;

async function onClickUploadImage(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submit-thumbnail-image");
  const loadingBtn = document.getElementById("loading-spinner-image");
  

  const imageFile = imageFileInput.files;
  const formData = new FormData();
  console.log(imageFile.length);
  if (imageFile.length > 0) {
    loadingBtn.style.display = "flex";
    submitBtn.style.display = "none";
  } else {
    return;
  }
  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append("file", file);
    formData.append("upload_preset", "zg66bk3z");

    await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("response: ", response);
        loadingBtn.style.display = "none";
        submitBtn.style.display = "none";
        imageFileInput.disabled = true;
        return response.text();
      })
      .then((data) => {
        decodeData = JSON.parse(data);
        if (decodeData) {
          thumbnailUrl = decodeData.url;
          console.log("image url: ", thumbnailUrl);
        } else {
          imageFileInput.disabled = false;
          submitBtn.style.display = "inline";
        }
        isImageUploadComplete = true;
      });
  }
}

async function onClickUploadVideo(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submit-thumbnail-video");
  const loadingBtn = document.getElementById("loading-spinner-video");


  const imageFile = videoFileInput.files;
  const formData = new FormData();
  console.log(imageFile.length);
  if (imageFile.length > 0) {
    loadingBtn.style.display = "flex";
    submitBtn.style.display = "none";
  } else {
    return;
  }
  for (let i = 0; i < imageFile.length; i++) {
    let file = imageFile[i];
    formData.append("file", file);
    formData.append("upload_preset", "zg66bk3z");

    await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("response: ", response);
        loadingBtn.style.display = "none";
        submitBtn.style.display = "none";
        videoFileInput.disabled = true;
        return response.text();
      })
      .then((data) => {
        decodeData = JSON.parse(data);
        if (decodeData) {
          videoUrl = decodeData.url;
          console.log("video url: ", videoUrl);
        } else {
          videoFileInput.disabled = false;
          submitBtn.style.display = "inline";
        }
        isVideoUploadComplete =  true;
      });
  }
}


//Handle upload video to course ID
const formUpdateVideo = document.getElementById('updateVideoForm');
formUpdateVideo.addEventListener("submit", async function (event) {
  event.preventDefault();
  const errorMessage = document.getElementById('error-message-upload-video');

  // Kiểm tra nếu cả hai hàm đã hoàn thành upload
  if (!isImageUploadComplete || !isVideoUploadComplete) {
    errorMessage.textContent = 'Please what until upload video or image complete!!!';
    return;
  }


  const title = document.getElementById('title-video-input').value;
  
  const url = `https://uit-edu.onrender.com/api/videos/`;

  const formData = {
    title: title,
    thumbnail: thumbnailUrl,
    src: videoUrl,
    course: courseId
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
        "Refresh-Token": refreshToken,
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json();

    if (data.success) {
      console.log(data);
      window.location.reload();
    } else {
      errorMessage.textContent = '*Fail to fetch data'
    }
  } catch (error) {
    console.error(error);
  }
})
