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
  Image,
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

const DemoList = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

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

      const response = await axios.post(`${API_URL}/api/DataSheet/manage`, formData);
      const result = response.data;

      setData(result.data || []);
      setPagination({ current: page, pageSize, total: result.totalCount || 0 });
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load datasheet data");
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

 

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "postType",
      render: (type) => <Tag color={type === "NEWS" ? "red" : "blue"}>{type}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={status ? "green" : "volcano"}>{status ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category) => <Tag>{category || "N/A"}</Tag>,
    },
    {
      title: "Domain",
      dataIndex: "domain",
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
                setSelectedItem(record);
                setViewModalVisible(true);
              }}
              style={{ color: "#522EA8" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card className="m-2 shadow-sm rounded-md">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold">Booked Demo Overview</h3>
          <p className="text-sm text-gray-100">
            Total: <strong>{pagination.total}</strong><br />
            Last Updated: {dayjs().format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button icon={<ReloadOutlined />} onClick={() => fetchData(1, pagination.pageSize, searchText)} />
          </Tooltip>
          <Input.Search
            placeholder="Search Clint"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
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
        title="Datasheet Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedItem && (
          <>
            <p><strong>Title:</strong> {selectedItem.name}</p>
            <p><strong>Intro:</strong> {selectedItem.about}</p>
            <p><strong>Uses:</strong> {selectedItem.detail}</p>
            <p><strong>Features:</strong> {selectedItem.features}</p>
            <p><strong>Slug:</strong> {selectedItem.slug}</p>
            <p><strong>Post Type:</strong> {selectedItem.postType}</p>
            <p><strong>Status:</strong> {selectedItem.status ? "Active" : "Inactive"}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Domain:</strong> {selectedItem.domain}</p>
            <p><strong>View Order:</strong> {selectedItem.viewOrder}</p>
            <p><strong>Date:</strong> {dayjs(selectedItem.regDate).format("YYYY-MM-DD")}</p>

            {selectedItem.photo && (
              <div className="mt-4">
                <p><strong>Image:</strong></p>
                <Image
                  width={100}
                  height={100}
                  src={`${API_URL}${selectedItem.photo}`}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                  alt="Preview"
                />
              </div>
            )}

            {selectedItem.specifications?.length > 0 && (
              <div className="mt-4">
                <p><strong>Specifications (PDF):</strong></p>
                <ul style={{ paddingLeft: "1.5rem", listStyle: "disc" }}>
                  {selectedItem.specifications.map((spec, index) => (
                    <li key={spec.id}>
                      <div>
                        <p>
                          <strong>Name:</strong> {spec.name},
                          <strong> Details:</strong> {spec.detail},
                          <strong> Category:</strong> {spec.category}
                        </p>
                      </div>

                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Modal>
    </Card>
  );
};

export default DemoList;
