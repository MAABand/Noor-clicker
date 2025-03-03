document.addEventListener("DOMContentLoaded", () => {
  updateShopUI();
  startAutoClicker();
});

// Function to update shop UI
function updateShopUI() {
  let score = parseInt(localStorage.getItem("score") || "0");
  document.getElementById("coins").innerText = score;
}

// Function to start auto-clicker in the shop
function startAutoClicker() {
  let upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
  
  if (upgrades.autoClicker > 0) {
    setInterval(() => {
      let score = parseInt(localStorage.getItem("score") || "0");
      score += upgrades.autoClicker; // Add points per second
      localStorage.setItem("score", score);
      updateShopUI();
    }, 1000);
  }
}

// Function to buy an upgrade with SweetAlert2
function buyUpgrade(upgrade, cost) {
  let score = parseInt(localStorage.getItem("score") || "0");
  
  // Check if user has enough coins
  if (score >= cost) {
    // Show confirmation alert using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: `This will cost ${cost} coins. Do you want to buy this upgrade?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, buy it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      background: "rgba(0, 31, 61, .95)", // Less transparent background
      color: "white", // Text color
      customClass: {
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Deduct the cost and buy the upgrade
        score -= cost;
        localStorage.setItem("score", score);
        
        // Get current upgrades from localStorage
        let upgrades = JSON.parse(localStorage.getItem("upgrades") || "{}");
        
        // Increment the upgrade value
        upgrades[upgrade] = (upgrades[upgrade] || 0) + 1;
        
        // Save the updated upgrades to localStorage
        localStorage.setItem("upgrades", JSON.stringify(upgrades));
        
        // Update shop UI after purchase
        updateShopUI();
        
        // Success confirmation
        Swal.fire({
          title: "Purchase Successful!",
          text: `You bought the ${upgrade} upgrade.`,
          icon: "success",
          background: "rgba(0, 31, 61, 0.95)", // Same adjusted transparency
          color: "white", // Text color
          customClass: {
            popup: 'swal-popup',
            confirmButton: 'swal-confirm-btn'
          }
        });
      } else {
        // If cancelled, show cancellation message
        Swal.fire({
          title: "Purchase Cancelled",
          text: "The upgrade was not purchased.",
          icon: "error",
          background: "rgba(0, 31, 61, 0.95)", // Same adjusted transparency
          color: "white", // Text color
          customClass: {
            popup: 'swal-popup',
            confirmButton: 'swal-confirm-btn'
          }
        });
      }
    });
  } else {
    // Show alert if not enough coins
    Swal.fire({
      title: "Not Enough Coins!",
      text: `You need at least ${cost} coins to buy this upgrade.`,
      icon: "warning",
      confirmButtonText: "Okay",
      background: "rgba(0, 31, 61, 0.95)", // Same adjusted transparency
      color: "white", // Text color
      customClass: {
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-btn'
      }
    });
  }
}