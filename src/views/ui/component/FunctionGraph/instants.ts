import { Iprops, IpropsArr } from './FunctionGraph';


export const getOptions = (prop: IpropsArr) => {
    // console.log(fn, 'fn---------');
    const series: any = [];
    prop.fnArr.map((fn: Iprops) => {
        const dts = Array.from({ length: 200 }).map((item, i) => fn((i - 100) * .01))
        series.push(
            {
                type: 'line',
                symbolSize: 0,
                name: '', // 图例对应类别
                data: dts, // 纵坐标数据
            }
        )

    })

    return {
        color: ['#1bc2f6', '#12ecb7'],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(7,46,70, .8)',
            borderColor: '#099bbf',
            textStyle: {
                color: '#fff'
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(50, 216, 205, 1)'
                },
            },
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: 0,
            top: '40',
            containLabel: true,
        },
        legend: {
            // icon: 'rect',
            // orient: 'horizontal',
            left: 'right',
            // itemWidth: 12,
            // itemHeight: 12,
            // formatter: ['{a|{name}}'].join('\n'),
            textStyle: {
                fontSize: 12,
                color: '#6A93B9',
                height: 8,
                rich: {
                    a: {
                        verticalAlign: 'bottom',
                    },
                },
            },
            data: ['2021', '2022'],
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#616d87',
                },
            },
            interval: 0,
            axisLabel: {
                interval: 0,
                fontSize: 12,
                color: '#6A93B9',
                rotate: 45,
                formatter: (v: any) => {
                    // (i - 100) * .01 * 10 % 1 === 0 ? (i - 100) / 100 : ''
                    v = Number(v).toFixed(2);
                    v = v * 100 / 100;
                    return v * 10 % 1 === 0 ? v : '';
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.15)',
                    type: 'dashed', // dotted 虚线
                },
            },
            data: Array.from({ length: 200 }).map((item, i) => (i * .01)),
        },
        yAxis: [{
            name: '',
            offset: 0,
            type: 'value',
            min: -1,
            max: 1,
            minInterval: 1,
            nameLocation: 'end',
            nameTextStyle: {
                fontSize: 12,
                color: '#BEC5D9',
                align: 'left',
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.15)',
                    type: 'dashed', // dotted 虚线
                },
            },
            splitArea: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.15)',
                    type: 'dashed', // dotted 虚线
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                fontFamily: 'Bebas',
                color: '#6A93B9',
            },
        }],
        series
    };

}