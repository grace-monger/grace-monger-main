const cheeseData = [
  {
    name: "Parmigiano Reggiano",
    dairyName: "PDO",
    family: "Cooking Cheese",
    milkType: "Cow",
    treatment: "raw",
    description:
      "This is your classic Parmigiano Reggiano, aged for a minimum of 14 months and made from skimmed cows milk from the PDO designated region of production, and it is aged to sweet and nutty perfection.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Saxelby_cheeses-080_580x.jpg?v=1661359424",
  },
  {
    name: "Harbison",
    dairyName: "Jasper Hill Farms",
    family: "Bloomy",
    milkType: "Cow",
    treatment: "pasteurized",
    description:
      "This creamy, bark-wrapped cows milk cheese from Jasper Hill Farm is a little like Camembert cheese and takes its name from Greensboros local librarian. The wheels are characterized by a sweet milky flavor, and finish with meaty, smoky, juniper notes that are imparted via the bark, which is harvested from balsa trees in the surrounding woodlands.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Harbison_580x.jpg?v=1569002625",
  },
  {
    name: "Reading Raclette",
    dairyName: "Spring Brook Farm",
    family: "Stinky",
    milkType: "Cow",
    treatment: "raw",
    description:
      "Reading Raclette is a semi-firm wheel of raw cows milk cheese that is washed with saltwater brine as it matures to the tender age of 3-4 months. The paste is pliant and supple, with a heady flavor that favors fruity and milky notes. The melt-in-your-mouth cheese is graced with a kick of saltiness that finishes off on the palate.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Reading-Raclette_580x.jpg?v=1560992088",
  },
  {
    name: "Hooks Blue",
    dairyName: "Hook’s Cheese Company",
    family: "Blue",
    milkType: "Cow",
    treatment: "pasteurized",
    description:
      "This is as classic as blue cheese gets. Made by Julie and Tony Hook just outside of Madison Wisconsin, this creamy, spicy blue cheese will knock your socks off.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Hooks-Blue_580x.jpg?v=1477325199",
  },
  {
    name: "Jakes Gouda",
    dairyName: "Jakes Cheese",
    family: "Gouda",
    milkType: "Cow",
    treatment: "raw",
    description:
      "This gouda cheese is made in traditional Dutch fashion - wheels are rubbed with buttercream instead of wax, meaning that the cheeses can breathe as they age. Jake’s Gouda is dense and aged, with a crystalline texture and a nutty, toasted and caramelly flavor profile.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/jake_sgoudaonsaxelbypaperwebsize_580x.jpg?v=1622759089",
  },
  {
    name: "Maple Smoked Cheddar",
    dairyName: "Grafton Village Cheese",
    family: "Cheddar",
    milkType: "Cow",
    treatment: "raw",
    description:
      "The blocks are lightly smoked, lending a savory and downright bacon-y flavor to the smooth, sharp cheddar. Makes a perfect sandwich companion, especially sandwiches of the vegetarian variety... rich, smokey, and hearty.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/smoked_cheddar_20180819_SAXELBY_2018_163_580x.jpg?v=1619500003",
  },
  {
    name: "Appalachian",
    dairyName: "Meadow Creek Dairy",
    family: "Tomme Style",
    milkType: "Cow",
    treatment: "raw",
    description:
      "A creamy, buttery, grass fed cheese with a snow white, mushroomy rind. Appalachian cheese is made from the raw milk from Meadow Creek Dairy’s closed herd of dairy cows - they’ve been evolving their herd’s genetic line since 1988, starting with purebred Jerseys and introducing some European genetics that are indigenous to the Alps to make their cows hardier and to create the most delicious, rich milk possible!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Saxelby_cheeses-151_580x.jpg?v=1663087665",
  },
  {
    name: "Fresh Mozzarella",
    dairyName: "Narragansett Creamery",
    family: "Fresh",
    milkType: "Cow",
    treatment: "pasteurized",
    description:
      "Narragansett Creamerys fresh mozzarella cheese is sweet and creamy with a hint of salt, making it the perfect cheese for pizza recipes, caprese, and other mozzarella cheese recipes. Each ball weighs in at 8oz.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Mozarella_7bb19cf3-9c66-42ff-a153-10d650d4d21e_580x.jpg?v=1585164298",
  },
  {
    name: "Snow Camp",
    dairyName: "Goat Lady Dairy",
    family: "Bloomy",
    milkType: "Cow",
    treatment: "pasteurized",
    description:
      "The cows milk used to make Snow Camp is sourced from a neighboring farm, and transformed into a delicate bloomy rind button. When young, the cheese is bright, lactic and tangy. Over time the cheese softens and the flavors intensify, evoking creme fraiche, mushrooms and cultured butter. Each wheel weighs 4oz and is aged 4-6 weeks.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/Snow-Camp_580x.jpg?v=1622759269",
  },
  {
    name: "Firefly Farms Chevre",
    dairyName: "Firefly Farms",
    family: "Fresh",
    milkType: "Goat",
    treatment: "pasteurized",
    description:
      "Creamy fresh chevre from the southwestern corner of Maryland. Firefly Farms has been making cheese since 2002, and supports a network of family farms within a 30 mile radius by purchasing their milk and turning it into top quality cheese.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1444/2808/products/fireflyfarmsplainchevreonsaxelbypaperwebsize_580x.jpg?v=1620769242",
  },
];

module.exports = cheeseData;
