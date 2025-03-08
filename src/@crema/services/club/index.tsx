// src/api/clubsApi.ts
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { Club } from '@crema/types/models/guest';

// Base URL is already set in jwtAxios as 'http://localhost:5000/api/'
const CLUBS_ENDPOINT = 'clubs';

/**
 * Fetch all clubs (typically for admin use)
 */
export const fetchAllClubs = async (): Promise<Club[]> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all clubs:', error);
    throw error;
  }
};

/**
 * Fetch featured clubs (typically for guest/public view)
 */
export const fetchFeaturedClubs = async (): Promise<Club[]> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured clubs:', error);
    throw error;
  }
};

/**
 * Fetch clubs by category
 */
export const fetchClubsByCategory = async (category: string): Promise<Club[]> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching clubs for category ${category}:`, error);
    throw error;
  }
};



/**
 * Fetch a specific club by ID
 */
export const fetchClubById = async (id: string | number): Promise<Club> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching club with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new club (admin function)
 */
export const createClub = async (clubData: Omit<Club, 'id'>): Promise<Club> => {
  try {
    const response = await jwtAxios.post(`${CLUBS_ENDPOINT}`, clubData);
    return response.data;
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
};

/**
 * Update an existing club (admin function)
 */
export const updateClub = async (id: number, clubData: Partial<Club>): Promise<Club> => {
  try {
    const response = await jwtAxios.put(`${CLUBS_ENDPOINT}/${id}`, clubData);
    return response.data;
  } catch (error) {
    console.error(`Error updating club with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a club (admin function)
 */
export const deleteClub = async (id: number): Promise<void> => {
  try {
    await jwtAxios.delete(`${CLUBS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting club with id ${id}:`, error);
    throw error;
  }
};

/**
 * Join a club (member function)
 */
export const joinClub = async (clubId: number): Promise<void> => {
  try {
    await jwtAxios.post(`${CLUBS_ENDPOINT}/${clubId}/join`);
  } catch (error) {
    console.error(`Error joining club with id ${clubId}:`, error);
    throw error;
  }
};

/**
 * Leave a club (member function)
 */
export const leaveClub = async (clubId: number): Promise<void> => {
  try {
    await jwtAxios.post(`${CLUBS_ENDPOINT}/${clubId}/leave`);
  } catch (error) {
    console.error(`Error leaving club with id ${clubId}:`, error);
    throw error;
  }
};

export const getUserClubs = async (): Promise<Club[]> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user clubs:', error);
    throw error;
  }
};

/**
 * Search clubs with multiple parameters
 */
export const searchClubs = async (params: {
  query?: string;
  category?: string;
  limit?: number;
  page?: number;
}): Promise<{
  clubs: Club[];
  total: number;
  page: number;
  limit: number;
}> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.query) queryParams.append('query', params.query);
    if (params.category) queryParams.append('category', params.category);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    
    const url = `${CLUBS_ENDPOINT}/search?${queryParams.toString()}`;
    const response = await jwtAxios.get(url);
    
    return response.data;
  } catch (error) {
    console.error('Error searching clubs:', error);
    throw error;
  }
};

/**
 * Get club statistics (admin function)
 */
export const getClubStatistics = async (clubId: number): Promise<{
  totalMembers: number;
  activeMembers: number;
  eventsHosted: number;
  memberGrowth: { period: string; count: number }[];
}> => {
  try {
    const response = await jwtAxios.get(`${CLUBS_ENDPOINT}/${clubId}/statistics`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching statistics for club ${clubId}:`, error);
    throw error;
  }
};