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

const ContentDetailsDatasheet = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [domains, setDomains] = useState([]); // State to store unique domains
  const [offerings, setOfferings] = useState([]); // State to store unique offerings

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

      const response = await axios.post(`${API_URL}/api/NewPost/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;

      // Check if the API response structure matches what we expect
      if (result && result.data) {
        setData(result.data || []);
        setPagination({ 
          current: page, 
          pageSize, 
          total: result.totalCount || result.data.length || 0 
        });
        
        // Extract unique domain words for filter
        const domainWords = new Set();
        // Extract unique offerings for filter
        const offeringWords = new Set();
        
        result.data.forEach(item => {
          if (item.domain) {
            // Split domain by spaces and add each word to the set
            item.domain.split(/\s+/).forEach(word => {
              if (word.trim()) domainWords.add(word.trim());
            });
          }
          
          if (item.category) {
            // Add offering/category to the set
            offeringWords.add(item.category.trim());
          }
        });
        
        // Convert to array and sort alphabetically
        const uniqueDomainWords = Array.from(domainWords).sort();
        const uniqueOfferingWords = Array.from(offeringWords).sort();
        
        setDomains(uniqueDomainWords.map(domain => ({ text: domain, value: domain })));
        setOfferings(uniqueOfferingWords.map(offering => ({ text: offering, value: offering })));
      } else {
        // If the API returns a different structure, try to adapt
        setData(Array.isArray(result) ? result : []);
        setPagination({ 
          current: page, 
          pageSize, 
          total: Array.isArray(result) ? result.length : 0 
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load datasheet data");
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

      await axios.post(`${API_URL}/api/NewPost/manage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Deleted successfully");
      fetchData(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 70,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "postType",
      key: "postType",
      render: (type) => {
        let color = "blue";
        if (type === "BLOG") color = "green";
        else if (type === "BROCHURE") color = "orange";
        else if (type === "CASE-STUDY") color = "purple";
        return <Tag color={color}>{type}</Tag>;
      },
      filters: [
        { text: 'Blog', value: 'BLOG' },
        { text: 'Brochure', value: 'BROCHURE' },
        { text: 'Case Study', value: 'CASE-STUDY' },
      ],
      onFilter: (value, record) => record.postType === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status ? "green" : "volcano"}>{status ? "Active" : "Inactive"}</Tag>,
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Offering",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag>{category || "N/A"}</Tag>,
      filters: offerings, // Use the extracted offerings for filtering
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
      filters: domains, // Use the extracted domain words for filtering
      onFilter: (value, record) => record.domain && record.domain.includes(value),
    },
    {
      title: "Created Date",
      dataIndex: "regDate",
      key: "regDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.regDate) - new Date(b.regDate),
    },
    {
      title: "Action",
      key: "action",
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
              onClick={() => navigate("/contentdata", { state: record })}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm 
              title="Are you sure to delete this item?" 
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
      fixed: 'right',
      width: 150,
    },
  ];

  return (
    <Card className="m-2 shadow-sm rounded-md">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
        <div>
          <h3 className="text-2xl font-semibold">Blogs, Brochures & Case-Studies</h3>
          <p className="text-sm text-gray-100">
            Total: <strong>{pagination.total}</strong><br />
            Last Updated: {dayjs().format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <Space wrap>
          <Tooltip title="Refresh">
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => fetchData(1, pagination.pageSize, searchText)}
              style={{ color: "black", borderColor: "white" }}
            />
          </Tooltip>
          <Input.Search
            placeholder="Search content"
            allowClear
            onChange={handleSearch}
            style={{ width: 250 }}
          />
          <Link to="/contentdata">
            <Button 
              icon={<PlusOutlined />} 
              style={{ backgroundColor: "#fff", color: "#522EA8", fontWeight: 600 }}
            >
              Add Content
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
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={(pg, filters, sorter) => {
          setPagination({ ...pg });
          // You could add sorting logic here if needed
        }}
        rowKey="id"
        bordered
        scroll={{ x: 1000 }}
      />

      <Modal
        title="Content Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Title:</p>
                <p>{selectedItem.title || selectedItem.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Post Type:</p>
                <p>{selectedItem.postType || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{selectedItem.status ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <p className="font-semibold">Offering:</p>
                <p>{selectedItem.category || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Domain:</p>
                <p>{selectedItem.domain || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Slug:</p>
                <p>{selectedItem.slug || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">View Order:</p>
                <p>{selectedItem.viewOrder || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Date:</p>
                <p>{dayjs(selectedItem.regDate).format("YYYY-MM-DD")}</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">Intro/About:</p>
              <p className="bg-gray-50 p-2 rounded">{selectedItem.intro || selectedItem.about || "N/A"}</p>
            </div>
            
            <div>
              <p className="font-semibold">Details/Uses:</p>
              <p className="bg-gray-50 p-2 rounded">{selectedItem.details || selectedItem.uses || selectedItem.detail || "N/A"}</p>
            </div>
            
            {selectedItem.features && (
              <div>
                <p className="font-semibold">Features/Conclusion:</p>
                <p className="bg-gray-50 p-2 rounded">{selectedItem.features || selectedItem.conclusion || "N/A"}</p>
              </div>
            )}

            {selectedItem.photo && (
              <div className="mt-4">
                <p className="font-semibold">Image:</p>
                <Image
                  width={200}
                  src={`${API_URL}${selectedItem.photo}`}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                  alt="Preview"
                  placeholder={
                    <div className="flex items-center justify-center h-20 bg-gray-100 rounded">
                      Loading...
                    </div>
                  }
                />
              </div>
            )}

            {selectedItem.specifications && selectedItem.specifications.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Specifications:</p>
                <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                  {selectedItem.specifications.map((spec, index) => (
                    <div key={index} className="mb-2 pb-2 border-b last:border-b-0">
                      <p><span className="font-medium">Name:</span> {spec.name || "N/A"}</p>
                      <p><span className="font-medium">Details:</span> {spec.detail || "N/A"}</p>
                      <p><span className="font-medium">Category:</span> {spec.category || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ContentDetailsDatasheet;