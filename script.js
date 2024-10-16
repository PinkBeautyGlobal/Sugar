let questionsLeft = 5;

// Stripe public key from your Stripe dashboard
const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe public key

// Display the initial information modal on page load
window.onload = function() {
  updateQuestionsDisplay();
};

function updateQuestionsDisplay() {
  const remainingQuestionsDisplay = document.getElementById('remainingQuestions');
  remainingQuestionsDisplay.textContent = `Questions left: ${questionsLeft}`;
}

function showPaymentModal() {
  const modal = document.getElementById('paymentModal');
  modal.style.display = 'flex'; // Show the payment modal
}

function closeModal() {
  const modal = document.getElementById('paymentModal');
  modal.style.display = 'none'; // Hide the modal
}

// Track the number of questions and show payment modal after 5th question
function sendMessage() {
  if (questionsLeft > 0) {
    questionsLeft--;
    updateQuestionsDisplay();

    if (questionsLeft === 0) {
      showPaymentModal();
    }
  } else {
    showPaymentModal();
  }
}

// Stripe payment integration for different plans
function upgradeToUnlimited() {
  createCheckoutSession('price_xxxx'); // Replace with your price ID for $9.99/month
}

function upgradeToYearly() {
  createCheckoutSession('price_xxxx'); // Replace with your price ID for $99.99/year
}

function upgradeToSugarDaddy() {
  createCheckoutSession('price_xxxx'); // Replace with your price ID for $49/month Sugar Daddy advice
}

function upgradeToSugarDaddyYearly() {
  createCheckoutSession('price_xxxx'); // Replace with your price ID for $550/year Sugar Daddy advice
}

function createCheckoutSession(priceId) {
  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
    }),
  })
  .then(response => response.json())
  .then(session => {
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .then(result => {
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
