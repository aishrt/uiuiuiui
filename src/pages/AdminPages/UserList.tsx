import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne, { Column } from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Badge from "../../components/ui/badge/Badge";

interface ApiUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  country: string;
  state: string;
  city: string;
  role: string;
  status: string;
  created_by?: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

interface UserResponse {
  status: string;
  message: string;
  data: ApiUser[];
}

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
    role: "all"
  });

  const { getData } = useGetData<UserResponse>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getData("/v1/admin/list-user");
        if (response?.data) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Define table columns
  const columns: Column[] = [
    {
      key: 'name',
      header: 'User',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src="/images/user/default-avatar.jpg"
              alt={`${row.first_name || ''} ${row.last_name || ''}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {`${row.first_name || ''} ${row.last_name || ''}`.trim() || 'N/A'}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {row.role}
            </span>
          </div>
        </div>
      ),
      className: 'px-5 py-4 sm:px-6'
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'role',
      header: 'Role'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge
          size="sm"
          color={
            value === "active"
              ? "success"
              : value === "pending"
              ? "warning"
              : "error"
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: () => new Date().toLocaleDateString() // Since API doesn't provide createdAt
    }
  ];
  
  // Handler for search input
  const handleSearch = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  // Handler for sort dropdown
  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value
    }));
  };

  // Handler for role filter
  const handleRoleFilterChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      role: value
    }));
  };

  // Handler for add new user
  const handleAddNew = () => {
    navigate("/add-user");
  };

  // Handler for edit user
  const handleEdit = (user: ApiUser) => {
    navigate(`/edit-user/${user.id}`);
  };

  // Handler for delete user
  const handleDelete = (user: ApiUser) => {
    // After successful delete, update the users list
    setUsers(users.filter(u => u.id !== user.id));
  };

  // Filter users based on search, sort, and role filters
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const matchesSearch = user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      fullName.includes(filters.search.toLowerCase());
    
    const matchesRole = filters.role === "all" || user.role === filters.role;
    
    return matchesSearch && matchesRole;
  });

  // Sort users based on sort filter
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (filters.sort === "a-z") {
      return a.email.localeCompare(b.email);
    } else if (filters.sort === "z-a") {
      return b.email.localeCompare(a.email);
    }
    return 0;
  });
  
  return (
    <>
      <PageMeta
        title="User List"
        description="View and manage fleet data using Trux360's table components"
        ogTitle="User List - Trux360"
        ogDescription="Data table components for managing fleet and logistics information"
        keywords="data tables, fleet management, logistics data, Trux360 tables"
      />
      <PageBreadcrumb pageTitle="User" />
      <div className="space-y-6">
        <ComponentCard
          title="User List"
          showFilters={true}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onRoleFilterChange={handleRoleFilterChange}
          onAddNew={handleAddNew}
        >
          <BasicTableOne 
            data={sortedUsers}
            columns={columns}
            isLoading={loading}
            emptyMessage="No users found"
            actions={{
              showEdit: true,
              showDelete: true,
              onEdit: handleEdit,
              onDelete: handleDelete
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
