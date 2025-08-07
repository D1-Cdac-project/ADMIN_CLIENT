import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertCircle, Search, Eye } from "lucide-react";
import { ProviderStatus } from "../../types";

const ProvidersList = ({ providers, onApprove, onDeny, onView }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    all: 1,
    [ProviderStatus.PENDING]: 1,
    [ProviderStatus.APPROVED]: 1,
    [ProviderStatus.REJECTED]: 1,
  });
  const itemsPerPage = 10;

  // Sort providers by status: pending > approved > rejected
  const sortedProviders = [...providers].sort((a, b) => {
    const statusOrder = {
      [ProviderStatus.PENDING]: 1,
      [ProviderStatus.APPROVED]: 2,
      [ProviderStatus.REJECTED]: 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const filteredProviders = sortedProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || provider.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Calculate pagination for the current filter
  const totalItems = filteredProviders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = pagination[filter];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProviders = filteredProviders.slice(startIndex, endIndex);

  // Reset page to 1 when filter or searchTerm changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, [filter]: 1 }));
  }, [filter, searchTerm]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, [filter]: page }));
  };

  const statusBadge = (status) => {
    switch (status) {
      case ProviderStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <AlertCircle size={12} />
            Pending
          </span>
        );
      case ProviderStatus.APPROVED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle2 size={12} />
            Approved
          </span>
        );
      case ProviderStatus.REJECTED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <XCircle size={12} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 form-input max-w-xs"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === "all"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.PENDING)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.PENDING
                  ? "bg-warning-100 text-warning-800"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.APPROVED)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.APPROVED
                  ? "bg-success-100 text-success-800"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.REJECTED)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.REJECTED
                  ? "bg-error-100 text-error-800"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProviders.length > 0 ? (
              paginatedProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {provider.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {provider.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {provider.businessName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {provider.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {statusBadge(provider.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(provider.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(provider)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye size={18} />
                      </button>

                      {provider.status === ProviderStatus.PENDING && (
                        <>
                          <button
                            onClick={() => {
                              onApprove(provider.id);
                              setPagination((prev) => ({
                                ...prev,
                                [filter]: 1,
                              }));
                            }}
                            className="text-success-600 hover:text-success-900"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              onDeny(provider.id);
                              setPagination((prev) => ({
                                ...prev,
                                [filter]: 1,
                              }));
                            }}
                            className="text-error-600 hover:text-error-900"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No providers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} providers
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded-md bg-white text-gray-600 border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded-md bg-white text-gray-600 border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvidersList;
