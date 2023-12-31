import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from "../../api/collections/TransactionsCollection";

Meteor.methods({
    'transactions.insert'(args) {
        const { isTransferring, sourceWalletId, destinationWalletId, amount } = args;

        const schema = new SimpleSchema({
            isTransferring: {
                type: Boolean,
            },
            sourceWalletId: {
                type: String,
            },
            destinationWalletId: {
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

        return TransactionsCollection.insert({
            type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
            sourceWalletId, 
            destinationWalletId : isTransferring ? destinationWalletId : null, 
            amount, 
            createdAt: new Date()
        });
     }
});
