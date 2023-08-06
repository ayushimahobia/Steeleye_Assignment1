import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ 
  rows,
  currency,
  setSelectedOrderDetails,
  setSelectedOrderTimeStamps,
 }) => {
  const handleClick = (e) =>{
    // console.log(e);
    setSelectedOrderDetails({
      buySellIndicator : e.transactionDetails.buySellIndicator,
      orderStatus : e.executionDetails.orderStatus,
      orderType : e.executionDetails.orderType,
    });
    setSelectedOrderTimeStamps({
      orderReceived : e.timestamps.orderReceived,
      orderStatusUpdated : e.timestamps.orderStatusUpdated,
      orderSubmitted : e.timestamps.orderSubmitted,
    });
  };
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row,i) => (
          <ListRow key ={i} onClick={()=> handleClick(row)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.timestamps.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
