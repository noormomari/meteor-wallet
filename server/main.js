import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import '../imports/api/ContactsCollection';
import '../imports/api/ContactsMethods';
import '../imports/api/WalletsCollection';
import '../imports/api/TransactionsCollection';
import '../imports/api/TransactionsMethods';
import '../imports/api/ContactsPublication';
import '../imports/api/WalletsPublication';
import'../infra/CustomError';

import { WalletsCollection } from '../imports/api/WalletsCollection';

const walletSchema = new SimpleSchema({
    balance: {
        type: Number,
        min: 0,
        defaultValue: 0,
    },
    currency: {
        type: String,
        allowedValues: ["USD", "EUR"],
        defaultValue: "USD"
    },
    createdAt: Date,
});

Meteor.startup(async () => {
    if(!WalletsCollection.find().count()){
        const walletData = {
            createdAt: new Date(),
        };
        const cleanWallet = walletSchema.clean(walletData);
        walletSchema.validate(cleanWallet);
        WalletsCollection.insert(cleanWallet);
    }
});
