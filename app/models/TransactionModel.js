import { numberToHex } from 'web3-utils';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User Schema
 *
 * -1 userID means anonymous/not logged in
 * -1 contractAddress means it was a transaction, not a contract deployment. TODO: Separate Collections?
 * sender is address of person sending, receiver is address of person receiving payment. If it's a contract, put -1
 */

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  decimals: { type: Number, required: true },
  supply: { type: Number, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, default: '-1' },
  transactionHash: { type: String, unique: true, required: true },
  contractAddress: { type: String, default: -1 },
  userID: { type: mongoose.Schema.Types.ObjectId },
});

mongoose.model('Transaction', TransactionSchema);

export default TransactionSchema;