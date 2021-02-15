import React from "react";
import axios from "axios";

function NewData() {
  React.useEffect(() => {
    axios
      .post("http://localhost:4000/add")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text"></input>
    </div>
  );
}

export default NewData;
