import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Table,
  Switch,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { API_URL } from "../../config"; // Your API base

const CategoryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchCategories = async (pageNo = 1, pageSize = 5) => {
    setTableLoading(true);
    try {
      const formData = new FormData();
      formData.append("PUID", "123456");
      formData.append("Slug", "#");
      formData.append("CrudAction", "VIEW");
      formData.append("PageNo", pageNo);
      formData.append("PageSize", pageSize);

      const res = await axios.post(`${API_URL}/api/Category/manage`, formData);

      // Ensure backend returns totalCount or something similar
      const { data = [], totalCount = 0 } = res.data;

      setCategoryList(data);
      setPagination({
        current: pageNo,
        pageSize,
        total: totalCount,
      });
    } catch (err) {
      message.error("Failed to load categories");
    } finally {
      setTableLoading(false);
    }
  };
  const handleTableChange = (pagination) => {
    fetchCategories(pagination.current, pagination.pageSize);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("Slug", "#");
      formData.append("PUID", "123456");
      formData.append("CrudAction", editingCategory ? "EDIT" : "ADD");

      if (editingCategory) {
        formData.append("Id", editingCategory.id);
      }

      await axios.post(`${API_URL}/api/Category/manage`, formData);
      message.success(editingCategory ? "Offering updated!" : "Offering created!");
      form.resetFields();
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append("Id", id);
      formData.append("PUID", "123456");
      formData.append("Slug", "#");
      formData.append("CrudAction", "DELETE");

      await axios.post(`${API_URL}/api/Category/manage`, formData);
      message.success("Offering deleted!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Offering Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => <Switch checked={val} disabled />,
    },
    {
      title: "Created On",
      dataIndex: "regDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingCategory(record);
                form.setFieldsValue({ name: record.name });
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this offering?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Delete">
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card className="m-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-2 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold mb-1">
            {editingCategory ? "✏️ Edit Offering" : "📂 Create New Offering"}
          </h3>
          <p className="text-sm text-gray-100">
            {editingCategory
              ? `Editing: ${editingCategory.name}`
              : "Enter offering name and save"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: "" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Offering Name"
          rules={[{ required: true, message: "Please enter offering name" }]}
        >
          <Input placeholder="Enter offering name" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ background: "#522EA8", border: "none" }}
          >
            {editingCategory ? "Update Offering" : "Create Offering"}
          </Button>
          {editingCategory && (
            <Button
              className="ml-2"
              onClick={() => {
                form.resetFields();
                setEditingCategory(null);
              }}
            >
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>

      {/* Table */}
      <h3 className="text-lg font-semibold mt-6 mb-2">📋 All Offerings</h3>
      <Table
        dataSource={categoryList}
        columns={columns}
        rowKey="id"
        loading={tableLoading}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />
    </Card>
  );
};

export default CategoryForm;
