import { Button, Form, Input } from 'antd';
import styles from './index.module.less';
import WeatherApi from '@api/WeatherApi';
import { useState } from 'react';

const Home = () => {
    const [weather, setWeather] = useState(null)

    const onFinish = async (values: any) => {
        const { city } = values;
        try {
            const res = await WeatherApi.get_weather({ city });
            setWeather(res)
        } catch (error) {
            
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
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input city name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Home;