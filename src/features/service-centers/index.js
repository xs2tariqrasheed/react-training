import React, { useState, useEffect } from "react";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const CarServiceCenterTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState({
    data: [],
    total: 0,
  });

  const onChangePagination = (page, pageSize) => {
    searchParams.set("page", page);
    searchParams.set("pageSize", pageSize);
    setSearchParams(searchParams);
  };

  const onSearch = (e) => {

    searchParams.set("search", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);

  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        `http://localhost:3001/api/service-centers?pageSize=${searchParams.get(
          "pageSize"
        )}&page=${searchParams.get("page")}&search=${searchParams.get(
          "search"
        )}`
      );
      setData(response.data);
    };

    fetchData();

    // TODO: fix the following line
  }, [searchParams]);

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
        value={searchParams.get("search")}
        onChange={onSearch}
      />

      <Table
        size="small"
        columns={columns}
        dataSource={data.data}
        pagination={{
          pageSize: parseInt(searchParams.get("pageSize")),
          current: parseInt(searchParams.get("page")),
          total: data.total,
          onChange: onChangePagination,
        }}
        scroll={{ y: "calc(100vh - 400px)" }}
        rowKey="id"
      />
    </>
  );
};

export default CarServiceCenterTable;
