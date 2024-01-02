import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from "../../api/collections/TransactionsCollection";
import { WalletRoles } from '../../infra/WalletRoles';

Meteor.methods({
    'transactions.insert'(args) {
        const { isTransferring, sourceWalletId, destinationContactId, amount } = args;

        const schema = new SimpleSchema({
            isTransferring: {
                type: Boolean,
            },
            sourceWalletId: {
                type: String,
            },
            destinationContactId: {
                type: String,
                optional: !isTransferring,
            },
            amount: {
                type: Number,
                min: 1,
            },
        });

        const cleanArgs = schema.clean(args);
        schema.validate(cleanArgs);

        const { userId } = this;

        if(!userId) 
            throw Meteor.Error('Access denied');
    
        return TransactionsCollection.insert({
            type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
            sourceWalletId, 
            destinationContactId : isTransferring ? destinationContactId : null, 
            amount, 
            createdAt: new Date(),
            userId,
        });
     },
     'transaction.remove'(transactionId) {
        const { userId } = this;
        if(!userId) 
            throw Meteor.Error('Access denied');
    
        check(transactionId, String);
    
        if(!Roles.userIsInRole(userId, WalletRoles.ADMIN))
            throw new Error('Permission denied');

        return TransactionsCollection.remove(transactionId);
     },
});
