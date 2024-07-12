import React from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip as ChartJSTooltip,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import IconButton from "@mui/material/IconButton";
import RestartZoomIcon from "@mui/icons-material/RestartAlt";
import Tooltip from '@mui/material/Tooltip';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartJSTooltip,
    Legend
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
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
};

const VerticalBarChart = ({data}) => {
    const chartRef = React.useRef(null);
    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };
    if (!data) {
        return null
    }
    return <>
        <Bar ref={chartRef} options={defaultOptions} data={data}/>
        <Tooltip title="Reset Zoom">
            <IconButton onClick={handleResetZoom}>
                <RestartZoomIcon/>
            </IconButton>
        </Tooltip>
    </>
}

export default VerticalBarChart