import localforage from "localforage";

const URL = import.meta.env.VITE_API_URL;
const token = (await localforage.getItem<string>('access_token')) || '';

export async function getNotification(page: string) {
  let newURL = URL + '/api/notifications';

  if (page) {
    newURL += `?page=${page}`;
  }

  const response = await fetch(`${newURL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return await response.json();
}

export async function markAsRead() {
  const response = await fetch(`${URL}/api/notifications/mark-as-read`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function deleteNotifications(id: string) {
  const response = await fetch(`${URL}/api/notifications/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function deleteAll() {
  const response = await fetch(`${URL}/api/notifications/all`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function hasUnreadNotifications() {
  const response = await fetch(`${URL}/api/notifications/has-unread-notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return await response.json();
}
