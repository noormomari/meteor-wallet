import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../../api/collections/ContactsCollection';

// Meteor.publish('allContacts', function publishAllContacts() {
//     return ContactsCollection.find(); //Cursor --> Live Query
// });

Meteor.publish('myContacts', function publishAllContacts() {
    const { userId } = this;

    if(!userId) 
        throw Meteor.Error('Access denied');

    return ContactsCollection.find({userId, archived: { $ne: true }}, {fields: { createdAt: false}}); 
});
