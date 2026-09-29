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
import Cookies from "js-cookie";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");

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

      const response = await axios.post(`${API_URL}/api/Product/Crud`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;
      setData(result.data || []);
      setPagination({ current: page, pageSize, total: result.totalCount || 0 });
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  }, [token]);

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

      await axios.post(`${API_URL}/api/Product/Crud`, formData,
         { headers: { "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`,
         } }
      );
      message.success("Deleted successfully");
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      render: (slug) => <Tag color="blue">{slug}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Offering",
      dataIndex: "category",
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
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => navigate("/product/create", { state: record })}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm title="Confirm delete?" onConfirm={() => handleDelete(record.id)}>
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
          <h3 className="text-2xl font-semibold">Product Overview</h3>
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
            placeholder="Search product"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
          <Link to="/product/create">
            <Button icon={<PlusOutlined />} style={{ backgroundColor: "#fff", color: "#522EA8", fontWeight: 600 }}>
              Add Product
            </Button>
          </Link>
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
        title="Product Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedItem && (
          <>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Slug:</strong> {selectedItem.slug}</p>
            <p><strong>About:</strong> {selectedItem.about}</p>
            <p><strong>Price:</strong> ₹{selectedItem.price}</p>
            <p><strong>DatasheetId:</strong> {selectedItem.datasheetId}</p>
            {/* <p><strong>SKU:</strong> {selectedItem.sku}</p> */}
            <p><strong>Offering:</strong> {selectedItem.category}</p>
            <p><strong>Date:</strong> {dayjs(selectedItem.regDate).format("YYYY-MM-DD")}</p>

            {selectedItem.photos?.length > 0 && (
              <div className="mt-4">
                <p><strong>Photos:</strong></p>
                {selectedItem.photos.map((photo, idx) => (
                  <Image
                    key={idx}
                    width={100}
                    height={100}
                    src={`${API_URL}/${photo.mediaPath}`}
                    style={{ objectFit: "cover", borderRadius: 6, marginRight: 10 }}
                    alt={`product-${idx}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Modal>
    </Card>
  );
};

export default ProductDetails;
