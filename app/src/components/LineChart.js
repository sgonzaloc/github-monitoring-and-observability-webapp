import React from 'react';
import ZoomPlugin from "chartjs-plugin-zoom"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartJSTooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import RestartZoomIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartJSTooltip,
    Filler,
    Legend,
    ZoomPlugin
);

export const defaultOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: ''
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                drag: {
                    enabled: true,
                    backgroundColor: 'rgba(55, 99, 132,0.2)',
                    borderColor: 'rgba(55, 99, 132,1)',
                    borderWidth: 1,
                    threshold: 100

                },
                mode: 'x',
            },
            pan: {
                enabled: true,
                mode: 'x',
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            }
        }
    }
};

const LineChart = ({data}) => {
    const chartRef = React.useRef(null);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };
    if (!data){
        return null
    }

    return <>
        <Line ref={chartRef} options={defaultOptions} data={data}/>
        <Tooltip title="Reset Zoom">
            <IconButton onClick={handleResetZoom}>
                <RestartZoomIcon/>
            </IconButton>
        </Tooltip>
    </>
}

export default LineChart