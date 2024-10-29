'use client'
import { useEffect, useState,createContext } from "react";

import { useCookies } from "react-cookie";
import Home from "../Dashboard/Home/page";
import { decryptArray } from "../util/encrypt";


// export const hashPermision = (requiredAction: string) => {
//   const PersmisionStorage = sessionStorage.getItem("permision");
//   const permissions = PersmisionStorage ? JSON.parse(PersmisionStorage) : [];
//   return permissions.includes(decrypt(permissions));


export const PermissionContext = createContext<string[] | null>(null);

export default function FunProvider ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<string[]>([]);
  const [cookies, setCookie] = useCookies(['permision']);

  useEffect(() => {
    const hashString = cookies.permision;

    if (hashString !== null) {
      const decryptedHash = decryptArray(hashString);
      setData(decryptedHash);
    } else {
      console.log('Hash is null, cannot decrypt.');
    }
  }, []);

  return (
    <PermissionContext.Provider value={data}>
    {children}
    </PermissionContext.Provider>
  );
};
