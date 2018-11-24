import firebase from "firebase";

class Card {
  async load() {
    const cards = [];

    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Cards`);
    await ref
      .once("value", childSnapshot => {
        childSnapshot.forEach(doc => {
          cards.push({
            key: doc.key,
            cardName: doc.toJSON().cardName,
            cardNumber: doc.toJSON().cardNumber,
            cardIcon: doc.toJSON().cardIcon
          });
        });
      })
      .then(() => console.log("cards loaded"));
    return cards;
  }

  async retrieveSingleCardInformation(key) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Cards/${key}`);
    let card;
    let cardKey;
    await ref.once("value").then(function(snapshot) {
      card = snapshot.val();
      cardKey = snapshot.key;
    });

    card.key = cardKey;

    return card;
  }

  async saveCard(cardName, cardNumber, cardIcon) {
    let IS_DATA_ADDED_SUCCESSFULLY = false;
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Cards`);
    const data = {
      cardName: cardName,
      cardNumber: cardNumber,
      cardIcon: cardIcon
    };
    await ref.push(data).then(() => (IS_DATA_ADDED_SUCCESSFULLY = true));
    return IS_DATA_ADDED_SUCCESSFULLY;
  }

  async delete(key) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Cards/${key}`);

    await ref.remove(function(error) {
      console.log("error: " + error);
    });
  }
}

export default Card;
