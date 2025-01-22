import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchProvider({children}) {
    const [searchTerm, setSearchTerm] = useState("")
    const ctx={
        searchTerm,
        setSearchTerm,
    }

    return ( <SearchContext value={ctx} >
        {children}
    </SearchContext> );
}

export default SearchProvider;