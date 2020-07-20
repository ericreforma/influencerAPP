import moment from 'moment';
import realm from './tables';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

const UserSchema = {
  update: (user, callbackSuccess, callbackFailed) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('User'));
        const newUser = realm.create('User', {
          id: user.id,
          name: user.name,
          username: user.username,
          media_id: user.media_id,
          birthdate: user.birthdate,
          contact_number: user.contact_number,
          location: user.location,
          email: user.email,
          created_at: moment(user.created_at).format(DATETIME_FORMAT),
          updated_at: moment(user.updated_at).format(DATETIME_FORMAT),
          ratings: []
        });

        
        callbackSuccess();
      });
    } catch (error) {
      callbackFailed(error);
    }
  },

  get() {
    const u = {
      id: 0,
      name: '',
      username: '',
      media_id: 0,
      birthdate: '',
      contact_number: '',
      location: '',
      email: '',
      email_verified_at: '',
      created_at: '',
      updated_at: '',
      ratings: []
    };

    const us = realm.objects('User');
    for (const usr of us) {
      u.id = usr.id;
      u.name = usr.name;
      u.username = usr.username;
      u.media_id = usr.media_id;
      u.birthdate = usr.birthdate;
      u.contact_number = usr.contact_number;
      u.location = usr.location;
      u.email = usr.email;
      u.created_at = usr.created_at;
      u.updated_at = usr.updated_at;
      u.ratings = usr.ratings;
    }

    return u;
  },

};

export default UserSchema;
