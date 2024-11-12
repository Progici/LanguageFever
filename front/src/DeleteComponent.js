import { SERVER_URL } from "./constant";

function DeleteComponent({ id, handleClick }) {
  function deleteCar() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    let idObject = { id };
    fetch(SERVER_URL + "/korisnici/" + idObject.id, requestOptions).then(
      async (response) => {
        if (!response.ok) {
          console.log("Error happened");
          console.log(SERVER_URL + "/korisnici/" + idObject.id);
        }

        handleClick();
      }
    );
  }

  return <button onClick={deleteCar}>Delete</button>;
}

export default DeleteComponent;
