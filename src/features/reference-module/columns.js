import dayjs from "dayjs";
import { Button } from "antd";

import TimeAgo from "./components/TimeAgo";

const getColumns = (navigate) => {
  return [
    {
      width: "70px",
      title: "Name",
      dataIndex: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Number",
      width: "70px",
      align: "center",
      dataIndex: "number",
    },
    {
      align: "center",
      title: "Email",
      width: "150px",
      dataIndex: "email",
    },
    {
      title: "Password",
      width: "100px",
      align: "center",
      dataIndex: "password",
    },
    {
      title: "Image",
      width: "70px",
      align: "center",
      dataIndex: "uploadImage",
      render: (image) => <img src={image} alt="Logo" height={30} width={30} />,
    },
    {
      align: "center",
      title: "Float Value",
      width: "70px",
      dataIndex: "floatValue",
    },
    {
      title: "Single selected Option",
      width: "150px",
      align: "center",
      dataIndex: "selectedOption",
    },
    {
      align: "center",
      width: "150px",
      title: "Multi Selected Options",
      dataIndex: "selectedOptions",
      render: (options) => (
        <>{"[" + options?.map((service) => service)?.join() + "]"}</>
      ),
    },
    {
      align: "center",
      width: "150px",
      title: "Time Picker",
      dataIndex: "timePicker",
    },
    {
      width: "200px",
      align: "center",
      title: "Date Picker",
      dataIndex: "datePicker",
      render: (obj) => <>{obj ? dayjs(obj).format("DD-MMM-YYYY "): 'N/A'}</>,
    },
    {
      align: "center",
      title: "Date Time",
      dataIndex: "dateTime",
      width: "200px",
      render: (obj) => <>{dayjs(obj).format("DD-MMM-YYYY h:mm A")}</>,
    },
    {
      title: "Time Ago",
      dataIndex: "dateTime",
      width: "200px",
      align: "center",
      render:(obj)=> <>{ <TimeAgo timestamp={obj} />}</>,
    },
    {
      title: "Date Time Range",
      dataIndex: "dateTimeRange",
      key: "range",
      align: "center",
      width: "250px",
      render: (record) => {
        if (record) {
          const startTime = dayjs(record[0]).format("YYYY-MM-DD HH:mm");
          const endTime = dayjs(record[1]).format("YYYY-MM-DD HH:mm");
          return `${record && `${startTime} - ${endTime}`}`;
        } else return "N/A";
      },
    },
    {
      width: "150px",
      align: "center",
      title: "Radio Button Value",
      dataIndex: "radioButton",
    },
    {
      width: "150px",
      align: "center",
      title: "Checkbox Value",
      dataIndex: "checkboxValue",
      render: (value) => <>{value ? "True" : "False"}</>,
    },
    {
      width: "150px",
      align: "center",
      title: "Radio Group Value",
      dataIndex: "radioGroup",
    },
    {
      width: "100px",
      align: "center",
      title: "Switch",
      dataIndex: "switch",
      render: (value) => <>{value ? "True" : "False"}</>,
    },
    {
      width: "150px",
      align: "center",
      title: "Custom Input Value",
      dataIndex: "customInputValue",
    },
    {
      width: "100px",
      align: "center",
      title: "Text Area",
      dataIndex: "textArea",
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right", // Fix the column to the right
      width: "100px",
      align: "center",
      render: (_, record) => (
        <Button
          style={{ marginTop: 5 }}
          type="primary"
          size="small"
          onClick={() =>
            navigate(`../sample-grid/${record.id}`, { replace: true })
          }
        >
          Edit
        </Button>
      ),
    },
  ];
};

export default getColumns;
