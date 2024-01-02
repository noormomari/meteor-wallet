import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../../api/collections/WalletsCollection';

Meteor.publish('myWallets', function publishWallets() {
    const { userId } = this;

    if(!userId) 
        throw Meteor.Error('Access denied');

    return WalletsCollection.find({ userId }); 
});
