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
import Cookies from "js-cookie";
import { API_URL } from "../../../config";

const BrochureDetails = () => {
  const [brochures, setBrochures] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  const token = Cookies.get("token");
  const puid = Cookies.get("puid") || "123456";
  const navigate = useNavigate();

  const fetchData = useCallback(async (page = 1, pageSize = 10, search = "") => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("PUID", puid);
      formData.append("Slug", "#");
      formData.append("CrudAction", "VIEW");
      formData.append("PageNo", page);
      formData.append("PageSize", pageSize);
      if (search) formData.append("Search", search);

      const response = await axios.post(`${API_URL}/api/Brochure/manage`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = response.data;
      setBrochures(result.data || []);
      setPagination({ current: page, pageSize, total: result.totalCount || 0 });
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load brochure data");
    } finally {
      setLoading(false);
    }
  }, [puid, token]);

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
      formData.append("PUID", puid);
      formData.append("Slug", "#");
      formData.append("CrudAction", "DELETE");
      formData.append("Id", id);

      await axios.post(`${API_URL}/api/Brochure/manage`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Brochure deleted successfully");
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete brochure");
    }
  };

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Title", dataIndex: "name" },
    {
      title: "Type",
      dataIndex: "postType",
      render: (type) => <Tag color="purple">{type || "BROCHURE"}</Tag>,
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
      render: (val) => <Tag>{val || "N/A"}</Tag>,
    },
    { title: "Domain", dataIndex: "domain" },
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
                setSelectedBrochure(record);
                setViewModalVisible(true);
              }}
              style={{ color: "#522EA8" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => navigate("/brochure/create", { state: record })}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete this brochure?"
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
          <h3 className="text-2xl font-semibold">Brochure Library</h3>
          <p className="text-sm text-gray-100">
            Total Brochures: <span className="font-semibold">{pagination.total}</span><br />
            Last Updated: {dayjs().format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchData(1, pagination.pageSize, searchText)}
            />
          </Tooltip>
          <Input.Search
            placeholder="Search brochures"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
          <Link to="/brochure/create">
            <Button
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#fff", color: "#522EA8", fontWeight: 600 }}
            >
              Add Brochure
            </Button>
          </Link>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={brochures}
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
        title="Brochure Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedBrochure && (
          <div>
            <p><strong>Title:</strong> {selectedBrochure.name}</p>
            <p><strong>Slug:</strong> {selectedBrochure.slug}</p>
            <p><strong>About:</strong></p>
            <p style={{ whiteSpace: "pre-line", marginTop: 0 }}>
              {selectedBrochure.about?.trim() || "N/A"}
            </p>
            <p><strong>Post Type:</strong> {selectedBrochure.postType}</p>
            <p><strong>Status:</strong> {selectedBrochure.status ? "Active" : "Inactive"}</p>
            <p><strong>Offering:</strong> {selectedBrochure.category || "N/A"}</p>
            <p><strong>Domain:</strong> {selectedBrochure.domain}</p>
            <p><strong>Date:</strong> {dayjs(selectedBrochure.regDate).format("YYYY-MM-DD")}</p>

            {selectedBrochure.photo && (
              <div className="mt-4">
                <p><strong>PDF:</strong></p>
                <a
                  href={`${API_URL}${selectedBrochure.photo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Uploaded Brochure
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default BrochureDetails;
