import { Meteor } from 'meteor/meteor';
import '../api/collections/ContactsCollection';
import '../api/methods/ContactsMethods';
import '../api/methods/TransactionsMethods';
import '../api/methods/RolesMethods';
import '../api/collections/WalletsCollection';
import '../api/collections/TransactionsCollection';
import '../api/publications/ContactsPublication';
import '../api/publications/WalletsPublication';
import '../infra/CustomError';
import '../infra/accounts';
import '../infra/roles';

