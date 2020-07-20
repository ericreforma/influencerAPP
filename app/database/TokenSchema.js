import realm from './tables';

const TokenSchema = {
  get() {
    const tok = {
      uid: '',
      token: '',
      created_at: '',
      valid: false
    };
    const to = realm.objects('Token');
    for (const t of to) {
      tok.uid = t.uid;
      tok.token = t.token;
      tok.created_at = t.created_at;
      tok.valid = t.valid;
    }

    return tok;
  },

  update: (token, uid, callbackSuccess = null, callbackFailed = null) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('Token'));
        realm.create('Token', {
          uid,
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
        realm.delete(realm.objects('Token'));
        success();
        console.log('Token Revoked!');
      });
    } catch (e) {
      console.log(e);
      failed(e);
    }
  }
};

export default TokenSchema;
