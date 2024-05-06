import * as request from '../ultils/request'


const EXERCISES_ENDPOINT = "/api/exercies"

export const getExercies = async () => {
    try {
        const response = await request.getExercies(EXERCISES_ENDPOINT, {});
        return response;

    } catch (error) {
        return error
    }
};
