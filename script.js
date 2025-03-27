  // Get references to the DOM elements
  const toggleSwitch = document.getElementById("toggleSwitch");
  const earlyBirdPrice = document.getElementById("early-bird-price");
  const earlyBirdDuration = document.getElementById("early-bird-duration");
  const earlyBirdRegularPrice = document.getElementById("early-bird-regular-price");
  const message = document.getElementById("message");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");
  const buyPlanLink = document.getElementById("buyPlanLink");

  // Prices
  const monthlyEarlyBird = 29;
  const yearlyEarlyBird = 299; // 10 months charge for yearly
  const monthlyRegularEarlyBird = 99; // Regular price for monthly
  const yearlyRegularEarlyBird = 999; // Regular price for yearly

  // Function to update UI based on toggle state
  function updatePlanUI() {
    if (toggleSwitch.checked) {
      // Monthly Plan (toggle is ON)
      earlyBirdPrice.textContent = monthlyEarlyBird;
      earlyBirdDuration.textContent = "/month";
      earlyBirdRegularPrice.textContent = `$${monthlyRegularEarlyBird}/month regular price`;
      message.style.display = "block"; // Show the message
      yearlyLabel.classList.remove("font-bold");
      monthlyLabel.classList.add("font-bold");
      buyPlanLink.href = "Form.html?action=buy-plan&plan=monthly"; // Update link for monthly plan
    } else {
      // Yearly Plan (toggle is OFF)
      earlyBirdPrice.textContent = yearlyEarlyBird;
      earlyBirdDuration.textContent = "/yearly";
      earlyBirdRegularPrice.textContent = `$${yearlyRegularEarlyBird}/yearly regular price`;
      message.style.display = "none"; // Hide the message
      monthlyLabel.classList.remove("font-bold");
      yearlyLabel.classList.add("font-bold");
      buyPlanLink.href = "Form.html?action=buy-plan&plan=yearly"; // Update link for yearly plan
    }
  }

  // Add event listener to toggle switch
  toggleSwitch.addEventListener("change", updatePlanUI);

  // Initialize the UI on page load
  updatePlanUI();



// Separate function to align buttons
function alignPricingButtons() {
  const earlyBirdCard = document.querySelector("#card1").parentElement;
  const premiumCard = document.querySelector("#card2").parentElement;

  // Get the content sections (excluding the button sections)
  const earlyBirdContent = earlyBirdCard.querySelector(".p-8.flex-grow");
  const premiumContent = premiumCard.querySelector(".p-8.flex-grow");

  // Reset heights to auto to measure natural height
  earlyBirdContent.style.minHeight = "auto";
  premiumContent.style.minHeight = "auto";

  // Get the maximum height of the content sections
  const earlyBirdHeight = earlyBirdContent.offsetHeight;
  const premiumHeight = premiumContent.offsetHeight;
  const maxHeight = Math.max(earlyBirdHeight, premiumHeight);

  // Set both content sections to the same height
  earlyBirdContent.style.minHeight = `${maxHeight}px`;
  premiumContent.style.minHeight = `${maxHeight}px`;
}

// Add event listener to toggle switch
toggleSwitch.addEventListener("change", updatePlanUI);

// Call alignPricingButtons on page load
window.addEventListener("load", alignPricingButtons);

// Call alignPricingButtons on window resize to handle responsive changes
window.addEventListener("resize", alignPricingButtons);

// Initialize the UI on page load
updatePlanUI();


// **Set default to Yearly on page load**
window.onload = function () {
  toggleSwitch.checked = false; // Ensure Yearly is default
  updatePlanUI(); // Update UI
  adjustCardHeight(); // Adjust card height
};

// **Handle toggle switch change**
toggleSwitch.addEventListener("change", updatePlanUI);

// **Ensure message visibility updates on toggle**
toggleSwitch.addEventListener("change", function () {
  document.getElementById("message").style.display = toggleSwitch.checked ? "block" : "none";
});

// **Adjust card height dynamically**
function adjustCardHeight() {
  let card1 = document.getElementById("card1");
  let card2 = document.getElementById("card2");

  card1.style.height = "auto";
  card2.style.height = "auto";

  let maxHeight = Math.max(card1.clientHeight, card2.clientHeight);
  card1.style.height = maxHeight + "px";
  card2.style.height = maxHeight + "px";
}

// **Adjust height on window resize**
window.addEventListener("resize", adjustCardHeight);

// **Buy Plan Button Redirection**
document.getElementById("buyPlanLink").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior
  let planType = toggleSwitch.checked ? "monthly" : "yearly"; // ✅ Corrected logic
  window.location.href = `Form.html?plan=${planType}&action=buy_plan`; // Redirect to Form
});


// Function to equalize the heights of the pricing cards


function equalizeCardHeights() {
  // Select the two pricing cards (grey and orange backgrounds)
  const greyCard = document.querySelector('.grey-card'); // Adjust the class name as per your HTML
  const orangeCard = document.querySelector('.orange-card'); // Adjust the class name as per your HTML

  // Reset heights to auto to get the natural height
  greyCard.style.height = 'auto';
  orangeCard.style.height = 'auto';

  // Get the heights of both cards
  const greyHeight = greyCard.offsetHeight;
  const orangeHeight = orangeCard.offsetHeight;

  // Find the taller height
  const maxHeight = Math.max(greyHeight, orangeHeight);

  // Set both cards to the taller height
  greyCard.style.height = `${maxHeight}px`;
  orangeCard.style.height = `${maxHeight}px`;
}

// Run the function on page load
window.addEventListener('load', equalizeCardHeights);

// Run the function on window resize to handle responsive changes
window.addEventListener('resize', equalizeCardHeights);

// Run the function when the toggle changes (Yearly/Monthly)
const toggle = document.querySelector('.toggle-input'); // Adjust the class name as per your HTML
toggle.addEventListener('change', equalizeCardHeights);