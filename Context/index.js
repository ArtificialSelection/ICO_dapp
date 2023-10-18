import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

//Internal import

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingTOKENCONTRACT,
  getBalance,
  connectingTOKEN_SALE_CONTRACT,
} from "../Utils/index";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const TOKEN_ICO = "TOKEN SELL DAPP";

  //State Variables
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [nativeToken, setNativeToken] = useState("");
  const [tokenHolders, settokenHolder] = useState([]);
  const [tokenSale, setTokenSale] = useState("");
  const [currentHolder, setCurrentHolder] = useState("");

  //FEtch contract DAta
  const fetchInitialData = async () => {
    try {
      //Get User Account
      const account = await CheckIfWalletConnected();
      //GEt USER balance
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));
      setAddress(account);
      //console.log(account);

      //TOKEN contract
      const TOKEN_CONTRACT = await connectingTOKENCONTRACT();
      let tokenBalance;
      if (account) {
        tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
      } else {
        tokenBalance = 0;
      }

      console.log(TOKEN_CONTRACT)

      ///GET ALL TOKEN DATA
      const tokenName = await TOKEN_CONTRACT.name();
      const tokenSymbol = await TOKEN_CONTRACT.symbol();
      const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
      const tokenStandard = await TOKEN_CONTRACT.standard();
      const tokenHolders = await TOKEN_CONTRACT._userId();
      const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
      const tokenAddress = await TOKEN_CONTRACT.address;

      const nativeToken = {
        tokenAddress: tokenAddress,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenOwnerOfContract: tokenOwnerOfContract,
        tokenStandard: tokenStandard,
        tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
        tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
        tokenHolders: tokenHolders.toNumber(),
      };
      //console.log(nativeToken);

      setNativeToken(nativeToken);
      //Getting Token holders
      const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
      settokenHolder(getTokenHolder);

      //Getting token holder data

      if (account) {
        const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(
          account
        );

        const currentHolder = {
          tokenId: getTokenHolderData[0].toNumber(),
          from: getTokenHolderData[1],
          to: getTokenHolderData[2],
          totalToken: ethers.utils.formatEther(
            getTokenHolderData[3].toString()
          ),
          tokenHolders: getTokenHolderData[4],
        };

        setCurrentHolder(currentHolder);
      }

      //Token sale Contract

      const TOKEN_SALE_CONTRACT = await connectingTOKEN_SALE_CONTRACT();
      const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
      const tokenSold = await TOKEN_SALE_CONTRACT.tokensSold();
      const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf(
        "0xDD33Cb606AdeA1B4AbC8606B071E4087CeDD35a4"
      );

      const tokenSale = {
        tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
        tokenSold: tokenSold.toNumber(),
        tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
      };

      setTokenSale(tokenSale);
      console.log(tokenSale);
      console.log(currentHolder);
      console.log(nativeToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  //Buy token
  const buyToken = async (nToken) => {
    console.log(nToken)
    try {
      const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
      console.log(amount);
      const contract = await connectingTOKEN_SALE_CONTRACT();
      console.log(contract);
      const buying = await contract.buyToken(nToken, {
        value: amount.toString(),
      });
      await buying.wait();
      console.log(buying);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //Native Token Transfer
  const transferNativeToken = async () => {
    try {
      const TOKEN_SALE_ADDRESS = "0xDD33Cb606AdeA1B4AbC8606B071E4087CeDD35a4";
      const TOKEN_AMOUNT = 10000000;
      const tokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTOKENCONTRACT();
      const transaction = await contract.transfer(
        TOKEN_SALE_ADDRESS,
        transferAmount
      );
      console.log(contract);
      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StateContext.Provider
      value={{
        transferNativeToken,
        buyToken,
        connectWallet,
        setAddress,
        TOKEN_ICO,
        currentHolder,
        tokenSale,
        tokenHolders,
        nativeToken,
        balance,
        address,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
