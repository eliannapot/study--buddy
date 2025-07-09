import moment from "moment";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import colors from "../app/config/colors";

const StatisticsChart = ({ mode, xpLog }) => {

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => colors.hexToRGBA(colors.primary, opacity), // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundGradientFrom: colors.lightbackground,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: colors.lightbackground,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => colors.hexToRGBA(colors.primary, opacity), // optional
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
    };

    const formatXPData = () => {
        const groupedData = {};
        const now = moment();
    
        if (mode === "month") {
            // Group by week, show only last 4 weeks
            for (let i = 3; i >= 0; i--) {
                const startOfWeek = moment().subtract(i, "weeks").startOf("isoWeek");
                const endOfWeek = moment(startOfWeek).endOf("isoWeek");
                const label = `${startOfWeek.format("D")}-${endOfWeek.format("D/MM")}`; // e.g., 7–13/04
                groupedData[label] = 0;
    
                xpLog.forEach(entry => {
                    const entryDate = moment(entry.timestamp);
                    if (entryDate.isBetween(startOfWeek, endOfWeek, undefined, '[]')) {
                        groupedData[label] += entry.xp;
                    }
                });
            }
        } else if (mode === "alltime") {
            // Group by month, show only last 6 months
            for (let i = 5; i >= 0; i--) {
                const month = moment().subtract(i, "months");
                const key = month.format("YYYY-MM");
                const label = month.format("MMM"); // e.g., Jan
                groupedData[label] = 0;
    
                xpLog.forEach(entry => {
                    const entryDate = moment(entry.timestamp);
                    if (entryDate.isSame(month, "month")) {
                        groupedData[label] += entry.xp;
                    }
                });
            }
        } else if (mode === "week") {
            const startOfWeek = moment().startOf("isoWeek");
            for (let i = 0; i < 7; i++) {
                const day = moment(startOfWeek).add(i, "days");
                const label = day.format("ddd");
                groupedData[label] = 0;
    
                xpLog.forEach(entry => {
                    const entryDate = moment(entry.timestamp);
                    if (entryDate.isSame(day, "day")) {
                        groupedData[label] += entry.xp;
                    }
                });
            }
        }
    
        const labels = Object.keys(groupedData);
        const dataPoints = labels.map(k => groupedData[k]);
    
        return {
            labels,
            datasets: [
                {
                    data: dataPoints,
                    color: (opacity = 1) => colors.hexToRGBA(colors.primary, opacity),
                    strokeWidth: 2
                }
            ],
            legend: [`XP`]
        };
    };
    

    const chartData = formatXPData();

    return(
        <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
        />
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
});

export default StatisticsChart;