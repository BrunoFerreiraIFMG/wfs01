import baseAPI from './api';

const api = baseAPI('http://localhost:3001/');


//export default {
    const ServiceAPI = {
    getLink: async (code) => {
        try {
            const result = await api.get(`links/${code}`);
        return result.data;
        } 
        catch(e){
            console.log('erro....');
            return {};
        }

    },
    getStats: async (code) => {
        const result = await api.get(`links/${code}/stats`);
    
        return result.data
    },
    generate: async (model) => {
        const result = await api.post(`links`,model);
    
        return result.data
    }

};

export default () => ServiceAPI;

/*
async function getLink(code) {
    const result = await api.get(`links/${code}`);

    return result.data
}

async function getStats(code) {
    const result = await api.get(`links/${code}/stats`);

    return result.data
}

async function generate(model) {
    const result = await api.post(`links`,model);

    return result.data
}
*/