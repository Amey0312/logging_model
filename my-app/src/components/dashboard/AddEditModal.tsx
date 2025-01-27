import React, { useState, useEffect } from 'react';

interface AddEditModalProps {
  item: { _id?: string; name?: string; dateOfBirth?: string } | null;
  onClose: () => void;
  onSave: (item: Partial<{ _id: string; name: string; dateOfBirth: string }>) => void;
}

const AddEditModal: React.FC<AddEditModalProps> = ({ item, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState<{ name?: string; dateOfBirth?: string }>({});

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setDateOfBirth(item.dateOfBirth || '');
    }
  }, [item]);

  const validate = () => {
    const errors: { name?: string; dateOfBirth?: string } = {};
    if (!name || name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required.';
    } else if (new Date(dateOfBirth) > new Date()) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ _id: item?._id, name, dateOfBirth });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{item ? 'Edit Item' : 'Add Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
