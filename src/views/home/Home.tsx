import { Button, Descriptions, Form, Input } from 'antd';
import styles from './index.module.less';
import WeatherApi from '@api/WeatherApi';
import { Fragment, useState } from 'react';

type ICity = {
    date: string;
    high: string;
    low: string;
    text_day: string;
}

const Home = () => {
    const [weather, setWeather] = useState<ICity | null>(null)

    const onFinish = async (values: any) => {
        const { city } = values;
        try {
            const res = await WeatherApi.get_weather({ city }) as any;
            const weatherData = res?.[0]?.data?.[0] as ICity | undefined;
            if (weatherData) setWeather(weatherData);
        } catch (error) {
           console.log(error);
        }
    };
    return (
        <div className={styles.home}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="城市名"
                    name="city"
                    rules={[{ required: true, message: '请输入城市名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>
            </Form>
                {
                    weather ? <Descriptions title="天气预报">
                                <Descriptions.Item label="日期" span={3}>{ weather.date }</Descriptions.Item>
                                <Descriptions.Item label="最高温度" span={2}>{ weather.high } °C</Descriptions.Item>
                                <Descriptions.Item label="最低温度">{ weather.low }°C</Descriptions.Item>
                                <Descriptions.Item label="天气现象">{ weather.text_day }</Descriptions.Item>
                            </Descriptions> : ''
                }
        </div>
    );
}

export default Home;