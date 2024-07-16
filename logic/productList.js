const productList = [
  {
    id: "1",
    title: "Car",
    img: "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
    description: "",
  },
  {
    id: "2",
    title: "Moto",
    img: "https://img.freepik.com/free-photo/view-cool-powerful-motorcycle_23-2150704865.jpg",
    description: "",
  },
  {
    id: "3",
    title: "Bicycle",
    img: "https://www.shutterstock.com/image-photo/yellow-black-29er-mountainbike-thick-260nw-1498702814.jpg",
    description: "",
  },
  {
    id: "4",
    title: "El. Scooter",
    img: "https://razor.com/wp-content/uploads/2021/06/C25_GY_Product-540x864.png",
    description: "",
  },
];

const creeateeproductCard = ({ id, title, img, description }) => {
  return `<li id="${id}">
    <h3>${title}</h3>
    <img src="${img}" alt="${title} - img" />
    <p>${description}</p>
</li>`;
};

const $productList = $("#prooductList");
const procudsListItems = productList.forEach((item) => {
  $productList.append(creeateeproductCard({ ...item }));
});
