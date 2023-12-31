import { Meteor } from 'meteor/meteor';
import '../imports/api/collections/ContactsCollection';
import '../imports/api/methods/ContactsMethods';
import '../imports/api/collections/WalletsCollection';
import '../imports/api/collections/TransactionsCollection';
import '../imports/api/methods/TransactionsMethods';
import '../imports/api/publications/ContactsPublication';
import '../imports/api/publications/WalletsPublication';
import'../infra/CustomError';

import { WalletsCollection } from '../imports/api/collections/WalletsCollection';


Meteor.startup(async () => {
    if(!WalletsCollection.find().count()){
        const walletData = {
            createdAt: new Date(),
        };

        WalletsCollection.insert(walletData);
   }
});
