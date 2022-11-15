import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateThisCheese, getSingleCheeseThunk } from "../store/singleCheese";

const EditCheese = (props) => {
  const { singleCheese } = props;

  const [cheeseInfo, setCheeseInfo] = useState({
    name: "",
    dairyName: "",
    family: "",
    milkType: "",
    treatment: "",
    description: "",
    price: 19.99,
    quantity: 20,
    imageUrl: "",
    wineId: "",
  });

  useEffect(() => {
    props.getSingleCheeseThunk(props.singleCheese.id);
    setCheeseInfo(singleCheese);
  }, []);

  const handleChange = (event) => {
    setCheeseInfo({ ...cheeseInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateThisCheese({ ...singleCheese, ...cheeseInfo });
    setCheeseInfo({
      name: "",
      dairyName: "",
      family: "",
      milkType: "",
      treatment: "",
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
      wineId: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="edit-cheese-form">
        <label htmlFor="name">Cheese Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={singleCheese.name}
          onChange={handleChange}
        />

        <label htmlFor="dairyName">Dairy Name:</label>
        <input
          type="text"
          name="dairyName"
          defaultValue={singleCheese.dairyName}
          onChange={handleChange}
        />

        <label htmlFor="family">Family:</label>
        <input
          type="text"
          name="family"
          defaultValue={singleCheese.family}
          onChange={handleChange}
        />

        <label htmlFor="milkType">Milk Type:</label>
        <input
          type="text"
          name="milkType"
          defaultValue={singleCheese.milkType}
          onChange={handleChange}
        />

        <label htmlFor="treatment">Treatment:</label>
        <input
          type="text"
          name="treatment"
          defaultValue={singleCheese.treatment}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          rows="5"
          defaultValue={singleCheese.description}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={singleCheese.price}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          defaultValue={singleCheese.quantity}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          defaultValue={singleCheese.imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="wineId">Wine ID:</label>
        <input
          type="text"
          name="wineId"
          defaultValue={singleCheese.wineId}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapState = ({ singleCheese }) => ({
  singleCheese: singleCheese,
});

const mapDispatch = (dispatch) => ({
  updateThisCheese: (cheese) => dispatch(updateThisCheese(cheese)),
  getSingleCheeseThunk: (id) => dispatch(getSingleCheeseThunk(id)),
});

export default connect(mapState, mapDispatch)(EditCheese);
