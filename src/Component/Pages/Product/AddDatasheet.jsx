import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Switch,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../config";

const { Option } = Select;

const categoryOptions = [
  "General",
  "Mechanical",
  "Electrical",
  "Thermal",
  "Certification",
];

const ProductDatasheetForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state || null;
  const isEdit = !!editData;

  const token = Cookies.get("token");
  const [domains, setDomains] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/StaticData/post-domain`);
        setDomains(res.data || []);
      } catch (error) {
        message.error("Failed to load domain options");
      }
    };
    fetchDomains();
  }, []);

  const fetchProducts = async (domain, preselectId = null) => {
    if (!domain) {
      setProducts([]);
      form.setFieldsValue({ productId: undefined });
      return;
    }

    setProductLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/Website/get-products?domain=${domain}`
      );
      setProducts(res.data || []);

      // If editing, pre-fill form AFTER products are fetched
      if (isEdit && preselectId) {
        form.setFieldsValue({
          productId: preselectId,
        });
      }
    } catch {
      message.error("Failed to load products");
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit && editData) {
      form.setFieldsValue({
        domain: editData.domain,
        parameter: editData.parameter,
        value: editData.value,
        status: editData.status ?? true,
        category: editData.category,
      });

      fetchProducts(editData.domain, editData.productId);
    }
  }, [editData]);

  const handleDomainChange = (value) => {
    form.setFieldsValue({ productId: undefined });
    fetchProducts(value);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Id", isEdit ? editData.id : "");
    formData.append("productId", parseInt(values.productId));
    formData.append("Slug", values.slug ?? "#");
    formData.append("parameter", values.parameter);
    formData.append("domain", values.domain);
    formData.append("value", values.value);
    formData.append("ViewOrder", "0");
    formData.append("Status", values.status ?? true);
    formData.append("PUID", editData?.puid || "123456");
    formData.append("CrudAction", isEdit ? "EDIT" : "ADD");
    formData.append("Category", values.category);
    formData.append("PostType", "Datasheet");

    try {
      const res = await axios.post(
        `${API_URL}/api/ProductDatasheet/Crud`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        message.success(
          `Datasheet ${isEdit ? "updated" : "added"} successfully`
        );
        navigate("/datasheet");
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <Card className="m-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#522EA8]/80 to-[#8A2BE2]/80 text-white px-6 py-4 rounded-md shadow-sm mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {isEdit ? "✏️ Edit Datasheet" : "📄 Add Datasheet"}
            </h3>
            <p className="text-sm text-gray-100">
              Manage technical parameters for products
            </p>
          </div>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/datasheet")}
            style={{ color: "white" }}
          >
            Datasheet Details
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="p-4"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="domain"
                label="Domain"
                rules={[{ required: true, message: "Please select domain" }]}
              >
                <Select
                  placeholder="Select Domain"
                  onChange={handleDomainChange}
                >
                  {domains.map((dom, index) => (
                    <Option key={index} value={dom}>
                      {dom}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="productId"
                label="Product"
                rules={[{ required: true, message: "Please select product" }]}
              >
                <Select
                  placeholder="Select Product"
                  loading={productLoading}
                  disabled={!form.getFieldValue("domain")}
                >
                  {products.map((product) => (
                    <Option key={product.id} value={product.id}>
                      {product.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="category"
                label="Offering"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select Category">
                  {categoryOptions.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="parameter"
                label="Parameter"
                rules={[{ required: true, message: "Please enter parameter" }]}
              >
                <Input placeholder="E.g., Voltage, Weight" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="value"
                label="Value"
                rules={[{ required: true, message: "Please enter value" }]}
              >
                <Input placeholder="E.g., 220V, 5kg" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ background: "#522EA8", border: "none" }}
              size="large"
            >
              {isEdit ? "Update Datasheet" : "Submit Datasheet"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductDatasheetForm;
