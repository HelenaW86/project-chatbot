// All the DOM selectors stored as short variables
const chat = document.getElementById("chat");
const userInput = document.getElementById("name-input");
const form = document.getElementById("name-form");
const sendBtn = document.getElementById("send");
let cakeType = "";
let thePieces = "";
let date = "";
let names = "";
let cakeTopping = "";
let thePrice = "";

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    setTimeout(() => {
      chat.innerHTML += `
         <section class="user-msg">
           <div class="bubble user-bubble">
             <p>${message}</p>
           </div>
           <img src="assets/user.png" alt="User" />  
         </section>
       `;
      chat.scrollTop = chat.scrollHeight;
    }, 700);
  } else if (sender === "bot") {
    setTimeout(() => {
      chat.innerHTML += `
        <section class="bot-msg">
          <img src="assets/bot.png" alt="Bot" />
          <div class="bubble bot-bubble">
            <p>${message}</p>
          </div>
        </section>
      `;
      // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
      chat.scrollTop = chat.scrollHeight;
    }, 1400);
  }
};

// Starts here
const greeting = () => {
  showMessage(
    `Hello and welcome to the Cake Factory &#x1F370 What's your name?`,
    "bot"
  );
};
//Name input
const handleNameInput = (event) => {
  event.preventDefault();
  names = userInput.value;
  showMessage(names, "user");
  userInput.value = "";
  showFoodOptions();
  form.removeEventListener("submit", handleNameInput);
};

form.addEventListener("submit", handleNameInput);

const showFoodOptions = () => {
  // setTimeout()

  showMessage(
    `What type of yummy cake are you in the mood for today ${names}?`,
    "bot"
  );
  setTimeout(() => {
    form.innerHTML = `
    <button id="princessBtn" class="cake-btn">Princess Cake</button>
    <button id="pancakeBtn" class="cake-btn">Pancake Cake</button>
    <button id="strawberryBtn" class="cake-btn">Strawberry Cake</button>
  `;

    document
      .getElementById("princessBtn")
      .addEventListener("click", () => topping("Princess Cake"));
    document
      .getElementById("pancakeBtn")
      .addEventListener("click", () => topping("Pancake Cake"));
    document
      .getElementById("strawberryBtn")
      .addEventListener("click", () => topping("Strawberry Cake"));
  }, 700);
};

const topping = (type) => {
  cakeType = type;
  showMessage(type, "user");
  showMessage(
    `Yummy in my tummy! I also love ${type} What kind of topping would you like?`,
    "bot"
  );

  if (type === "Princess Cake") {
    form.innerHTML = `
      <select id="select" class="topping"> 
      <option value="" selected disabled>Pick your topping!</option>
      <option value="Icing Sugar">Icing sugar</option>
      <option value="Strawberries">Strawberries</option>
      <option value="Marzipan Pigs">Marzipan Pigs</option>
      </select> 
      `;
  } else if (type === "Pancake Cake") {
    form.innerHTML = `
        <select id="select" class= topping>
          <option value="" selected disabled>Pick your topping!</option>
          <option value="Chocolate Sauce">Chocolate Sauce</option>
          <option value="Sprinkles">Sprinkles</option>
          <option value="Whipped Cream">Whipped Cream</option>
        </select>
      `;
  } else {
    form.innerHTML = `
        <select id="select" class="topping">
          <option value="" selected disabled>Pick your topping!</option>
          <option value="Blue Berries">Blue Berries</option>
          <option value="Chocolate Sprinkles">Chocolate Sprinkles</option>
          <option value="Banana">Banana</option>
        </select>
      `;
  }
  const select = document.getElementById("select");
  select.addEventListener("change", () => cakePieces(select.value));
};
const cakePieces = (topping) => {
  cakeTopping = topping;
  showMessage(cakeTopping, "user");
  showMessage(
    `${cakeTopping} is a great choice of topping! How many pieces would you like? ${names}`,
    "bot"
  );
  form.innerHTML = `
      <button id="fourBtn">Four</button>
      <button id="sixBtn">Six</button>
      <button id="twelveBtn">Twelve</button>
      `;

  document
    .getElementById("fourBtn")
    .addEventListener("click", () => delivery("four", 100));
  document
    .getElementById("sixBtn")
    .addEventListener("click", () => delivery("six", 150));
  document
    .getElementById("twelveBtn")
    .addEventListener("click", () => delivery("twelve", 200));
};

const delivery = (pieces, price) => {
  thePieces = pieces;
  thePrice = price;
  showMessage(pieces, "user");
  showMessage(`When do you want your cake delivered?`, "bot");
  form.innerHTML = `
    <label for="start" id="dateForm"></label>
    <input type="date" id="dateInput" name="trip-start">
    <button id="sendDate">send</button>
    `;
  document.getElementById("dateInput").addEventListener("change", function () {
    const input = this.value;
    theDate = input;
    godBye();
  });
};

const godBye = () => {
  showMessage(theDate, "user");
  showMessage(
    `You like to have ${thePieces} pieces of ${cakeType} with ${cakeTopping}. That will cost you ${thePrice}$. We will deliver it for you ${theDate}. Please confirm your order 👇 Thank you!`,
    "bot"
  );
  form.innerHTML = `
  <button id="orderBtn">Order!</button>
  `;
  document
    .getElementById("orderBtn")
    .addEventListener("click", () => location.reload());
};

// This means the greeting function will be called one second after the website is loaded.
greeting();
