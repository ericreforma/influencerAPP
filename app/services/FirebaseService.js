import firebase from 'react-native-firebase';

export default class FirebaseService {
  auth = firebase.auth();
  firestore = firebase.firestore();
  messageRef = this.firestore.collection('messages');

  currentUser = callback => {
    this.auth.onAuthStateChanged(user => {
      callback(user);
    });
  }

  async fetchMessages (client_uid, uid) {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .where('receiver', '==', client_uid)
      .where('sender', '==', uid)
      .limit(50)
      .get()

    return messages.docs
  }

  async createMessage ({ message, receiver, sender }) {
    await this.messageRef.add({
      message,
      receiver,
      sender,
      created_at: new Date()
    });
  }
}