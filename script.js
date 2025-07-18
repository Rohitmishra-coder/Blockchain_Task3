let provider, signer, contract;

const contractAddress = "0x1c7828af12a5c354141ece14d9bff8b3d756dda3";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "borrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lend",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "repay",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "calculateInterest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "interestRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "loans",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Connect Wallet

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();

      document.getElementById("walletAddress").innerText = "Connected: " + address;

      // Initialize contract
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Enable buttons
      document.getElementById("lendBtn").disabled = false;
      document.getElementById("borrowBtn").disabled = false;
      document.getElementById("repayBtn").disabled = false;
    } catch (error) {
      console.error("MetaMask connection error:", error);
      alert("⚠️ Failed to connect wallet. Please approve MetaMask request or check console.");
    }
  } else {
    alert("MetaMask not detected. Please install it.");
  }
}


// Lend ETH
async function lend() {
  if (!contract) {
    alert("Please connect your wallet first!");
    return;
  }

  const amount = document.getElementById("lendAmount").value;
  try {
    const tx = await contract.lend({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    alert("Lending successful!");
  } catch (err) {
    console.error("Lend error:", err);
    alert("Lend failed.");
  }
}

// Borrow ETH
async function borrow() {
  if (!contract) {
    alert("Please connect your wallet first!");
    return;
  }

  const amount = document.getElementById("borrowAmount").value;
  try {
    const tx = await contract.borrow(ethers.utils.parseEther(amount));
    await tx.wait();
    alert("Borrow successful!");
  } catch (err) {
    console.error("Borrow error:", err);
    alert("Borrow failed.");
  }
}

// Repay Loan
async function repay() {
  if (!contract) {
    alert("Please connect your wallet first!");
    return;
  }

  const amount = document.getElementById("repayAmount").value;
  try {
    const tx = await contract.repay({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    alert("Repayment successful!");
  } catch (err) {
    console.error("Repay error:", err);
    alert("Repay failed.");
  }
}
