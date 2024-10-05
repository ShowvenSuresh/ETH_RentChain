document.addEventListener('DOMContentLoaded', () => {
    // Define variables for form inputs and buttons
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userTypeSelect = document.getElementById('userType');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const submitButton = document.getElementById('createAccountBtn');
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    let walletAddress = '';
  
    // MetaMask Wallet Connection Function
    async function connectWallet() {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          walletAddress = accounts[0];
          alertBox.style.display = 'none';
          connectWalletBtn.textContent = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
          submitButton.disabled = false;
        } catch (error) {
          showAlert('Failed to connect wallet. Please try again.');
        }
      } else {
        showAlert('MetaMask is not detected. Please ensure that MetaMask is installed and try refreshing the page.');
      }
    }
  
    // Show Alert Messages
    function showAlert(message) {
      alertMessage.textContent = message;
      alertBox.style.display = 'block';
    }
  
    // Handle Form Submission
    function handleSubmit(event) {
      event.preventDefault();
  
      // Validate fields before submission
      if (!walletAddress) {
        showAlert('Please connect your MetaMask wallet first.');
        return;
      }
  
      if (!userTypeSelect.value) {
        showAlert('Please select your account type.');
        return;
      }
  
      // Mock form submission
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        userType: userTypeSelect.value,
        walletAddress,
      };
      console.log('Form submitted:', formData);
  
      // Simulate successful account creation
      showAlert('Account successfully created!', 'success');
    }
  
    // Event Listeners
    connectWalletBtn.addEventListener('click', connectWallet);
    submitButton.addEventListener('click', handleSubmit);
  });
  