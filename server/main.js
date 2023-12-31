import { Meteor } from 'meteor/meteor';
import '../api/collections/ContactsCollection';
import '../api/methods/ContactsMethods';
import { WalletsCollection } from '../api/collections/WalletsCollection';
import '../api/collections/TransactionsCollection';
import '../api/methods/TransactionsMethods';
import '../api/publications/ContactsPublication';
import '../api/publications/WalletsPublication';
import '../infra/CustomError';


Meteor.startup(async () => {
    if (!WalletsCollection.find().count()) {
        const walletData = {
            createdAt: new Date(),
        };

        WalletsCollection.insert(walletData);
   }
});
