import React from 'react';
import { Button, Row, Form, Input, Col, TimePicker } from 'antd';

const CreateForm = ({ onCancel, postData, refetch }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const obj = { ...values, openingTime: values.openingTime.format('HH:mm'), closingTime: values.closingTime.format('HH:mm') };
        await postData(obj);
        refetch();
        onCancel();
        form.resetFields(); // Clear form values
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            layout='vertical'
            name="carServiceform"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        label="User Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input rating!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Opening Time"
                        name="openingTime"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your opening Time!',
                            },
                        ]}
                    >
                        <TimePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Closing Time"
                        name="closingTime"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your closing Time!',
                            },
                        ]}
                    >
                        <TimePicker style={{ width: '100%' }} />

                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Logo"
                        name="logo"
                        rules={[
                            {
                                required: true,
                                message: 'Please input logo url!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Capacity"
                        name="capacity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input capacity!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                wrapperCol={{
                    offset: 20,
                    span: 4,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default CreateForm;