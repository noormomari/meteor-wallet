import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const WalletsCollection = new Mongo.Collection('wallets');

const WalletsSchema = new SimpleSchema({
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

WalletsCollection.attachSchema(WalletsSchema);