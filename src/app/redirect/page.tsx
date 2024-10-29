'use client'
import { apifetch } from "@/api";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page() {

const [cookies]=useCookies(['authToken','id'])

;
     const router = useRouter();
   useEffect(() => {
   
  
    const checkSession = async () => {
      try {
     
        if (cookies.authToken&&cookies.id) {
       
  
     const response= await apifetch.get(`/getUserbyId/${cookies.id}`,{headers:{Authorization:`${cookies.authToken}`}});
          if (response.status === 200 && response.data) {
            router.push('/');
          } else {
            router.push('/login');
          }
        } else {
  
          router.push('/login');
        }
      } catch (error: any) {

        console.error('Error checking session:', error);
      }
    }
   
  checkSession()
   }, [router]);


}