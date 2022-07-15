import axios from "axios";
import React from "react";
import cards from "../cards";

const baseURL = "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
       // Card Info
        card_number: cards.card_number,
        cvv: cards.cvv,
        expiry_date: cards.expiry_date,

       // Destination User ID
        destination_user_id: UserID,

        // Value of the Transaction
        value: valueMoney,

      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"
}