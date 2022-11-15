import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateThisWine, fetchSingleWine } from "../store/singleWine";

const EditWine = (props) => {
  const { singleWine } = props;

  const [wineInfo, setWineInfo] = useState({
    name: "",
    region: "",
    year: 0,
    type: "",
    typeOfGrape: "",
    tastingNotes: "",
    price: 19.99,
    quantity: 20,
    imageUrl: "",
    cheeseId: "",
  });

  useEffect(() => {
    props.fetchSingleWine(props.singleWine.id);
    setWineInfo(singleWine);
  }, []);

  const handleChange = (event) => {
    setWineInfo({ ...wineInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateThisWine({ ...singleWine, ...wineInfo });
    setWineInfo({
      name: "",
      region: "",
      year: 0,
      type: "",
      typeOfGrape: "",
      tastingNotes: "",
      price: 19.99,
      quantity: 20,
      imageUrl: "",
      cheeseId: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="edit-wine-form">
        <label htmlFor="name">Wine Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={singleWine.name}
          onChange={handleChange}
        />

        <label htmlFor="region">Region:</label>
        <input
          type="text"
          name="region"
          defaultValue={singleWine.region}
          onChange={handleChange}
        />

        <label htmlFor="year">Year:</label>
        <input
          type="text"
          name="year"
          defaultValue={singleWine.year}
          onChange={handleChange}
        />

        <label htmlFor="type">Type:</label>
        <input
          type="text"
          name="type"
          defaultValue={singleWine.type}
          onChange={handleChange}
        />

        <label htmlFor="typeOfGrape">Type Of Grape:</label>
        <input
          type="text"
          name="typeOfGrape"
          defaultValue={singleWine.typeOfGrape}
          onChange={handleChange}
        />

        <label htmlFor="tastingNotes">Tasting Notes:</label>
        <textarea
          type="text"
          name="tastingNotes"
          rows="5"
          defaultValue={singleWine.tastingNotes}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={singleWine.price}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          defaultValue={singleWine.quantity}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          defaultValue={singleWine.imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="cheeseId">Cheese ID:</label>
        <input
          type="text"
          name="cheeseId"
          defaultValue={singleWine.cheeseId}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  singleWine: state.singleWineReducer,
});

const mapDispatch = (dispatch) => ({
  updateThisWine: (wine) => dispatch(updateThisWine(wine)),
  fetchSingleWine: (id) => dispatch(fetchSingleWine(id)),
});

export default connect(mapState, mapDispatch)(EditWine);
