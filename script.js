let optionsButtons = document.querySelectorAll(".option-button");
let advanceOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontList
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

//Initial Settings
const initializer = () => {
  // function calls for highlighting buttons
  //No highlights for link, unlink, lists, undo, redo since they are one time operations

  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    // option.className = 'fontName'
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    // option.className = 'fontSize'
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

// main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on the selected text
  if (command === "justifyLeft") writingArea.style.textAlign = "left";
  else if (command === "justifyCenter") writingArea.style.textAlign = "center";
  else if (command === "justifyRight") writingArea.style.textAlign = "right";
  else if (command === "justifyFull") writingArea.style.textAlign = "justify";
  // else if (command === "font-name"){
  //   const selectedOption = document.querySelector('.fontName');
  //   document.execCommand(selectedOption.className,false,selectedOption.value);
  // }
  // else if (command === "font-name"){
  //   const selectedOption = document.querySelector('.fontName');
  //   document.execCommand(selectedOption.className,false,selectedOption.value);
  // }
  else document.execCommand(command, defaultUi, value);
};

//for basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g. colors, fonts)
advanceOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);// yahan pr select button ka value option ke value se replace ho jata hai.
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");

  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } 
  else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked buttions
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      // needsRemoval = true means only one button should be highlighted and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //if currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        // if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();
