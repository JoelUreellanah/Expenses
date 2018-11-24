import firebase from "firebase";
import { Icon } from "../3_Assets";

class Category {
  async load() {
    const categories = [];

    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Categories`);
    await ref
      .once("value", childSnapshot => {
        childSnapshot.forEach(doc => {
          categories.push({
            key: doc.key,
            name: doc.toJSON().name,
            image: doc.toJSON().image
          });
        });
      })
      .then(() => console.log("categories loaded"));
    return categories;
  }

  async saveCategory(categoryName) {
    let IS_DATA_ADDED_SUCCESSFULLY = false;
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Categories`);
    const data = {
      name: categoryName,
      image: "custom_category_icon"
    };
    await ref.push(data).then(() => (IS_DATA_ADDED_SUCCESSFULLY = true));
    return IS_DATA_ADDED_SUCCESSFULLY;
  }

  async deleteCategory(key) {
    const { currentUser } = firebase.auth();
    const database = firebase.database();
    const ref = database.ref(`/users/${currentUser.uid}/Categories/${key}`);

    await ref.remove(function(error) {
      console.log("error: " + error);
    });
  }
}

export default Category;
