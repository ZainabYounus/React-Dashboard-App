import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

//Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, charts, FusionTheme);

function Charts() {

    // Preparing the chart data
    const chartData = [
        {
            label: "Venezuela",
            value: "290"
        },
        {
            label: "Saudi",
            value: "260"
        },
        {
            label: "Canada",
            value: "180"
        },
        {
            label: "Iran",
            value: "140"
        },
        {
            label: "Russia",
            value: "115"
        },
        {
            label: "UAE",
            value: "100"
        },
        {
            label: "US",
            value: "30"
        },
        {
            label: "China",
            value: "30"
        }
    ];

    // Create a JSON object to store the chart configurations
    const chartConfigs = {
        type: "doughnut2d", // The chart type
        width: "700", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                "caption": "Split of Visitors by Age Group",
                "subCaption": "Last year",
                "use3DLighting": "0",
                "showPercentValues": "1",
                "decimals": "1",
                "useDataPlotColorForLabels": "1",
                "theme": "fusion"
            },
            // Chart Data - from step 2
            data: chartData
        }
    };

    return (
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default Charts;
