import React from "react";

// firebase
import { db } from "../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
export const useGetData = (collectionName) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const collectionRef = collection(db, collectionName);

  React.useEffect(() => {
    const getData = async () => {
      // firebase firestore realtime data update
      await onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
    };

    getData();
  }, []);

  return { data, loading };
};
