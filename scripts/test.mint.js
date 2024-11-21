const { ethers } = require("hardhat");
const contractABI = require("./testAbi.json");

const LocalProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const MyWallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    LocalProvider
);
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TestContract = new ethers.Contract(ContractAddress, contractABI, MyWallet);

async function testMint() {
    try {
        console.log("Sending transaction to mint...");
        const tx = await TestContract.awardItem(
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
            "https://example.com/metadata.json"
        );
        console.log("Transaction sent. Waiting for confirmation...");
        const result = await tx.wait();
        console.log("Transaction confirmed:", result);
    } catch (error) {
        console.error("Error during minting:", error);
    }
}

testMint();
