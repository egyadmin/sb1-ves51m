import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, AlertCircle, ShoppingCart, Plus, FileText, Clock, CheckCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import ActionButton from '../components/ActionButton';
import Modal from '../components/Modal';
import SupplyOrderForm from '../components/forms/SupplyOrderForm';
import AddItemForm from '../components/forms/AddItemForm';
import { useModal } from '../hooks/useModal';
import TableLanguageSelector from '../components/TableLanguageSelector';

export default function Pharmacy() {
  const { t } = useTranslation();
  const { 
    isOpen: isOrderModalOpen, 
    openModal: openOrderModal, 
    closeModal: closeOrderModal 
  } = useModal();
  const { 
    isOpen: isAddItemModalOpen, 
    openModal: openAddItemModal, 
    closeModal: closeAddItemModal 
  } = useModal();
  const [activeTab, setActiveTab] = useState('inventory');

  const inventory = [
    {
      id: '1',
      category: 'OXYGEN',
      item: 'أسطوانة أكسجين طبي',
      quantity: 15,
      minimumRequired: 10,
      status: 'متوفر'
    },
    {
      id: '2',
      category: 'INJECTIONS',
      item: 'حقن طبية معقمة',
      quantity: 500,
      minimumRequired: 200,
      status: 'متوفر'
    }
  ];

  const pendingOrders = [
    {
      id: 'ORD001',
      date: '2024-03-20',
      items: [
        { name: 'أسطوانة أكسجين طبي', quantity: 5 },
        { name: 'حقن طبية معقمة', quantity: 200 }
      ],
      priority: 'عاجلة',
      status: 'قيد المراجعة',
      requestedBy: 'د. أحمد محمد',
      location: 'مشروع الرياض'
    },
    {
      id: 'ORD002',
      date: '2024-03-19',
      items: [
        { name: 'محاليل طبية', quantity: 50 },
        { name: 'مواد تعقيم', quantity: 100 }
      ],
      priority: 'عادية',
      status: 'تمت الموافقة',
      requestedBy: 'د. محمد علي',
      location: 'مشروع جدة'
    }
  ];

  const handleSubmitOrder = (data: any) => {
    console.log('New supply order:', data);
    closeOrderModal();
  };

  const handleAddItem = (data: any) => {
    console.log('New item:', data);
    closeAddItemModal();
  };

  const inventoryColumns = [
    { key: 'item', header: 'الصنف' },
    { key: 'category', header: 'التصنيف' },
    { key: 'quantity', header: 'الكمية' },
    { key: 'minimumRequired', header: 'الحد الأدنى' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'متوفر'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    }
  ];

  const orderColumns = [
    { key: 'id', header: 'رقم الطلب' },
    { key: 'date', header: 'التاريخ' },
    { 
      key: 'items',
      header: 'الأصناف',
      render: (items: any[]) => (
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="text-sm">
              {item.name} ({item.quantity})
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'priority',
      header: 'الأولوية',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'عاجلة'
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'requestedBy', header: 'مقدم الطلب' },
    { key: 'location', header: 'الموقع' },
    {
      key: 'status',
      header: 'الحالة',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'تمت الموافقة'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">المخزون الطبي</h2>
        <div className="flex gap-2">
          <ActionButton
            icon={Plus}
            label="إضافة صنف"
            onClick={openAddItemModal}
            variant="secondary"
          />
          <ActionButton
            icon={ShoppingCart}
            label="طلب مستلزمات"
            onClick={openOrderModal}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package className="inline-block w-5 h-5 ml-2" />
            المخزون الحالي
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Clock className="inline-block w-5 h-5 ml-2" />
            الطلبات قيد الانتظار
          </button>
        </div>

        <TableLanguageSelector />

        {activeTab === 'inventory' ? (
          <DataTable data={inventory} columns={inventoryColumns} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-600 ml-3" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">قيد الانتظار</p>
                    <p className="text-2xl font-bold text-blue-800">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-yellow-600 ml-3" />
                  <div>
                    <p className="text-sm text-yellow-600 font-medium">عاجلة</p>
                    <p className="text-2xl font-bold text-yellow-800">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600 ml-3" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">تمت الموافقة</p>
                    <p className="text-2xl font-bold text-green-800">8</p>
                  </div>
                </div>
              </div>
            </div>
            <DataTable data={pendingOrders} columns={orderColumns} />
          </>
        )}
      </div>

      <Modal
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        title="طلب مستلزمات طبية"
      >
        <SupplyOrderForm onSubmit={handleSubmitOrder} />
      </Modal>

      <Modal
        isOpen={isAddItemModalOpen}
        onClose={closeAddItemModal}
        title="إضافة صنف جديد"
      >
        <AddItemForm onSubmit={handleAddItem} />
      </Modal>
    </div>
  );
}