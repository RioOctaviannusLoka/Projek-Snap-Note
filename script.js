const settingButton = document.querySelectorAll(".settings");
const settingContainer = document.querySelectorAll(".setting-details");
//mendapatkan data users di localStorage
const users = JSON.parse(localStorage.getItem('users'));
const emailActive = JSON.parse(localStorage.getItem('emailActive'));

let userName = document.querySelector(".userName")
let UserName = document.querySelector(".UserName")
let emailUser = document.querySelector(".emailUser")
let passwordUser = document.querySelector(".passwordUser")
let changePwBtn = document.querySelector(".change-password")

let userIndex

settingButton.forEach((element) => {
  element.addEventListener("click", () => {
    settingButton.forEach((elem) => {
      elem.classList.remove("active");
    });
    element.classList.add("active");
    let current = element.className;
    current = current.split(" ");
    current = current[2];

    settingContainer.forEach((el) => {
      el.classList.remove("inactive");
    });
    settingContainer.forEach((el) => {
      let el_class = el.className;
      el_class = el_class.split(" ");
      el_class.forEach((ele) => {
        if (current == ele) {
          el.classList.remove("inactive");
        } else {
          el.classList.add("inactive");
        }
      });
    });
  });
});

//mencari data user sesuai emai
let emailExist = users.find(user => 
  user.email === emailActive
);

//mengubah content document sesuai info user
document.addEventListener('DOMContentLoaded', function() {
  UserName.textContent = emailActive.split('@')[0];
  userName.textContent = emailActive.split('@')[0];
  emailUser.textContent = emailActive;
  passwordUser.value = emailExist.password;
});

for(let i = 0; i < users.length; i++){
  if(users[i].email === emailActive){
    userIndex = i;
  }
}

changePwBtn.addEventListener('click', () =>{
  users[userIndex] = {email: users[userIndex].email, notes: users[userIndex].notes, password: passwordUser.value}
  localStorage.setItem('users', JSON.stringify(users));
});