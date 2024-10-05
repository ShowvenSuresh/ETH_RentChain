// MetaMask connection functionality
const connectButton = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const userAddressElement = document.getElementById('userAddress');
const networkElement = document.getElementById('network');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');

let userAddress = null;
let web3 = null;

// Network names mapping
const networks = {
    '0x1': 'Ethereum Mainnet',
    '0x5': 'Goerli Testnet',
    '0xaa36a7': 'Sepolia Testnet',
    '0x89': 'Polygon Mainnet',
    '0x13881': 'Mumbai Testnet',
    // Add more networks as needed
};

// Show error message
const showError = (message) => {
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
};

// Hide error message
const hideError = () => {
    errorDiv.classList.add('hidden');
};

// Update button state
const updateButtonState = (connected) => {
    if (connected) {
        connectButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Connected
        `;
        connectButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        connectButton.classList.add('bg-green-600', 'hover:bg-green-700');
    } else {
        connectButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Connect MetaMask
        `;
        connectButton.classList.remove('bg-green-600', 'hover:bg-green-700');
        connectButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
};

// Update network information
const updateNetwork = async () => {
    if (!window.ethereum) return;

    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        networkElement.textContent = networks[chainId] || `Chain ID: ${chainId}`;
    } catch (error) {
        console.error('Error getting network:', error);
        networkElement.textContent = 'Unknown Network';
    }
};

// Main connection function
const connectWallet = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
        showError('Please install MetaMask to use this feature.');
        return;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        userAddress = accounts[0];
        userAddressElement.textContent = userAddress;

        // Update UI
        hideError();
        updateButtonState(true);
        walletInfo.classList.remove('hidden');

        // Get and display network info
        await updateNetwork();

    } catch (error) {
        console.error('Error connecting wallet:', error);
        showError(error.message || 'Error connecting to MetaMask');
        updateButtonState(false);
    }
};

// Event Listeners
connectButton.addEventListener('click', connectWallet);

// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected
            userAddress = null;
            updateButtonState(false);
            walletInfo.classList.add('hidden');
            showError('Wallet disconnected');
        } else {
            // Account switched
            userAddress = accounts[0];
            userAddressElement.textContent = userAddress;
            hideError();
        }
    });

    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId) => {
        updateNetwork();
    });
}

// Check if already connected on page load
window.addEventListener('load', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            if (accounts.length > 0) {
                userAddress = accounts[0];
                userAddressElement.textContent = userAddress;
                updateButtonState(true);
                walletInfo.classList.remove('hidden');
                await updateNetwork();
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
});
