// src/store/bucketListStore.ts
import { create } from 'zustand';
import type { BucketList, Planet, Position } from '../types/bucketList';

interface BucketListState {
 bucketLists: BucketList[];
 loading: boolean;
 error: string | null;
 addBucketList: (content: string, targetDate: Date, planet: Planet, position: Position) => Promise<void>;
 fetchBucketLists: () => Promise<void>;
 completeBucketList: (id: string) => Promise<void>;
}

export const useBucketListStore = create<BucketListState>((set) => ({
 bucketLists: [],
 loading: false,
 error: null,
 
 addBucketList: async (content: string, targetDate: Date, planet: Planet, position: Position) => {
   set({ loading: true, error: null });
   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/buckets`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
       },
       body: JSON.stringify({ 
         content, 
         targetDate, 
         planet,
         position,
       })
     });
     
     if (!response.ok) throw new Error('Failed to add bucket list');
     
     const newBucketList = await response.json();
     set(state => ({
       bucketLists: [...state.bucketLists, newBucketList]
     }));
   } catch (error) {
     set({ error: (error as Error).message });
   } finally {
     set({ loading: false });
   }
 },

 fetchBucketLists: async () => {
   set({ loading: true, error: null });
   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/buckets`, {
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`
       }
     });
     if (!response.ok) throw new Error('Failed to fetch bucket lists');
     
     const bucketLists = await response.json();
     set({ bucketLists });
   } catch (error) {
     set({ error: (error as Error).message });
   } finally {
     set({ loading: false });
   }
 },

 completeBucketList: async (id: string) => {
   set({ loading: true, error: null });
   try {
     const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/buckets/${id}/complete`,
       {
         method: 'PATCH',
         headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
       }
     );
     
     if (!response.ok) throw new Error('Failed to complete bucket list');
     
     const updatedBucketList = await response.json();
     set(state => ({
       bucketLists: state.bucketLists.map(bucket =>
         bucket._id === id ? updatedBucketList : bucket
       )
     }));
   } catch (error) {
     set({ error: (error as Error).message });
   } finally {
     set({ loading: false });
   }
 }
}));