import realm from './tables';

const FCMTokenSchema = {
  get() {
    const tok = {
      token: '',
      created_at: '',
      valid: false
    };
    const to = realm.objects('FCMToken');
    for (const t of to) {
      tok.token = t.token;
      tok.created_at = t.created_at;
      tok.valid = t.valid;
    }

    return tok;
  },

  update: (token, callbackSuccess = null, callbackFailed = null) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('FCMToken'));
        realm.create('FCMToken', {
          token,
          created_at: new Date(),
          valid: true
        });
      });
      callbackSuccess();
    } catch (e) {
      callbackFailed(e);
    }
  },

  revoke: (success, failed) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('FCMToken'));
        console.log('Token Revoked!');

        success();
      });
    } catch (e) {
      console.log(e);
      failed(e);
    }
  }
};

export default FCMTokenSchema;
