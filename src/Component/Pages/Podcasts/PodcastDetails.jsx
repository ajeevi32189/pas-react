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
import Cookies from "js-cookie";
import { API_URL } from "../../../config";

const PodcastDetails = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

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

      const response = await axios.post(`${API_URL}/api/Podcasts/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;
      setPodcasts(result.data || []);
      setPagination({ current: page, pageSize, total: result.totalCount || 0 });
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load podcast data");
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

      await axios.post(`${API_URL}/api/Podcasts/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Podcast deleted successfully");
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete podcast");
    }
  };

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
      render: (type) => <Tag color="purple">{type}</Tag>,
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
                setSelectedPodcast(record);
                setViewModalVisible(true);
              }}
              style={{ color: "#522EA8" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => navigate("/podcast/create", { state: record })}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm title="Delete this podcast?" onConfirm={() => handleDelete(record.id)}>
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
          <h3 className="text-2xl font-semibold">Podcast Library</h3>
          <p className="text-sm text-gray-100">
            Total Podcasts: <span className="font-semibold">{pagination.total}</span><br />
            Last Updated: {dayjs().format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button icon={<ReloadOutlined />} onClick={() => fetchData(1, pagination.pageSize, searchText)} />
          </Tooltip>
          <Input.Search
            placeholder="Search podcasts"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
          <Link to="/podcast/create">
            <Button icon={<PlusOutlined />} style={{ backgroundColor: "#fff", color: "#522EA8", fontWeight: 600 }}>
              Add Podcast
            </Button>
          </Link>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={podcasts}
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
        title="Podcast Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedPodcast && (
          <div>
            <p><strong>Title:</strong> {selectedPodcast.name}</p>
            <p><strong>Slug:</strong> {selectedPodcast.slug}</p>
            <p><strong>About:</strong></p>
            <p style={{ whiteSpace: "pre-line", marginTop: 0 }}>
              {selectedPodcast.about?.trim() || "N/A"}
            </p>
            <p><strong>Post Type:</strong> {selectedPodcast.postType}</p>
            <p><strong>Status:</strong> {selectedPodcast.status ? "Active" : "Inactive"}</p>
            <p><strong>Offering:</strong> {selectedPodcast.category || "N/A"}</p>
            <p><strong>Domain:</strong> {selectedPodcast.domain}</p>
            <p><strong>Date:</strong> {dayjs(selectedPodcast.regDate).format("YYYY-MM-DD")}</p>

            {selectedPodcast.photo && (
              <div className="mt-4">
                <p><strong>Thumbnail:</strong></p>
                <Image
                  width={200}
                  height={120}
                  src={`${API_URL}${selectedPodcast.photo}`}
                  alt="Podcast Thumbnail"
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}

            {selectedPodcast.detail && (
              <div className="mt-4">
                <p><strong>Embedded YouTube Video:</strong></p>
                <div style={{ aspectRatio: "16/9", maxWidth: "100%" }}>
                  <iframe
                    title="YouTube Video"
                    width="100%"
                    height="300"
                    src={`https://www.youtube.com/embed/${selectedPodcast.detail}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default PodcastDetails;
