import { useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const newData = mockData.results;
  const timeStampsMaps = {};
  const [filteredData , setfilteredData] = useState(newData);

  timestamps.results.forEach((result) =>{
    const id = result["&id"];
    timeStampsMaps[id] = result.timestamps;
  });

  newData.forEach((data)=>{
    const id = data["&id"];
    if(timeStampsMaps[id]){
      data["timestamps"] = timeStampsMaps[id];
    }
  });

  useEffect(()=>{
    if(!searchText){
      setfilteredData(newData);
    }
    else{
      const filtered = newData.filter((data) =>{
        const id = data["&id"];
        return id.includes(searchText);
      });
      setfilteredData(filtered);
    }
  },[searchText,newData]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle= {`${filteredData.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List 
        rows = {filteredData}
        currency = {currency}
        setSelectedOrderTimeStamps ={setSelectedOrderTimeStamps}  
        setSelectedOrderDetails={setSelectedOrderDetails}   
        />
      </div>
    </div>
  );
};

export default Dashboard;
