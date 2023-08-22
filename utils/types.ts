export interface User {
  firstName: string
  lastName: string
  email: string
  documentIssuingCountry: string
  nationality: string
  mobile: {
    countryCode: string
    number: string
  }
  dateOfBirth: {
    month: string
    day: string
    year: string
  }
  address: {
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  occupation: string
  sourceOfFunds: string
  purposeOfAccount: string
  selfPepDeclaration: boolean
  placeOfBirth: string
  expectedIncomingTxVolumeYearly: string
  expectedOutgoingTxVolumeYearly: string
  KYC: {
    emailVerified: boolean
    mobileVerified: boolean
    status: string
    details: [string, string, string]
    rejectionComments: {
      userComment: string
      autoComment: string
    }
  }
  userId: string
  createdAt: number
}

export interface Transaction {
  id: string
  description: string
  amount: string
  invoice: string
  expiry: number
}

export interface CompletedTransaction {
  id: string
  credit: number
  debit: number
  timestamp: string
  txType: string
  hash: string
  otherCryptoIdentifier: string
  feeBaseCurrency: number
  nonFpFeeBaseCurrency: number
  balanceBefore: {
    amount: number
    currency: string
  }
  balanceAfter: {
    amount: number
    currency: string
  }
}

export interface ExchangeRates {
  ETHEUR: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  USDCEUR: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  USDCUSDT: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  USDTEUR: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  BTCEUR: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  BTCUSDC: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  BTCUSDT: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
  BUSDEUR: {
    price: string
    buy: string
    sell: string
    timestamp: number
    currency: string
  }
}

export interface Wallet {
  walletId: string
  accounts: {
    BUSD: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    string: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    USDC: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    BTC: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      blockchainDepositAddress: string
      blockchainNetwork: {
        name: string
      }
      status: string
      permissions: [string]
      enriched: boolean
    }
    USDT: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    UNI: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    LINK: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    MATIC: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    ETH: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    BNB: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    EUR: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      linkedBankAccountId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
    SUSHI: {
      accountId: string
      parentWalletId: string
      currency: string
      ownerId: string
      ownerType: string
      createdAt: string
      availableBalance: {
        amount: string
        currency: string
      }
      linkedCardId: string
      status: string
      permissions: [string]
      enriched: boolean
    }
  }
  syncedOwnerId: string
  ownerType: string
  createdAt: string
  comment: string
}
