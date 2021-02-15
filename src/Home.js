import React from "react";
import axios from "axios";

function Home() {
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/operations")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  });

  return <div>Home</div>;
}

export default Home;
