import { Button, Input, Table, TimePicker, message, Modal } from "antd";
import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import columns from "./columns";
import useSearchParams from "../../hooks/useSearchParams";
import { useNavigate, useParams, useSearchParams as useSearchParamsRR } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useIsFirstTimeRender from "../../hooks/useIsFirstTimeRender";
import CreateForm from "./form";
import usePostRequest from "../../hooks/usePostRequest";

const CarServiceCenterTable = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isFirstRender = useIsFirstTimeRender();
  const { loading: createLoading, error, postData } = usePostRequest('/service-centers');
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
      page: page?.value,
      pageSize: pageSize?.value,
      search: search?.value || "",
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

  const handleCancel = () => {
    navigate('../sample-grid/list?page=1&pageSize=10', { replace: true })
  }

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
      <Button style={{ float: "right", }} size="large" type="primary" onClick={() => navigate('../sample-grid/create', { replace: true })}>
        Create
      </Button>
      <Input
        style={{ float: "right", width: 350, marginBottom: 20, marginRight: 30 }}
        size="large"
        placeholder="Search..."
        suffix={<SearchOutlined />}
        value={search.value}
        onChange={onSearch}
      />


      <Table
        loading={loading || createLoading}
        size="small"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: pageSize && parseInt(pageSize.value),
          current: page && parseInt(page.value),
          total: total || 0,
          onChange: onChangePagination,
        }}
        scroll={{ y: "calc(100vh - 400px)" }}
        rowKey="id"
      />
      <Modal destroyOnClose title="Create Service" open={id === 'create'} footer={null} onCancel={handleCancel} >
        <CreateForm refetch={refetch} postData={postData} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default CarServiceCenterTable;
