import Realm from 'realm';

class Token extends Realm.Object {}
Token.schema = {
  name: 'Token',
  properties: {
    uid: 'string',
    token: 'string',
    created_at: 'date',
    valid: 'bool',
  },
};

class FCMToken extends Realm.Object {}
FCMToken.schema = {
  name: 'FCMToken',
  properties: {
    token: 'string',
    created_at: 'date',
    valid: 'bool',
  },
};

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    username: 'string',
    media_id: 'int',
    birthdate: 'string',
    contact_number: 'string',
    location: 'string',
    email: 'string',
    created_at: 'date',
    updated_at: 'date',
    ratings: 'Rating[]'
  }
};

class Rating extends Realm.Object {}
Rating.schema = {
  name: 'Rating',
  properties: {
    id: 'int',
    user_id: 'int',
    client_id: 'int',
    rate: 'int',
    comment: 'string',
    created_at: 'date',
    updated_at: 'date'
  }
};

const realm = new Realm({
  schema: [
    Token,
    FCMToken,
    User,
    Rating
  ],
});

export default realm;
