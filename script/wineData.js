const wineData = [
  {
    name: "Laurent Perrier Cuvee Rose Brut",
    region: "Champagne, France",
    year: "2020",
    type: "sparkling",
    typeOfGrape: "Pinot Noir",
    tastingNotes:
      "Intensely fruity flavors, clean and slightly sharp, the wine opens to the sensation of freshly picked red berries: strawberries, Morello cherries, black currants and raspberries. The finish is supple and rounded.",
    imageUrl:
      "https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9f/h50/12343340924958.png",
    cheeseId: 3,
  },
  {
    name: "Les Boursicottes Sancerre",
    region: "Upper Loire Valley, France",
    year: "2021",
    type: "white",
    typeOfGrape: "Sauvignon Blanc",
    tastingNotes:
      "Light golden color. Enticing nose with notes of fruit cocktail, a touch of flint and floral undertones. An expressive, savory palate with fresh melon, fig and citrus flavors. Crisp acidity and a long, pleasant finish.",
    imageUrl:
      "https://cdn.powered-by-nitrosell.com/product_images/19/4564/large-21lbs.jpg",
    cheeseId: 10,
  },
  {
    name: "GD Vajra Ravera Barolo",
    region: "Barolo, Italy",
    year: "2017",
    type: "red",
    typeOfGrape: "Nebbiolo",
    tastingNotes:
      "The aromatics of 2017 Barolo Ravera are an intricacy of red tones, with cherry, rose petals, baked raspberry alongside with orange peel, cedar, korla pear and herbal whiffles of mint, lavender, thyme, oolong tea. The palate is characterized by a zing of iron tones and the mid-palate volume that are such a signature of Ravera, with silky tannins and a profound and long finish.",
    imageUrl:
      "https://cdn10.bigcommerce.com/s-qhrs1uzk/products/14196/images/15060/Vajra_Ravera__03551.1622592914.1280.1280.jpg?c=2",
    cheeseId: 5,
  },
  {
    name: "Leth Ried Schafflerberg Gruner Veltliner",
    region: "Wagram, Austria",
    year: "2019",
    type: "white",
    typeOfGrape: "Gruner Veltliner",
    tastingNotes:
      "The bouquet promises fresh fruits and ripeness as well: yellow apple, honey melon and a hint of quince. Subtle exotic hints enhance the juicy feeling on the palate, while the classic aspects of Grüner Veltliner with pronounced herbal, spicy and peppery fruit are evident more during the long aftertaste. Bone dry with a vivid finish.",
    imageUrl:
      "https://cdn.powered-by-nitrosell.com/product_images/19/4564/thumb-19lgve.jpg",
    cheeseId: 2,
  },
  {
    name: "Blacksmith Hell Yeah Pinotage",
    region: "Paarl, South Africa",
    year: "2020",
    type: "red",
    typeOfGrape: "Pinotage",
    tastingNotes:
      "This is a crunchy, fruit driven Pinotage that showcases the real potential and range of the grape. The balance between zesty red and darker stone fruits with grippy tannins on the finish, demonstrates a serious wine with a lighthearted feel.",
    imageUrl:
      "https://3o60eq1h2fl0ivw654f829t1-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/the-black-smith-hell-yeah-pinotage-800x800.jpg",
    cheeseId: 4,
  },
  {
    name: "Mosca Orange",
    region: "Abruzzo, Italy",
    year: "2021",
    type: "orange",
    typeOfGrape: "Moscato",
    tastingNotes:
      "Cantina Indigeno Mosca Moscato Orange is a skin-contact natural wine (orange wine) made from 100% Moscato grapes grown organically in Abruzzo, Central Italy. Spontaneous fermentation with native yeast, 6 months of skin contact in fiberglass vats, bottled unfined, unfiltered, and with no added sulfites. Aromatic and savory, another gem by our friends at Cantina Indigeno.",
    imageUrl:
      "http://cdn.shopify.com/s/files/1/0491/9259/9713/products/CantinaIndigenoMosca2020.jpg?v=1621983086",
    cheeseId: 9,
  },
  {
    name: "Gulp Hablo Garnacha",
    region: "Castilla-La Mancha, Spain",
    year: "2020",
    type: "red",
    typeOfGrape: "Garnacha",
    tastingNotes:
      "Gulp Hablo Garnacha is a red natural wine made from Demeter certified biodynamic grapes farmed in Castilla-La Mancha, Spain. The grapes are grown on chalky clay soils and vinified naturally. Gulp Hablo Garnacha is also vegan certified. Ultimate glou glou wine in one-liter bottles.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0019/3363/9735/products/gulp-hablo-garnacha-spanish-natural-wine-primal-wine@2x.jpg?v=1660420516",
    cheeseId: 6,
  },
  {
    name: "Marinara Red Blend",
    region: "Contra Costa County, California",
    year: "2021",
    type: "red",
    typeOfGrape: "Montepulciano, Petit Syrah",
    tastingNotes:
      "Wonderwerk Marinara is a red natural wine made from a blend of Montepulciano and Petit Sirah farmed organically in Contra Costa County, California.",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0019/3363/9735/products/wonderwerk-marinara-montepulciano-natural-wine-primal-wine-front@2x.jpg?v=1666743896",
    cheeseId: 1,
  },
  {
    name: "Gregoletto Prosecco",
    region: "Prosecco, Italy",
    year: "2018",
    type: "sparkling",
    typeOfGrape: "Glera (Prosecco)",
    tastingNotes:
      "Straw yellow color. Fine and persistent perlage. Essential and light, it has a scent that varies with time. With fresh and fruity notes reminiscent of sour apple and wisteria flowers combined with a delicate perception of bread crust.",
    imageUrl:
      "https://cdn.powered-by-nitrosell.com/product_images/19/4564/large-18gregpro.jpg",
    cheeseId: 7,
  },
  {
    name: "Cedergreen Viola Rose",
    region: "Columbia Valley, Washington",
    year: "2021",
    type: "rosé",
    typeOfGrape: "Gamay Noir",
    tastingNotes:
      "A racy palate with flavors of bright crushed strawberries and raspberries combine with deep floral notes of lilac and violets.",
    imageUrl:
      "https://cdn.powered-by-nitrosell.com/product_images/19/4564/large-21cero.jpg",
    cheeseId: 8,
  },
  {
    name: "Cervidae (Sean's Spawn)",
    region: "Stag's Leap District, California (a.k.a Sean's backyard)",
    year: "2022",
    type: "red",
    typeOfGrape: "Merlot",
    price: "55",
    tastingNotes:
      "Juicy plum and raspberry combine with savoury spice, smooth tannins, and oak for a lush, polished texture",
  },
  {
    name: "Lumos (Sean's Spawn)",
    region: "Manchuela, Spain",
    year: "2022",
    type: "white",
    typeOfGrape: "Macabeo Sauvignon Blanc",
    price: "35",
    tastingNotes:
      "Macabeo and Sauvignon Blanc are perfect partners in this bright and balanced blend. Together they show aromas of citrus and tropical fruit, with soft white blossom. The palate is lush and layered with pronounced flavors of green apple, pear, grapefruit, and tropical fruit, with light notes of honeysuckle and grass. Fresh and flavorful with lively acidity, elegant complexity, and medium persistence.",
  },
];

//PAIRINGS
// wine             Cheeses
// 1 Laurent Perrier - Reading Raclette 3
// 2 Les Boursicottes Sancerre - Firefly Farms Chevre 10
//3 GD Vajra Ravera Barolo - Jakes Gouda 5
//4 Leth Ried Schafflerberg Gruner Veltliner - Harbison 2
// 5 Blacksmith Hell Yeah Pinotage - Hooks Blue 4
// 6 Mosca Orange - Snow Camp 9
// 7 Gulp Hablo Garnacha - Maple Smoked Cheddar 6
// 8 Marinara Red Blend - Parmigiano 1
// 9 Gregoletto Prosecco - Appalachian 7
// 10 Cedergreen Viola Rose - Fresh Mozzarella id 8

module.exports = wineData;
