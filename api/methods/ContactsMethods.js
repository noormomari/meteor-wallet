import { Meteor } from 'meteor/meteor';
import { check } from "meteor/check";
import { ContactsCollection } from "../../api/collections/ContactsCollection";

Meteor.methods({
    'contacts.insert'({name, email, imageUrl, walletId}) {
        check(name, String);
        check(email, String);
        check(imageUrl, String);
        check(walletId, String);

        const { userId } = this;
        if(!userId) 
            throw Meteor.Error('Access denied');
    
        if(!name)
            throw new Meteor.Error("Name is required.");

        if(!walletId)
            throw new Meteor.Error("Wallet ID is required.");

        return ContactsCollection.insert({name, email, imageUrl, walletId, createdAt: new Date(), userId});
     },
     'contacts.remove'({contactId}) {
        check(contactId, String);
        return ContactsCollection.remove(contactId);
     },
     'contacts.archive'({contactId}) {
        check(contactId, String);
        ContactsCollection.update({_id: contactId}, {$set: {archived: true}});
     }
});
