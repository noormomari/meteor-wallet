import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../../api/collections/ContactsCollection';

Meteor.publish('allContacts', function publishAllContacts() {
    return ContactsCollection.find(); //Cursor --> Live Query
});

Meteor.publish('contacts', function publishAllContacts() {
    return ContactsCollection.find({ archived: { $ne: true }}); 
});
