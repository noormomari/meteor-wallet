import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema({
    name: {
        type: String,
    },
    email: {
        type: String,
        // regEx: SimpleSchema.RegEx.Email, //TODO: Check this
    },
    imageUrl: {
        type: String,
        optional: true,
    },
    walletId: {
        type: String,
        // regEx: SimpleSchema.RegEx.Id,
    },
    userId: String,
    archived: {
        type: Boolean,
        defaultValue: true,
    },

});

ContactsCollection.attachSchema(ContactsSchema);
