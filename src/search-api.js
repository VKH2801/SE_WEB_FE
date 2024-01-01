const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

console.log(query);




// Get data user from local storage
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the data from localStorage when screen init
  const encodedData = localStorage.getItem('userLoginData');
  let userRole;
  console.log(encodedData);
  if (encodedData) {
     const decodedData = JSON.parse(decodeURIComponent(encodedData));
     userRole = decodedData.role
     // Use the data as needed
     console.log('User Data:', decodedData);

     // Display the user's name
     const welcomeMessages = document.getElementsByClassName('user-name');
     for (const welcomeMessage of welcomeMessages) {
        welcomeMessage.textContent = `${decodedData.name}`;
     }

     const userRoleDisplay = document.getElementsByClassName('role');
     for (const role of userRoleDisplay) {
        role.textContent = `${decodedData.role}`
     }
     localStorage.setItem('userId', decodedData._id);


     // Hide links for non-admin users
     if (userRole === 'student') {
        document.getElementById('aboutLink').style.display = 'flex';
        document.getElementById('coursesLink').style.display = 'flex';
     } else {
        document.getElementById('editPostLink').style.display = 'flex';
        document.getElementById('aboutLink').style.display = 'flex';
        document.getElementById('coursesLink').style.display = 'flex';
        document.getElementById('adminLink').style.display = 'flex';
     }
  } else {
     // If no data found, handle accordingly
     console.error('No user data found in localStorage.');
  }
});


document.addEventListener('DOMContentLoaded', async function () {
  const playlistSearch = document.getElementsByClassName('playlist-details');
  const errorMessage = document.getElementById('error-message')
  try {
    const response = await fetch(`https://uit-edu.onrender.com/api/courses/search?query=${query}`, {
      method: 'GET'
    })

    const data = await response.json();
    console.log(data);
    if (data.success) {
      if (data.message) {
        data.message.forEach(item => {
          const boxElement = document.createElement('div');
          boxElement.className = 'row';
          boxElement.style.marginTop = '5rem';
          boxElement.innerHTML = `
          <div class="column">
          <form action="" method="post" class="save-playlist" id="btn-save-playlist">
             <button type="submit">
                <i class="far fa-bookmark"></i> <span>save playlist</span>
             </button>
          </form>

          <div class="thumb" id="thumbnail-banner">
             <img alt="video thumbnail" src="images/post-1-1.png" />
             <span></span>
          </div>
       </div>
       <div class="column">
          <div class="tutor" id="tutor-info">
             <img src="images/pic-2.jpg" alt="tutor avatar" />
             <div>
                <h3>Hoàng</h3>
                <span>27-12-2023</span>
             </div>
          </div>

          <div class="details" id="courses-details">
             <h3>HTML</h3>
             <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque labore ratione, hic exercitationem
                mollitia obcaecati culpa dolor placeat provident porro.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid iure autem non fugit sint. A, sequi
                rerum architecto dolor fugiat illo, iure velit nihil laboriosam cupiditate voluptatum facere cumque
                nemo!</p>
             
          </div>
       </div>
          `;
        })
      }
    } else {
      return
    }
  } catch (error) {
    console.error(error);
  }
});