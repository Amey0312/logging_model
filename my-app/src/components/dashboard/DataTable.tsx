'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import AddEditModal from './AddEditModal';

interface Item {
  _id: string;
  name: string;
  dateOfBirth: string;
  age: number;
}

const DataTable = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(data);
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = async (item: Partial<Item>) => {
    try {
      const token = localStorage.getItem('token');
      if (item._id) {
        // Update existing item
        const { data } = await axios.put(`/api/items/${item._id}`, item, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems((prevItems) =>
          prevItems.map((i) => (i._id === data._id ? data : i))
        );
        toast.success('Item updated successfully');
      } else {
        // Add new item
        const { data } = await axios.post('/api/items', item, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems((prevItems) => [...prevItems, data]);
        toast.success('Item added successfully');
      }
      handleModalClose();
    } catch (error) {
      toast.error('Error saving item');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <button
        className="mb-4 bg-green-500 text-white text-xl hover:bg-white hover:text-green-600 px-4 py-2 rounded-2xl"
        onClick={handleAdd}
      >
        Add Item
      </button>
      <table className="table-auto w-full bg-white shadow rounded-2xl ">
        <thead >
          <tr className="bg-gradient-to-r from-slate-900 to-slate-700 text-left ">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date of Birth</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t font-mono font-extrabold text-gray-700" >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{new Date(item.dateOfBirth).toLocaleDateString()}</td>
              <td className="px-4 py-2">{item.age}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white hover:bg-white hover:text-blue-500 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white hover:bg-white hover:text-red-400 px-2 py-1 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <AddEditModal
          item={currentItem}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DataTable;
