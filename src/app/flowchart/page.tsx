
import React from 'react';

const FlowchartPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Flowchart</h2>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Colleges</h3>
          {/* Placeholder for colleges */}
          <div className="p-2 bg-gray-200 rounded-md mb-4">College List</div>
          <h3 className="font-semibold text-gray-700 mb-2">Courses</h3>
          {/* Placeholder for courses */}
          <div className="p-2 bg-gray-200 rounded-md">Course List</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold">Create your flowchart</h1>
        </div>
        <div className="flex-1 p-8 bg-gray-200">
          {/* Canvas for flowchart */}
          <div className="w-full h-full bg-white rounded-md shadow-md">
            {/* Placeholder for flowchart content */}
            <p className="text-center p-4 text-gray-500">Flowchart canvas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowchartPage;
