const settingButton = document.querySelectorAll(".settings");
const settingContainer = document.querySelectorAll(".setting-details");

settingButton.forEach((element) => {
  element.addEventListener("click", () => {
    settingButton.forEach((elem) => {
      elem.classList.remove("active");
    });
    element.classList.add("active");
    let current = element.className;
    current = current.split(" ");
    current = current[2];
    console.log(current);

    settingContainer.forEach((el) => {
      el.classList.remove("inactive");
    });
    settingContainer.forEach((el) => {
      let el_class = el.className;
      el_class = el_class.split(" ");
      console.log(el_class);
      el_class.forEach((ele) => {
        if (current == ele) {
          el.classList.remove("inactive");
          console.log("Hello");
          console.log(el.className);
          console.log(el.innerHTML);
        } else {
          console.log("Dor");
          el.classList.add("inactive");
          console.log(el.className);
        }
      });
    });
  });
});
