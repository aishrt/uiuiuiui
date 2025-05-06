import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  // State for filters
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    sort: "a-z",
    role: "all"
  });

  
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
          <BasicTableOne users={[]} />
        </ComponentCard>
      </div>
    </>
  );
}
