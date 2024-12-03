document.addEventListener("DOMContentLoaded", function () {
  const pin = "1234"; // Vartotojo PIN
  let balance = parseFloat(localStorage.getItem("balance")) || 1000; // Pradinis balansas arba išsaugotas localStorage

  // Elementai
  const loginSection = document.getElementById("login-section");
  const mainSection = document.getElementById("main-section");
  const loginError = document.getElementById("login-error");
  const pinInput = document.getElementById("pin-input");
  const balanceText = document.getElementById("balance");
  const actionSection = document.getElementById("action-section");
  const actionText = document.getElementById("action-text");
  const amountInput = document.getElementById("amount-input");
  const actionError = document.getElementById("action-error");

  // Mygtukai
  const loginBtn = document.getElementById("login-btn");
  const checkBalanceBtn = document.getElementById("check-balance");
  const depositMoneyBtn = document.getElementById("deposit-money");
  const withdrawMoneyBtn = document.getElementById("withdraw-money");
  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Prisijungimas
  loginBtn.addEventListener("click", function () {
    if (pinInput.value === pin) {
      loginSection.classList.add("hidden");
      mainSection.classList.remove("hidden");
      loginError.textContent = "";
      balanceText.textContent = "****"; // Paslėptas balansas
    } else {
      loginError.textContent = "Neteisingas PIN kodas!";
    }
  });

  // Atsijungimas
  logoutBtn.addEventListener("click", function () {
    mainSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    pinInput.value = "";
  });

  // Tikrinti balansą (laikymo logika)
  checkBalanceBtn.addEventListener("mousedown", function () {
    balanceText.textContent = balance.toFixed(2); // Rodyti balansą, kai laikomas mygtukas
  });

  checkBalanceBtn.addEventListener("mouseup", function () {
    balanceText.textContent = "****"; // Paslėpti balansą, kai mygtukas atleistas
  });

  // Įnešti pinigų
  depositMoneyBtn.addEventListener("click", function () {
    actionSection.classList.remove("hidden");
    actionText.textContent = "Įveskite sumą, kurią norite įnešti:";
    amountInput.value = "";
    actionError.textContent = "";
  });

  // Išimti pinigų
  withdrawMoneyBtn.addEventListener("click", function () {
    actionSection.classList.remove("hidden");
    actionText.textContent = "Įveskite sumą, kurią norite išimti:";
    amountInput.value = "";
    actionError.textContent = "";
  });

  // Patvirtinti veiksmą
  confirmBtn.addEventListener("click", function () {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      actionError.textContent = "Įveskite teisingą sumą!";
      return;
    }

    if (actionText.textContent.includes("įnešti")) {
      balance += amount;
    } else if (actionText.textContent.includes("išimti")) {
      if (amount > balance) {
        actionError.textContent = "Nepakanka lėšų!";
        return;
      }
      balance -= amount;
    }

    // Išsaugoti balansą localStorage
    localStorage.setItem("balance", balance.toFixed(2));

    actionSection.classList.add("hidden");
    balanceText.textContent = "****"; // Balansas paslėptas
  });

  // Atšaukti veiksmą
  cancelBtn.addEventListener("click", function () {
    actionSection.classList.add("hidden");
    actionError.textContent = "";
  });
});
