import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Row,
  Form,
  Input,
  Col,
  Select,
  InputNumber,
  DatePicker,
  TimePicker,
  Radio,
  Switch,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

import { getBase64 } from "../../utills/helpers";
import CustomInput from "./customInput";
import dayjs from "dayjs";

import "dayjs/locale/en"; // Import the locale for Day.js
dayjs.locale("en");

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select date!",
    },
  ],
};

const timeConfig = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const CreateForm = ({
  onCancel,
  postData,
  refetch,
  record,
  patchData,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { Group } = Radio;
  const { Option } = Select;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const onFinish = async (values) => {
    const obj = {
      ...values,
      timePicker: values.timePicker?.format("HH:mm:ss"),
      timeRange: values.timeRange && [
        values.timeRange[0]?.format("HH:mm:ss"),
        values.timeRange[1]?.format("HH:mm:ss"),
      ],
      uploadImage:
        "https://as2.ftcdn.net/v2/jpg/06/12/64/91/1000_F_612649147_cfSJEwoIOjXTGTkrOJBystEqYFOSHWQn.jpg",
    };
    if (isEdit) {
      patchData({ ...obj, id: record.id });
    } else {
      postData(obj);
    }
    refetch();
    onCancel();
    form.resetFields(); // Clear form values
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formatFloat = (value) => {
    if (value || value === 0) {
      return `${value}`;
    }
    return "";
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const { setFieldsValue } = form;

  useEffect(() => {
    if (record) {
      const dateRange = record.selectDateRangePicker?.map((date) =>
        dayjs(date)
      );
      const timeRange = record.timeRange?.map((time) =>
        dayjs(time, "HH:mm:ss")
      );
      const dateTimeRange = record.dateTimeRange?.map((dateTime) =>
        dayjs(dateTime)
      );

      const fieldValues = {
        name: record.name,
        textArea: record.textArea,
        switch: record.switch,
        checkboxValue: record.checkboxValue,
        selectedOptions: record.selectedOptions,
        number: record.number,
        email: record.email,
        radioButton: record.radioButton,
        password: record.password,
        radioGroup: record.radioGroup,
        customInputValue: record.customInputValue,
        floatValue: record.floatValue,
        selectedOption: record.selectedOption,
        datePicker: dayjs(record.datePicker),
        timePicker: dayjs(record.timePicker, "HH:mm:ss"),
        dateTime: dayjs(record.dateTime),
        selectDateRangePicker: dateRange,
        timeRange: timeRange,
        dateTimeRange: dateTimeRange,
      };

      setFieldsValue(fieldValues);
    }
  }, [record, setFieldsValue]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="carServiceform"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{
        maxWidth: "100%",
      }}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Input"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Number"
            name="number"
            rules={[
              {
                required: true,
                message: "Please enter number!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="floatValue"
            label="Float Value"
            rules={[{ required: true, message: "Please enter a float value" }]}
          >
            <InputNumber
              defaultValue={0.5}
              type="number"
              style={{ width: "100%" }}
              formatter={formatFloat}
              parser={parseFloat}
              step={0.01} // Set the step for precision
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="selectedOption"
            label="Select Option"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select an option"
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="option1" label="Option 1">
                Option 1
              </Option>
              <Option value="option2" label="Option 2">
                Option 2
              </Option>
              <Option value="option3" label="Option 3">
                Option 3
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="selectedOptions"
            label="Multi Select Options"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Select
              allowClear
              mode="multiple"
              showSearch
              placeholder="Select options"
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={null} label="Clear">
                Clear
              </Option>
              <Option value="option1" label="Option 1">
                Option 1
              </Option>
              <Option value="option2" label="Option 2">
                Option 2
              </Option>
              <Option value="option3" label="Option 3">
                Option 3
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="datePicker" label="DatePicker" {...config}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="timePicker" label="TimePicker" {...timeConfig}>
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dateTime"
            label="Select Date and Time"
            rules={[
              { required: true, message: "Please select a date and time" },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Date and Time"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="selectDateRangePicker"
            label="Select Date Range Picker"
            rules={[{ required: true, message: "Please select a date range" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="timeRange"
            label="Select Time Range"
            rules={[{ required: true, message: "Please select a time range" }]}
          >
            <TimePicker.RangePicker
              // format="HH:mm"
              placeholder={["Start Time", "End Time"]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dateTimeRange"
            label="Select Date and Time Range"
            rules={[
              {
                required: true,
                message: "Please select a date and time range",
              },
            ]}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              placeholder={["Start Date-Time", "End Date-Time"]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="radioButton"
            label="Radio.Button"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Group>
              <Radio.Button style={{ marginRight: 10 }} value="a">
                item 1
              </Radio.Button>
              <Radio.Button style={{ marginRight: 10 }} value="b">
                item 2
              </Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Group>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Checkbox"
            name="checkboxValue"
            valuePropName="checked"
          >
            <Checkbox>Checkbox</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="radioGroup" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="textArea" label="TextArea">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="uploadImage"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="uploadFile"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="long"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            valuePropName="selected"
            name="customInputValue"
            label="Custome Input"
          >
            <CustomInput count={5} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "end" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateForm;
