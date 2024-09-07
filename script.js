//your JS code here. If required.
//your code here
document.addEventListener("DOMContentLoaded", function() {
  const images = ["img1", "img2", "img3", "img4", "img5"];
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  
  let clickedImages = [];
  let selectedImageClasses = [];
  
  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to create and append image elements
  function createImages() {
    const selectedClass = images[Math.floor(Math.random() * images.length)];
    const allImages = [...images, selectedClass];
    
    shuffleArray(allImages);

    allImages.forEach((imgClass, index) => {
      const img = document.createElement("img");
      img.className = imgClass;
      img.dataset.index = index;
      img.addEventListener("click", handleImageClick);
      imageContainer.appendChild(img);
    });
  }

  // Handle image clicks
  function handleImageClick(event) {
    const img = event.target;
    if (clickedImages.length < 2 && !clickedImages.includes(img)) {
      img.classList.add("selected");
      clickedImages.push(img);
      selectedImageClasses.push(img.className);
      
      if (clickedImages.length === 2) {
        verifyButton.style.display = "inline";
      }

      resetButton.style.display = "inline";
    }
  }

  // Handle verify button click
  function handleVerify() {
    if (selectedImageClasses[0] === selectedImageClasses[1]) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    para.style.display = "block";
    verifyButton.style.display = "none";
  }

  // Handle reset button click
  function handleReset() {
    clickedImages.forEach(img => img.classList.remove("selected"));
    clickedImages = [];
    selectedImageClasses = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.style.display = "none";

    // Clear the current images and create new ones
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    createImages();
  }

  // Add event listeners to buttons
  resetButton.addEventListener("click", handleReset);
  verifyButton.addEventListener("click", handleVerify);

  // Initial setup
  createImages();
});
