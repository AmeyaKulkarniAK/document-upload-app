import axios from "axios";
import React, { useEffect, useState } from "react";
import DocumentUploadForm from "./DocumentUploadForm";

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    // const [displayedDocuments, setDisplayedDocuments] = useState([]);

  const pageSize = 5;

  // CSS styles
  const tableHeaderStyle = {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    border: "1px solid #ddd",
    padding: "8px",
  };

  const tableRowStyle = {
    border: "1px solid #ddd",
  };

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("/api/documents");
        const data = response.data;
        setDocuments(data);
        updateDisplayedDocuments(data);       
      } catch (error) {
        // Handle error
      }
    };
  
    fetchDocuments();
  }, []);
  



  const updateDisplayedDocuments = (data) => {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const slicedData = data.slice(startIndex, endIndex);
//     setDisplayedDocuments(slicedData);
  };

  // Pagination Logic
  const totalPages = Math.ceil(documents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedDocuments = documents.slice(startIndex, endIndex);

  const handleUpdateTable = (newDocument) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    updateDisplayedDocuments([...documents, newDocument]);
  };

  const handleDelete = (id) => {
    axios
      .get(`/api/delete/${id}`)
      .then(() => {
        const updatedDocuments = documents.filter(
          (document) => document.id !== id
        );
        alert("File deleted successfully");
        setDocuments(updatedDocuments);
        updateDisplayedDocuments(updatedDocuments);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateDisplayedDocuments(documents);
  };

  return (
    <div>
      <DocumentUploadForm onUpload={handleUpdateTable} />
      <br />
      <br />
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Document ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>File Type</th>
            <th style={tableHeaderStyle}>File Size</th>
            <th style={tableHeaderStyle}>Actions</th>
            {/* <th style={tableHeaderStyle}>File Content</th> */}
          </tr>
        </thead>
        <tbody>
          {displayedDocuments.map((document) => (
            <tr key={document.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{document.id}</td>
              <td style={tableCellStyle}>{document.name}</td>
              <td style={tableCellStyle}>{document.fileType}</td>
              <td style={tableCellStyle}>{document.fileSize}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleDelete(document.id)}>
                  Delete
                </button>
              </td>
              {/* <td style={{ ...tableCellStyle, wordWrap: "break-word" }}>
                {document.fileContent}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentTable;
