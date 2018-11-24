import firebase from "firebase";
import Card from "./Card";

class Bill {
  async load() {
    const bills = [];
    // this.setState({ loading: true, billsList: [] });
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills`);
    await ref
      .once("value", childSnapshot => {
        // const bills = [];
        childSnapshot.forEach(doc => {
          bills.push({
            key: doc.key,
            name: doc.toJSON().name,
            category: doc.toJSON().category,
            amount: doc.toJSON().amount,
            cardKey: doc.toJSON().cardKey,
            cardName: doc.toJSON().cardName,
            cardNumber: doc.toJSON().cardNumber,
            cardIcon: doc.toJSON().cardIcon,
            date: doc.toJSON().date,
            formattedDate: doc.toJSON().formattedDate,
            icon: doc.toJSON().icon
          });
        });
      })
      .then(() => console.log("Bills loaded"));

    bills.sort(this.sort);
    return bills;
  }

  async add(
    billType,
    billName,
    currency,
    billAmount,
    date,
    repeat,
    category,
    cardKey,
    cardName,
    cardNumber,
    cardIcon,
    icon
  ) {
    let IS_DATA_ADDED_SUCCESSFULLY = false;
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills`);
    const data = {
      billType: billType,
      name: billName,
      currency: currency,
      amount: billAmount,
      date: date.toString(),
      repeat: repeat,
      category: category,
      cardKey: cardKey,
      cardName: cardName,
      cardNumber: cardNumber,
      cardIcon: cardIcon,
      icon: icon
    };
    await ref.push(data).then(() => (IS_DATA_ADDED_SUCCESSFULLY = true));

    let key = "";
    await ref.limitToLast(1).once("child_added", function(childSnapshot) {
      key = childSnapshot.key;
    });
    await this.addNewHistory(key, date.toString(), "Pending");

    return IS_DATA_ADDED_SUCCESSFULLY;
  }

  sort(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    let comparison = 0;

    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }

  sortHistory(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    let comparison = 0;

    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
    // console.warn(a.date);
  }

  async delete(key) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${key}`);

    await ref.remove(function(error) {
      console.log("error: " + error);
    });
  }

  async retrieveSingleBillInformation(key) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${key}`);
    let bill;
    let billKey;
    await ref.once("value").then(function(snapshot) {
      bill = snapshot.val();
      billKey = snapshot.key;
    });

    bill.key = billKey;

    return bill;
  }

  async pay(key) {
    let DATA_UPDATED_SUCCESSFULLY = false;
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${key}`);

    const bill = await this.retrieveSingleBillInformation(key);
    const date = new Date(bill.date);

    await this.changeCurrentBillStatus(key, "Paid");

    var newdate = date.setDate(date.getDate() + 30);
    newdate = new Date(newdate);

    await this.addNewHistory(key, newdate, "Pending"); // update history

    await ref
      .update({ date: newdate.toString() })
      .then(() => (DATA_UPDATED_SUCCESSFULLY = true));
    return DATA_UPDATED_SUCCESSFULLY;
  }

  // -------------------------------------- HISTORY -----------------------------------------

  async loadHistory(key) {
    const history = [];
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${key}/History`);
    await ref
      .once("value", childSnapshot => {
        // const bills = [];
        childSnapshot.forEach(doc => {
          history.push({
            key: doc.key,
            date: doc.toJSON().date,
            status: doc.toJSON().status
          });
        });
      })
      .then(() => console.log("history loaded"));
    history.sort(this.sortHistory);
    history.reverse();
    return history;
  }

  async addNewHistory(key, date, status) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const historyRef = database.ref(
      `/users/${currentUser.uid}/Bills/${key}/History`
    );
    const data = {
      status: status,
      date: date.toString()
    };
    await historyRef.push(data);
  }

  async changeCurrentBillStatus(key, newStatus) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${key}/History`);

    let billHistoryKey = "";
    await ref
      .orderByChild("status")
      .equalTo("Pending")
      .once("child_added", function(snapshot) {
        // console.warn(snapshot.key);
        billHistoryKey = snapshot.key;
      });

    // console.warn(billHistoryKey);

    const historyRef = database.ref(
      `/users/${currentUser.uid}/Bills/${key}/History/${billHistoryKey}`
    );

    await historyRef.update({ status: newStatus });
  }

  async updateBillCardDetails(billKey, cardKey) {
    // console.warn(billKey, cardKey);
    let DATA_UPDATED_SUCCESSFULLY = false;
    const card = new Card();
    const newCard = await card.retrieveSingleCardInformation(cardKey);

    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Bills/${billKey}`);

    await ref
      .update({
        cardKey: newCard.key,
        cardName: newCard.cardName,
        cardNumber: newCard.cardNumber,
        cardIcon: newCard.cardIcon
      })
      .then(() => (DATA_UPDATED_SUCCESSFULLY = true));

    return DATA_UPDATED_SUCCESSFULLY;
  }
}

export default Bill;
