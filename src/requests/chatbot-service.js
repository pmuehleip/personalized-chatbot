import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

function handleRequestError(error) {
    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx status code
        throw new Error(error.response.data.error);
    } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response received from server');
    } else {
        // Something else happened
        throw new Error('Error creating user');
    }
}

export const createChatbot = async (role, greeting, title, description) => {
    try {
        const response = await api.post('/chatbot', {"role": role, "greeting": greeting});
        return response.data; // {"chatbot_id": ""}
    } catch(error) {
        handleRequestError(error);
    }
};
  
export const getChatbot = async (chatbotId) => {
    try {
        const response = await api.get(`/chatbot/${chatbotId}`);
        return response.data; // {"id": "", "role": "", "greeting": ""}
    } catch(error) {
        handleRequestError(error);
    }
};

export const createChat = async (chatbotId) => {
    try {
        const response = await api.post('/chat', {"chatbot_id": chatbotId});
        return response.data; // {"chat_id": ""}
    } catch(error) {
        handleRequestError(error);
    }
};

export const getChat = async (chatId) => {
    try {
        const response = await api.get(`/chat/${chatId}`);
        return response.data; // {"messages": []}
    } catch(error) {
        handleRequestError(error);
    }
};

export const postChat = async (chatId, message) => {
    try {
        const response = await api.post(`/chat/${chatId}`, {"message": message});
        return response.data; // {"role": "", "content": ""}
    } catch(error) {
        handleRequestError(error);
    }
};


// export const updateUser = async (userId, userData) => {
//   const response = await api.put(`/users/${userId}`, userData);
//   return response.data;
// };

// export const deleteUser = async (userId) => {
//   const response = await api.delete(`/users/${userId}`);
//   return response.data;
// };
