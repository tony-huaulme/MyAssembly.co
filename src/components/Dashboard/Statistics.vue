
<template>
    <Tabs value="0" class="w-fill">
        <TabList>
            <Tab value="0">Header I</Tab>
            <Tab value="1">Header II</Tab>
            <Tab value="2">Header III</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />

            </TabPanel>
            <TabPanel value="1">
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />

            </TabPanel>
            <TabPanel value="2">
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />

            </TabPanel>
        </TabPanels>
    </Tabs>
    
       

</template>

<script setup>
import { ref, onMounted } from "vue";

import Chart from "primevue/chart";

import Tab from "primevue/tab";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";



onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
        
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: 'Dataset 2',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
