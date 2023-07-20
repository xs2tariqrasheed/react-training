import { Button, Input, Table, TimePicker, message } from "antd";
import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import columns from "./columns";
import useSearchParams from "../../hooks/useSearchParams";
import useFetch from "../../hooks/useFetch";
import useIsFirstTimeRender from "../../hooks/useIsFirstTimeRender";

const CarServiceCenterTable = () => {
  const isFirstRender = useIsFirstTimeRender();
  const {
    page,
    pageSize,
    search,
    startTime,
    endTime,
    searchParams,
    updateSearchParams,
  } = useSearchParams({
    optional: ["search", "startTime", "endTime"],
  });

  const {
    loading,
    data: { data, total },
    refetch,
  } = useFetch("/service-centers", {
    params: {
      page: page.value,
      pageSize: pageSize.value,
      search: search.value || "",
    },
    initialData: { data: [], total: 0 },
    onError: (error) => message.error(error.message),
  });

  // CORRECTNESS

  const onChangePagination = (p, size) => {
    page.setValue(p);

    pageSize.setValue(size);
    updateSearchParams();
  };

  // TODO: use debounce for search
  const onSearch = (e) => {
    search.setValue(e.target.value);
    page.setValue(1);
    updateSearchParams();
  };

  useEffect(() => {
    if (isFirstRender) return;
    refetch();
  }, [searchParams]);

  return (
    <>
      <Button onClick={refetch} disabled={loading}>
        Refresh
      </Button>
      <TimePicker
        onChange={(_, str) => {
          startTime.setValue(str);
          updateSearchParams();
        }}
      />
      <TimePicker
        onChange={(_, str) => {
          endTime.setValue(str);
          updateSearchParams();
        }}
      />
      <Input
        style={{ float: "right", width: 350, marginBottom: 20 }}
        size="large"
        placeholder="Search..."
        suffix={<SearchOutlined />}
        value={search.value}
        onChange={onSearch}
      />

      <Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: parseInt(pageSize.value),
          current: parseInt(page.value),
          total: total || 0,
          onChange: onChangePagination,
        }}
        scroll={{ y: "calc(100vh - 400px)" }}
        rowKey="id"
      />
    </>
  );
};

export default CarServiceCenterTable;
