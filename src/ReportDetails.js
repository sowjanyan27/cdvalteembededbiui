
/// <summary>
/// File Name : ReportDetails.js
/// Created By : 
/// Purpose : To display   the content of the reports
/// </summary>
/// <returns></returns>

import React, { useEffect } from 'react';
import {  models } from 'powerbi-client';//power bi component 
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';// power bi  component  to connect to react need to install the package
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ReportDetails = (props) => {
  //Dependencies//
//useLocation is a hook provided by the react-router-dom library that returns the location object that represents the current URL
//useNavigate  to navigate to different url
//methods to work with the query string of a URL
//querParams --- Accessing the parameters from  different component
  const location = useLocation();
  const isLoading = location.state === 'loading';
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const reportId = queryParams.get('reportId');
  const embedUrl = queryParams.get('embedUrl');
  const token = queryParams.get('token');
  const name = queryParams.get('reportname');
//  function to access the powerbi report template
  let  embedConfig= {
    type: 'report',
    id: reportId,
    embedUrl:embedUrl ,
    accessToken: token,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      // background: models.BackgroundType.Transparent
    }
  };
  console.log(embedConfig,'embedConfig')
  //It is used to handle  the  fetching data, updating the DOM
  useEffect(() => {
    console.log(reportId, embedUrl, token);
    const embedContainer = embedConfig
        console.log(embedContainer,'embedcontainer')
  }, [reportId, embedUrl, token]);
  
 // method to get back to the list where list of reports are there
  const handleBackToList = () => {
    
    navigate('/');
  };
//  used to return the  response of  elements depending on where it is used.
  return (
    <div>
      <h2>{name}</h2>
      <div>
      <button  onClick={handleBackToList} style={{ float: 'right', marginRight: '139px' }}>Back to List</button>
      </div>
        <div id="embedContainer"  className="reportContainer">
        <PowerBIEmbed // powerbi component to display 
          embedConfig={embedConfig}
          cssClassName={"reportClass"}
          
        />
      
  
  </div>
    </div>
  );
};

export default ReportDetails;

