import { createContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
	const [data, setData] = useState({ name: "atul" });
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
