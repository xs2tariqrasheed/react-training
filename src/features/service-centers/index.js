import React, { useState, useEffect } from "react";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const CarServiceCenterTable = () => {
  const [data, setData] = useState({
    data: [],
    total: 0,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `http://localhost:3001/api/service-centers?pageSize=${pageSize}&page=${page}`
      );
      setData(response.data);
    };

    fetchData();
  }, [page, pageSize]);

  // TODO: Get columns information from data source.
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

  return (
    <>
      <Input
        style={{ float: "right", width: 350, marginBottom: 20 }}
        size="large"
        placeholder="Search..."
        suffix={<SearchOutlined />}
      />
      <Table
        size="small"
        columns={columns}
        dataSource={data.data}
        pagination={{
          pageSize, // pageSize: pageSize
          current: page,
          total: data.total,
          onChange: (page, pageSize) => {
            console.log(page, pageSize, "???");
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        scroll={{ y: "calc(100vh - 400px)" }}
        rowKey="id"
      />
    </>
  );
};

export default CarServiceCenterTable;
