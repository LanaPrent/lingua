**for protected files:**

1. protectedRoutes.js

2. auth.js - do nothing here

3.translator.js


- in protectedRoutes.js:

router.get(

   "/members/idioms\_series\_en",

   isAuthenticated,

   (req, res) => {

       res.sendFile(

           path.join(

               \_\_dirname,

               "..",

               "protected",

               "idioms\_series\_en.html"

           )

       );

   }

);


- in html file:

<li><a data-protected='/members/idioms\_series\_en'   data-i18n="home.linkFriends" href="/members/idioms\_series\_en.html" id="friends-en">Idioms and phrases in Friends, The Big Bang Theory, and Two and a Half Men</a></li>
<li><a data-protected='/members/idioms_series_sr'   data-i18n="home.linkFriends" href="/members/idioms_series_sr.html" id="friends-sr">Idiomi i sintagme u seriji 'Prijatelji'</a></li>


- in translator.js:
 // Show/hide the Serbian exercises link or English exercises link in Footer
  const serbianExercisesLink = document.getElementById("exercises-sr");
  if (serbianExercisesLink) {
    serbianExercisesLink.style.display = lang === "en" ? "none" : "";
  }

  const englishExercisesLink=document.getElementById("exercises-en");
  if(englishExercisesLink){
    englishExercisesLink.style.display = lang ==="sr" ? "none" : "";
  }


  or in aside:
  // Show/hide the Serbian idioms link or English idioms link for Friends in aside
  const friendsSrLink = document.getElementById("friends-sr");
  if (friendsSrLink) {
    friendsSrLink.style.display = lang === "en" ? "none" : "";
  }

  const friendsEnLink=document.getElementById("friends-en");
  if(friendsEnLink){
    friendsEnLink.style.display = lang ==="sr" ? "none" : "";
  }
