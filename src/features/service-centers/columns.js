const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text, object, index) => <b>{text}</b>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Logo",
    dataIndex: "logo",
    render: (text) => <img src={text} alt="Logo" />,
  },
  {
    title: "Opening Time",
    dataIndex: "openingTime",
  },
  {
    title: "Closing Time",
    dataIndex: "closingTime",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
  },
];

export default columns;
