import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Card,
  Input,
  Space,
  Button,
  Popconfirm,
  Modal,
  message,
  Tooltip,
  Tag,
  Image
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { API_URL } from "../../../config";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);


  const navigate = useNavigate();
  // const API_URL = import.meta.env.VITE_API_URL
const fetchData = useCallback(async (page = 1, pageSize = 10, search = "") => {
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("PUID", "123456");
    formData.append("Slug", "#");
    formData.append("CrudAction", "VIEW");
    formData.append("PageNo", page);
    formData.append("PageSize", pageSize);
    if (search) formData.append("Search", search);

    const response = await axios.post(`${API_URL}/api/Blog/manage`, formData);
    const result = response.data;

    setBlogs(result.data || []);
    setPagination({ current: page, pageSize, total: result.totalCount || 0 });
  } catch (error) {
    console.error("Fetch error:", error);
    message.error("Failed to load blog data");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination.current, pagination.pageSize, searchText, fetchData]);

  const debounceSearch = useCallback(
    debounce((val) => {
      setPagination((prev) => ({ ...prev, current: 1 }));
      setSearchText(val);
    }, 500),
    []
  );

  const handleSearch = (e) => debounceSearch(e.target.value);

  const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("PUID", "123456");
    formData.append("Slug", "#");
    formData.append("CrudAction", "DELETE");
    formData.append("Id", id);

    await axios.post(`${API_URL}/api/Blog/manage`, formData);
    message.success("Blog deleted successfully");
    fetchData(pagination.current, pagination.pageSize, searchText);
  } catch (error) {
    console.error("Delete error:", error);
    message.error("Failed to delete blog");
  }
};


  const columns = [
    {
      title: "S.No",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "postType",
      render: (type) => (
        <Tag color={type === "NEWS" ? "red" : "blue"}>{type}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Offering",
      dataIndex: "category",
      render: (category) => (
        <Tag>
          {category ? category : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Domain",
      dataIndex: "domain"
    },
    {
      title: "Reg Date",
      dataIndex: "regDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              type="text"
              onClick={() => {
                setSelectedBlog(record);
                setViewModalVisible(true);
              }}
              style={{ color: "#522EA8" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => navigate("/blog/create", { state: record })}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete this blog?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card className="m-2 shadow-sm rounded-md">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold">Blog Overview</h3>
          <p className="text-sm text-gray-100">
            Total Blogs: <span className="font-semibold">{pagination.total}</span>
            <br />
            Last Updated: {dayjs().format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button icon={<ReloadOutlined />} onClick={() => fetchData(1, pagination.pageSize, searchText)} />
          </Tooltip>
          <Input.Search
            placeholder="Search blog"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
          <Link to="/blog/create">
            <Button icon={<PlusOutlined />} style={{ backgroundColor: "#fff", color: "#522EA8", fontWeight: 600 }}>
              Add Blog
            </Button>
          </Link>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={blogs}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={(pg) => setPagination({ ...pg })}
        rowKey="id"
        bordered
      />

      <Modal
        title="Blog Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedBlog && (
          <div>
            <p><strong>Title:</strong> {selectedBlog.name}</p>
            <p><strong>Slug:</strong> {selectedBlog.slug}</p>
            <p><strong>About:</strong> {selectedBlog.about}</p>
            <p><strong>Post Type:</strong> {selectedBlog.postType}</p>
            <p><strong>Status:</strong> {selectedBlog.status ? "Active" : "Inactive"}</p>
            <p><strong>View Order:</strong> {selectedBlog.viewOrder}</p>
            <p><strong>Offering :</strong> {selectedBlog.category || "N/A"}</p>
            <p><strong>Domain :</strong> {selectedBlog.domain}</p>
            <p><strong>Date:</strong> {dayjs(selectedBlog.regDate).format("YYYY-MM-DD")}</p>
              {selectedBlog.photo && (
              <div className="mt-4">
                <p><strong>Images:</strong></p>
                <Image.PreviewGroup>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {selectedBlog.photo
                      .split(",")
                      .filter((url) => url.trim() !== "")
                      .map((url, index) => (
                        <Image
                          key={index}
                          width={150}
                          height={100}
                          src={`${API_URL}${url.trim()}`}
                          style={{ objectFit: "cover", borderRadius: 6 }}
                          alt={`Blog Img ${index + 1}`}
                          preview={true}
                        />
                      ))}
                  </div>
                </Image.PreviewGroup>
              </div>
            )}
            <p><strong>Content:</strong></p>
            <div style={{
              border: "1px solid #eee",
              padding: "10px",
              borderRadius: "6px",
              background: "#f9f9f9",
            }}>
              {selectedBlog.detail}
            </div>
          

          </div>
        )}
      </Modal>
    </Card>
  );
};

export default BlogDetails;
