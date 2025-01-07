const API_URL = import.meta.env.VITE_API_URL;

export const fetchFriends = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const response = await fetch(`${API_URL}/api/users/me/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch friends");
        }

        return await response.json(); // 친구 목록 반환
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

export const fetchFriendRequests = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const response = await fetch(`${API_URL}/api/users/me/requests`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch friend requests");
        }

        return await response.json(); // 친구 요청 목록 반환
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        throw error;
    }
};

export const sendFriendRequest = async (targetEmail: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    
    try {
        const response = await fetch(`${API_URL}/api/users/me/sendRequest`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ targetEmail }),
        });

        if (!response.ok) {
            throw new Error("Failed to send friend request");
        }

        return await response.json(); // 성공 메시지 반환
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
};

export const acceptFriendRequest = async (requesterEmail: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const response = await fetch(`${API_URL}/api/users/me/addFriend`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ requesterEmail }),
        });

        if (!response.ok) {
            throw new Error("Failed to accept friend request");
        }

        return await response.json(); // 성공 메시지 반환
    } catch (error) {
        console.error("Error accepting friend request:", error);
        throw error;
    }
};

export const refuseFriendRequest = async (requesterEmail: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const response = await fetch(`${API_URL}/api/users/me/refuse`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ requesterEmail }),
        });

        if (!response.ok) {
            throw new Error("Failed to refuse friend request");
        }

        return await response.json(); // 성공 메시지 반환
    } catch (error) {
        console.error("Error refusing friend request:", error);
        throw error;
    }
};
