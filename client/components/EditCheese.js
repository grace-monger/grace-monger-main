import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateThisCheese, getSingleCheeseThunk } from "../store/singleCheese";

const EditCheese = (props) => {
  useEffect(() => {
    props.getSingleCheeseThunk(props.singleCheese.id);
  }, []);

  console.log("EDIT CHEESE PROPS", props);
  const { singleCheese } = props;
  console.log("single cheese", singleCheese);

  const [cheeseInfo, setCheeseInfo] = useState({
    name: "",
    dairyName: "",
    family: "",
    milkType: "",
    treatment: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    setCheeseInfo({ ...cheeseInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateThisCheese({ ...props.singleCheese, ...cheeseInfo });
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
    });
  };

    const {name, dairyName, family, milkType, treatment, description, price, quantity, imageUrl} = singleCheese

  return (
    <div>
      <form onSubmit={handleSubmit} id="edit-cheese-form">
        <label htmlFor="name">Cheese Name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} />

        <label htmlFor="dairyName">Dairy Name:</label>
        <input
          type="text"
          name="dairyName"
          value={dairyName}
          onChange={handleChange}
        />

        <label htmlFor="family">Family:</label>
        <input
          type="text"
          name="family"
          value={family}
          onChange={handleChange}
        />

        <label htmlFor="milkType">Milk Type:</label>
        <input
          type="text"
          name="milkType"
          value={milkType}
          onChange={handleChange}
        />

        <label htmlFor="treatment">Treatment:</label>
        <input
          type="text"
          name="treatment"
          value={treatment}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
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
