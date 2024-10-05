// 在 HTML 中确保引入 Web3.js


const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deposit",
                    "type": "uint256"
                }
            ],
            "name": "addDepositToEscrow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "newStatus",
                    "type": "string"
                }
            ],
            "name": "changeStatus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "checkLatePayment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_tenant",
                    "type": "address"
                },
                {
                    "internalType": "address payable",
                    "name": "_landord",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_rentAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_durationInMonths",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_status",
                    "type": "string"
                }
            ],
            "name": "createAgreement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "EndDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payAmt",
                    "type": "uint256"
                }
            ],
            "name": "makePayment",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "newDuration",
                    "type": "uint256"
                }
            ],
            "name": "modifyDuration",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "newRent",
                    "type": "uint256"
                }
            ],
            "name": "modifyRentAmt",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "raiseDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "terminateAgreement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "agreementnDetails",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "tenant",
                    "type": "address"
                },
                {
                    "internalType": "address payable",
                    "name": "landlord",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "rentAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "durationInMonths",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "status",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "deposit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "startDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nextPaymentDueDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastPaymentDate",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "activeStat",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "latePaymentCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "detailsToEscrow",
            "outputs": [
                {
                    "internalType": "contract Escrow",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "getAgreement",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address payable",
                            "name": "tenant",
                            "type": "address"
                        },
                        {
                            "internalType": "address payable",
                            "name": "landlord",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rentAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "durationInMonths",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "status",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deposit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nextPaymentDueDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastPaymentDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "activeStat",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "latePaymentCount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct AgreementContract.Agreement",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_agrmtId",
                    "type": "uint256"
                }
            ],
            "name": "getAgreementStatus",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tenant",
                    "type": "address"
                }
            ],
            "name": "getAgreemntId",
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
            "name": "tenantToAgreementId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

const contractAddress = '0x005B166B01B777aB5f1Db45fD37C787BfB75e4b3';
let web3 = new Web3("https://scroll-testnet-public.unifra.io"); // 使用 Infura 或本地节点的 URL
let contract = new web3.eth.Contract(contractABI, contractAddress);

// 设置发送交易的账户信息
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log('Recreated contract methods:', Object.keys(contract.methods));
    //createAgreement();
    // 设置发送交易的账户信息
    async function createAgreement() {
        await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("MetaMask is connected");
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        const tenant = document.getElementById('tenantAddress').value; 
        const landlord = document.getElementById('landlordAddress').value;
        const rentAmount = document.getElementById('rentAmount').value;
        const durationInMonths = document.getElementById('duration').value;
        const status = document.getElementById('status').value;
        console.log(tenant);
        console.log(landlord);
        console.log(rentAmount);
        console.log(durationInMonths);
        console.log(status);

        console.log('Available methods:', contract.methods);
        const createAgreementData = contract.methods.createAgreement(
            tenant,
            landlord,
            rentAmount,
            durationInMonths,
            status
        ).encodeABI();
        console.log('Available methods:', contract.methods);

        const tx = {
            from: account,
            to: contractAddress,
            data: createAgreementData,
            gas: 300000000 // 设置合适的 gas 限制
        };

        try {
            const receipt = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx],
            });

            console.log('Transaction Receipt:', receipt);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
        
    }
    
    document.getElementById('agreementForm').addEventListener('submit', function(e) {

        e.preventDefault();
        createAgreement().catch(console.error);
    });
}
else{
    console.log("Install metamask");
}
