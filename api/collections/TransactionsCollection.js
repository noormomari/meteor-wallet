import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';


export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

export const TransactionsCollection = new Mongo.Collection('transactions');

TransactionsCollection.before.insert(function (userId, transactionsDocument) {
    if(transactionsDocument.type === TRANSFER_TYPE) {
        const sourceWallet = WalletsCollection.findOne(transactionsDocument.sourceWalletId);

        if(!sourceWallet)
            throw new Meteor.Error("Source wallet not found.");

        if(sourceWallet.balance < transactionsDocument.amount)
            throw new Meteor.Error("Insufficient funds.");

        WalletsCollection.update(transactionsDocument.sourceWalletId, {
            $inc: {balance: -transactionsDocument.amount}
        });
    }
    
    if(transactionsDocument.type === ADD_TYPE) {
        const sourceWallet = WalletsCollection.findOne(transactionsDocument.sourceWalletId);

        if(!sourceWallet)
            throw new Meteor.Error("Source wallet not found.");

        WalletsCollection.update(transactionsDocument.sourceWalletId, {
            $inc: {balance: transactionsDocument.amount}
        });
    }
});

TransactionsCollection.before.remove(function (userId, transactionsDocument) {
    if(transactionsDocument.type === TRANSFER_TYPE) {
        const sourceWallet = WalletsCollection.findOne(transactionsDocument.sourceWalletId);

        if(!sourceWallet)
            throw new Meteor.Error("Source wallet not found.");

        WalletsCollection.update(transactionsDocument.sourceWalletId, {
            $inc: {balance: transactionsDocument.amount}
        });
    }
    
    if(transactionsDocument.type === ADD_TYPE) {
        const sourceWallet = WalletsCollection.findOne(transactionsDocument.sourceWalletId);

        if(!sourceWallet)
            throw new Meteor.Error("Source wallet not found.");

        WalletsCollection.update(transactionsDocument.sourceWalletId, {
            $inc: {balance: -transactionsDocument.amount}
        });
    }
});

const TransactionsSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: [TRANSFER_TYPE, ADD_TYPE],
    },
    sourceWalletId: {
        type: String, 
        //regEx: SimpleSchema.RegEx.Id,
    },
    destinationContactId: {
        type: String, 
        optional: true,
        //regEx: SimpleSchema.RegEx.Id,
    },
    amount: {
        type: Number,
        min: 1,
    },
    userId: String,
});

TransactionsCollection.attachSchema(TransactionsSchema);
