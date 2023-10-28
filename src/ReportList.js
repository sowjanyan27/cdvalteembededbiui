
/// <summary>
/// File Name : ReportList.js
/// Created By : 
/// Purpose : To display the  list of  report names
/// </summary>
/// <returns>  gives the  json data (reports(array-object) and token)</returns>
import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';// third part package need ti install(npm install react-router-dom@latest)
import { PowerBIService } from './api/powerbiapi'; // importing the service  
const ReportList = () => {
  // useNavigate used to navigate to different component
  const navigate = useNavigate();
  const [responseConfig, setResponseConfig] = useState({
    reports: [],
    EmbedToken: '',
  });
  //useState that allows you to add state to a functional component
  // ex:reports is the current state and setReports() is the function that updates the state.
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  //It is used to handle  the  fetching data, updating the DOM
// useEffect(() => {
//   async function fetchData() {
//     try {
//       const url = 'https://cdvaletembeddedbiapi20231028162601.azurewebsites.net/api/Reports/GetReportsList' // Assuming this function returns the  json data 
//       const response=url
//       console.log(response,'response')
//       console.log(response,'response')
//       setResponseConfig(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// // function to get the response and bind it to the view
//   fetchData();
// }, []); 

useEffect(() => {
  function fetchData() {
    const url = 'https://cdvaletembeddedbiapi20231028162601.azurewebsites.net/api/Reports/GetReportsList';

    fetch(url)
      .then(response => {
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        setResponseConfig(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchData();
}, []);

 // method to  to click on the report to get the report details
const handleReportClick = (report) => {
  setLoading(true);
  // Simulate a loading delay
  setTimeout(() => {
    setLoading(false);
  }, 2000);

};
//  used to return the  response of  elements depending on where it is used.
return(
  <div className="report-box-container">
    {responseConfig.reports.map((report, index) => (
     <Link key={index} to={`/report?reportId=${report.Id}&embedUrl=${report.EmbedUrl}&token=${responseConfig.token}&reportname=${report.Name}`}>
     <div className="report-box" onClick={() => handleReportClick(report)}>
       {report.Name}
     </div>
   </Link>
    ))}
  </div>
)
};

export default ReportList;
