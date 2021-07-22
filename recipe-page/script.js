// Change picture size
let thumbnailElement = document.getElementById("smart_thumbnail");

thumbnailElement.addEventListener("click", function() {
  if (thumbnailElement.className === "small") {
    thumbnailElement.className = "big";
  } else {
    thumbnailElement.className = "small";
  }
})

// Display random pictures
let morePictures = document.getElementById("more-pics")
let bobaUrls = [
  "https://images.unsplash.com/photo-1592318730259-6f18a6ba1c29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=651&q=80",
  "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
  "https://images.unsplash.com/photo-1600340432752-a407bab94cc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1572932759882-bb34c848d1b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://bonteacafe.com/media/brown_sugar_milk_tea_2.jpg",
  "https://i.pinimg.com/564x/45/e7/b1/45e7b1d5890326bcf1b53dba1828053f.jpg"
]; 

morePictures.addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * bobaUrls.length);
  thumbnailElement.src = bobaUrls[randomIndex];
})

