import Api from './Api';

class WeatherApi extends Api {
    get_weather(params: any) {
        return this._get('/get_weather', params)
    }
}


const weatherApi = new WeatherApi();

export default weatherApi;