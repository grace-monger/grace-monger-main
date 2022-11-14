import React, { useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import { applyMiddleware } from "redux";
import { addNewCheeseThunk } from "../store/cheeses";

const AddCheeseForm = (props) => {
  const [name, setName] = useState("");
  const [dairyName, setDairyName] = useState("");
  const [family, setFamily] = useState("");
  const [milkType, setMilkType] = useState("");
  const [treatment, setTreatment] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(19.99);
  const [quantity, setQuantity] = useState(20);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewCheeseThunk({
      name,
      dairyName,
      family,
      milkType,
      treatment,
      description,
      price,
      quantity,
      imageUrl,
    });
    setName("");
    setDairyName("");
    setFamily("");
    setMilkType("");
    setTreatment("");
    setDescription("");
    setPrice(19.99);
    setQuantity(20);
    setImageUrl("");
  };

  const handleChanges = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "dairyName") {
      setDairyName(event.target.value);
    } else if (event.target.name === "family") {
      setFamily(event.target.value);
    } else if (event.target.name === "milkType") {
      setMilkType(event.target.value);
    } else if (event.target.name === "treatment") {
      setTreatment(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "price") {
      setPrice(event.target.value);
    } else if (event.target.name === "quantity") {
      setQuantity(event.target.value);
    } else if (event.target.name === "imageUrl") {
      setImageUrl(event.target.value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="add-cheese-form">
        <h2>Add a new cheese: </h2>
        <label htmlFor="name">Cheese name:</label>
        <input type="text" name="name" value={name} onChange={handleChanges} />

        <label htmlFor="dairy-name">Dairy name:</label>
        <input
          type="text"
          name="dairyName"
          value={dairyName}
          onChange={handleChanges}
        />

        <label htmlFor="family">Family:</label>
        <input
          type="text"
          name="family"
          value={family}
          onChange={handleChanges}
        />

        <label htmlFor="milkType">Milk Type:</label>
        <input
          type="text"
          name="milkType"
          value={milkType}
          onChange={handleChanges}
        />

        <label htmlFor="treatment">Treatment:</label>
        <input
          type="text"
          name="treatment"
          value={treatment}
          onChange={handleChanges}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          row="5"
          value={description}
          onChange={handleChanges}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleChanges}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={handleChanges}
        />

        <label htmlFor="imageUrl">Image:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChanges}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addNewCheeseThunk: (cheese) => dispatch(addNewCheeseThunk(cheese)),
  };
};

export default connect(null, mapDispatch)(AddCheeseForm);
