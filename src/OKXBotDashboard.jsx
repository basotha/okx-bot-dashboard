import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Table } from "./components/ui/table";
import { Input } from "./components/ui/input"; // Thêm input để nhập thông số
import { Trash2 } from "lucide-react";


const OKXBotDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // State chứa thông số bot
  const [config, setConfig] = useState({
    symbol: "PI/USDT",
    tradeAmount: 20,
    profitTarget: 1.2,
    stopLoss: 0.6,
    orderGap: 0.01,
    maxOrders: 2,
    updateInterval: 0.8,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.example.com/okx/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu: ", error);
    }
    setLoading(false);
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.post("https://api.example.com/okx/cancel", { orderId });
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Lỗi khi hủy lệnh: ", error);
    }
  };

  // Xử lý cập nhật thông số
  const handleConfigChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Lệnh Giao Dịch OKX</h1>

      {/* Bảng cấu hình giao dịch */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cấu hình giao dịch</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Cặp giao dịch</label>
            <Input name="symbol" value={config.symbol} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Số lượng mỗi lệnh</label>
            <Input name="tradeAmount" type="number" value={config.tradeAmount} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Chốt lời (%)</label>
            <Input name="profitTarget" type="number" step="0.01" value={config.profitTarget} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Cắt lỗ (%)</label>
            <Input name="stopLoss" type="number" step="0.01" value={config.stopLoss} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Khoảng cách đặt lệnh</label>
            <Input name="orderGap" type="number" step="0.01" value={config.orderGap} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Số lệnh tối đa</label>
            <Input name="maxOrders" type="number" value={config.maxOrders} onChange={handleConfigChange} />
          </div>
          <div>
            <label>Thời gian cập nhật (giây)</label>
            <Input name="updateInterval" type="number" step="0.1" value={config.updateInterval} onChange={handleConfigChange} />
          </div>
        </div>
      </Card>

      <Button onClick={fetchOrders} disabled={loading} className="mb-4">
        {loading ? "Đang tải..." : "Cập nhật lệnh"}
      </Button>

      <Card>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.side}</td>
                <td>{order.price}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="destructive" onClick={() => cancelOrder(order.id)}>
                    <Trash2 size={16} /> Hủy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default OKXBotDashboard;
