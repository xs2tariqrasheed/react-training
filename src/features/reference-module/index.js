import { Button, Input, Table, TimePicker, message, Modal } from "antd";
import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import getColumns from "./columns"; // Import the columns from the separate file
import useSearchParams from "../../hooks/useSearchParams";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useIsFirstTimeRender from "../../hooks/useIsFirstTimeRender";
import CreateForm from "./form";
import usePostRequest from "../../hooks/usePostRequest";
import usePatchRequest from "../../hooks/usePatchRequest";

const ReferenceModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isFirstRender = useIsFirstTimeRender();
  const {
    loading: createLoading,
    error,
    postData,
  } = usePostRequest("/reference-module");
  const {
    loading: updateLoading,
    error: updateError,
    patchData,
  } = usePatchRequest("/reference-module");
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
  } = useFetch("/reference-module", {
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
    navigate("../sample-grid/list?page=1&pageSize=10", { replace: true });
  };

  const columns = getColumns(navigate);
  const totalColumnsWidth = columns?.reduce(
    (total, col) => total + (col.width || 100),
    0
  );
  const tableScroll = { y: "calc(100vh - 400px)", x: totalColumnsWidth };

  const editRecord = data?.find((item) => item.id === parseInt(id));

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
      <Button
        style={{ float: "right" }}
        size="large"
        type="primary"
        onClick={() => navigate("../sample-grid/create", { replace: true })}
      >
        Create
      </Button>
      <Input
        style={{
          float: "right",
          width: 350,
          marginBottom: 20,
          marginRight: 30,
        }}
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
        scroll={tableScroll}
        rowKey="id"
      />
      <Modal
        width={"60%"}
        destroyOnClose
        title="Create Service"
        open={id === "create" || id !== "list"}
        footer={null}
        onCancel={handleCancel}
      >
        <CreateForm
          refetch={refetch}
          postData={postData}
          record={editRecord}
          patchData={patchData}
          onCancel={handleCancel}
          updateLoading={updateLoading}
          isEdit={id !== "create" && id !== "list"}
        />
      </Modal>
    </>
  );
};

export default ReferenceModule;
