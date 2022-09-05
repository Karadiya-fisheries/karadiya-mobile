// import { React, useState } from "react";

// export const logrecord = logRecord;
// export const LogContext = React.createContext();
// const [logRecord, setRecord] = useState([]);

// useEffect(async () => {
//     try {
//         const savedData = await AsyncStorage.getItem('Elog');
//         const currentData = JSON.parse(savedData);

//         if (currentData != null) {
//             console.log("currentData");
//             console.log(currentData);
//             setRecord(currentData);
//         }


//     } catch (error) {
//         console.log(error);
//     }

//     return () => {
//         console.log('This will be logged on unmount');
//     };

// }, []);