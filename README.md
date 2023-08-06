
# SteelEye Assignment 1
## Ayushi Mahobia (Reg No: 12018039)
### Question 1
In the title of the header, it displays 5 orders but there are 6 orders in the table. We want to display the total number of orders in the header title
#### Solution
Passed the data to be displayed as prop to HeaderTitle component.
```javascript
<HeaderTitle primaryTitle="Orders" secondaryTitle={`${filteredData.length} orders`} />
```

### Question 2 
In the table order submitted date is missing, we have timestamp data included in the src\assets\timeStamps.json with the corresponding ids, please combine that with the order data and make sure the order submitted date is being displayed in the table
#### Solution
```javascript
Error with Data.json: Multiple data with same &id. Needs to be resolved first.
```
Merged both data into newData and passed it as a prop to List Component.
```javascript
const newData = mockData.results;
const timestampsMap = {};

timestamps.results.forEach((result) => {
    const id = result["&id"];
    timestampsMap[id] = result.timestamps;
});

newData.forEach((data) => {
    const id = data["&id"];
    if (timestampsMap[id]) {
        data["timestamps"] = timestampsMap[id];
    }
});
```

### Question 3
Order Volume cell is displaying USD values, can you please make it display the currency value selected on the dropdown located in the header of the dashboard
#### Solution
```javascript
//Used useState hook 
const [currency, setCurrency] = useState("EUR");

//use onChange to set currency
<Dropdown
    options={["GBP", "USD", "JPY", "EUR"]}
    onChange={(e) => setCurrency(e.target.value)}
    selectedItem={currency}
/>

//Displayed the respective currency in the List Component.
<ListRowCell>
    {row.bestExecutionData.orderVolume[currency]}
</ListRowCell>

```

### Question 4
Can you please add search feature on the order IDs with the search bar given in the header
#### Solution
```javascript
//useState hook to store the search Querry
const [searchText, setSearchText] = useState("");
<Search
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
/>

//UseEffect hook to filter out the newData according to search querry.
const [filteredData, setFilteredData] = useState(newData);
useEffect(() => {
if (!searchText) {
    setFilteredData(newData);
} else {
    const filtered = newData.filter((data) => {
    const id = data["&id"];
    return id.includes(searchText);
    });
    setFilteredData(filtered);
}
}, [searchText, newData]);

//passed this filteredData as prop to List Component to be displayed
<List
    rows={filteredData}
    currency={currency} 
    setSelectedOrderDetails={setSelectedOrderDetails}
    setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}
/>
```

### Question 5
Please clear the console errors and warnings.
#### Solution
```javascript
// Mostly console errors were due to missing index values in forEach. Resolved all errors.
```

### Question 6
When user selects an order, can you populate the Card on top of the listing component as shown in the image.
#### Solution
```javascript
//used handleClick function to set respective data. Passed these data to respective components.
const handleClick = (e) => {
    console.log(rows);
    setSelectedOrderDetails({
        buySellIndicator: e.transactionDetails.buySellIndicator,
        orderStatus: e.executionDetails.orderStatus,
        orderType: e.executionDetails.orderType,
    });
    setSelectedOrderTimeStamps({
        orderReceived: e.timestamps.orderReceived,
        orderStatusUpdated: e.timestamps.orderStatusUpdated,
        orderSubmitted: e.timestamps.orderSubmitted,
    });
};
```

### To run:
Clone the repo
```bash
$ npm i
$ npm start
```

##Preview:
![image](https://github.com/ayushimahobia/Steeleye_Assignment1/assets/98510312/01d1e657-56fd-489a-a518-c080789aa196)


#### Thank You!!
