/*
Chen Haziza - 319007892
Yakov Amoyal - 315177543
*/
// Get the OL element and the "Add Item" button
const ol = document.getElementById("myList");
const addItemButton = document.getElementById("addButton");
const chartContainer = document.getElementById("chart");
const moreLi = document.getElementById("moreLi")
let todoCount = 0;
let doneCount = 0;
let flag = false;

// Add a click event listener to the "Add Item" button
var text = document.getElementById("myInput");
text.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("addButton").click();
  }
});

addItemButton.addEventListener("click", addItem);


// Function to add a new list item
function addItem() {
  // Create a new LI element and its child nodes
  const newItem = document.createElement("li");
  const inputText = document.getElementById("myInput").value;
  const textNode = document.createTextNode(inputText);
  const tooltip = document.createElement("span");
  tooltip.classList.add("tooltip");
//create button and design with imoji
  const upButton = document.createElement("button");
  upButton.className = "btns1";
  const downButton = document.createElement("button");
  downButton.className = "btns2";
  const deleteButton = document.createElement("button");
  deleteButton.className = "btns3";
  upButton.classList.toggle("hidd");
  deleteButton.classList.toggle("hidd");
  downButton.classList.toggle("hidd");

deleteButton.addEventListener("mouseenter", () => {
       tooltip.textContent ="";
       tooltip.style.backgroundColor = " rgb(93, 151, 142)";
  });
  upButton.addEventListener("mouseenter", () => {
    tooltip.textContent ="";
    tooltip.style.backgroundColor = " rgb(93, 151, 142)";
});
downButton.addEventListener("mouseenter", () => {
  tooltip.textContent ="";
  tooltip.style.backgroundColor = " rgb(93, 151, 142)";
});
deleteButton.addEventListener("click", () => {
  tooltip.textContent ="";
  tooltip.style.backgroundColor = " rgb(93, 151, 142)";
});
upButton.addEventListener("click", () => {
  tooltip.textContent ="";
  tooltip.style.backgroundColor = " rgb(93, 151, 142)";
});
downButton.addEventListener("click", () => {
  tooltip.textContent ="";
  tooltip.style.backgroundColor = " rgb(93, 151, 142)";
});

  upButton.innerHTML = "&#128070;";
  upButton.style.fontSize = "13px";
  downButton.innerHTML = "&#128071;";
  downButton.style.fontSize = "13px";
  deleteButton.innerHTML = "&#10060;";
  deleteButton.style.fontSize = "13px";

  // Add event listeners for tooltip display
  newItem.addEventListener("mouseenter", (ev) => {
    if (ev.target.classList.contains("checked")) {
        tooltip.textContent = "Click to mark : Undone"
        tooltip.style.backgroundColor = "gray"
    }else{
      tooltip.textContent = "Click to mark : Done"
      tooltip.style.backgroundColor = "gray"
    }
  });
  newItem.addEventListener("onmouseout", () => {
    tooltip.textContent = "";
  });
  newItem.addEventListener("click", (ev) => {
    if (! ev.target.classList.contains("hidd")){
    if (ev.target.classList.contains("checked")) {
        tooltip.textContent = "Click to mark : Done"
    }else {
      tooltip.textContent = "Click to mark : Undone"
    }
  }
  });


  // Add event listeners to the up, down, and delete buttons
  upButton.addEventListener("click", () => moveItemUp(newItem));
  downButton.addEventListener("click", () => moveItemDown(newItem));
  deleteButton.addEventListener("click", () => deleteItem(newItem));

  newItem.appendChild(tooltip);
  newItem.appendChild(textNode);
  newItem.appendChild(upButton);
  newItem.appendChild(downButton);
  newItem.appendChild(deleteButton);
  
  // Check the input
  var listLength = ol.getElementsByTagName("li").length;
  if (inputText === "") {
    alert("You must write something");
  }
  else if(inputText.length > 29){
    alert("Your input is too long ");
  }else if (listLength < 11) {
    // Add the new LI element to the OL element
    ol.appendChild(newItem);
    todoCount++;
  }else if(listLength >= 20){
    alert("To add more assignments, delete existing assignments")
  }else if(listLength===11 && flag===false){
    const img = document.createElement("img");
    img.src = "./note2.jpg";
    img.style.width = "600px";
    img.style.height = "300px";
    document.getElementById("moreLi").appendChild(img)
    //img.style.
    //moreLi.appendChild(img);
    ol.appendChild(newItem);
    todoCount++;
    flag = true;
  }else {
    // Add the new LI element to the OL element
    newItem.style.lineHeight = "27px";
    ol.appendChild(newItem);
    todoCount++;
  }
  document.getElementById("myInput").value = null;

  updateChart();
}

function moveItemUp(item) {
  const prevItem = item.previousElementSibling;
  if (prevItem) {
    ol.insertBefore(item, prevItem);
  }
}

function moveItemDown(item) {
  const nextItem = item.nextElementSibling;
  if (nextItem) {
    ol.insertBefore(nextItem, item);
  }
}

function deleteItem(item) {
  ol.removeChild(item);
  if (item.classList.contains("checked")) {
    doneCount--;
  } else {
    todoCount--;
  }
  updateChart();
}

// Add a "checked" symbol when clicking on a list item
ol.addEventListener("click", function(ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
    if (ev.target.classList.contains("checked")) {
      doneCount++;
      todoCount--;
    } else {
      doneCount--;
      todoCount++;
    }
    updateChart();
  }
}, false);

function updateChart() {
  const data = [
    { label: "To Do", value: todoCount, color:"rgb(104, 190, 124)" },
    { label: "Done", value: doneCount, color: "#4e70a6"},
  ];

  const layout = {
    height: 350,
    width: 350,
    plot_bgcolor: "transparent",
    paper_bgcolor: "transparent"
  };

  const pieData = [{
    values: data.map((item) => item.value),
    labels: data.map((item) => item.label),
    type: "pie",
    hole:.5,
    marker: {
      colors: data.map((item) => item.color),
    },
  }];

  Plotly.react(chartContainer, pieData, layout);
}

