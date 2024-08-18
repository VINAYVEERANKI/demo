import React from "react";
import DashboardInnerLayout from "../../layout/dashboardInnerLayout";
import SelectField from "../../form/selectField";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ComplaintsMetric = () => {
    const data = [
        {
            name: 'Page A',
            initiated: 4000,
            approved: 2400,
            assigned: 2300,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2400,
        },
        {
            name: 'Page B',
            initiated: 3000,
            approved: 1398,
            assigned: 2400,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2210,
        },
        {
            name: 'Page C',
            initiated: 2000,
            approved: 9800,
            assigned: 2000,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2290,
        },
        {
            name: 'Page D',
            initiated: 2780,
            approved: 3908,
            assigned: 2400,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2000,
        },
        {
            name: 'Page E',
            initiated: 1890,
            approved: 4800,
            assigned: 2400,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2181,
        },
        {
            name: 'Page F',
            initiated: 2390,
            approved: 3800,
            assigned: 2400,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2500,
        },
        {
            name: 'Page G',
            initiated: 3490,
            approved: 4300,
            assigned: 2400,
            rejected: 3300,
            banned: 1200,
            pending: 2300,
            unassigned: 2800,
            amt: 2100,
        },
    ];
    return (
        <DashboardInnerLayout heading={"Complaints Metric"}>
            <div>
                {/* <label>User</label> */}
                <div><SelectField label={"User"} /></div>
                <div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="initiated" fill="#D52C7B" />
                            <Bar dataKey="rejected" fill="#13AEAE" />
                            <Bar dataKey="approved" fill="#1B7500" />
                            <Bar dataKey="banned" fill="#147AD6" />
                            <Bar dataKey="assigned" fill="#4400AB" />
                            <Bar dataKey="pending" fill="#FFC000B2" />
                            <Bar dataKey="unassigned" fill="#E14141" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </DashboardInnerLayout>
    );
};

export default ComplaintsMetric;


