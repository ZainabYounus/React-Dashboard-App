import React, { Component } from 'react'
import './dashboard.css';
import { Col, Row, Container } from 'react-bootstrap';
import WidgetText from './widgetText';
import WidgetBar from './widgetBar';
import WidgetDoughnut from './widgetDoughnut';
import WidgetColumn from './WidgetColumn';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sourceArr: [],
            usersArr: [],
            sessionsNum: null,
            sessionsPerUser: null,
            pagePerSession: null,
            avgSessionTime: null,
            bounceRate: null,
            columnChartArr: []
        }
    }
    getData = arg => {
        const arr = this.state.items;
        const arrLen = arr.length;

        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let selectedValue = null;
        let sourceArr = [];
        let usersArr = [];
        let sessionsNum = 0;
        let sessionsPerUser = 0;
        let pagePerSession = 0;
        let avgSessionTime = 0;
        let bounceRate = 0;
        let columnChartArr = [];

        for (let i = 0; i < arrLen; i++) {
            if (arg == arr[i]["month"]) {
                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                sessionsNum = arr[i].sessions;
                sessionsPerUser = arr[i].number_of_sessions_per_users;
                pagePerSession = arr[i].page_per_session;
                avgSessionTime = arr[i].avg_session_time;
                bounceRate = arr[i].bounce_rate;


                sourceArr.push(

                    {
                        label: "Organic Source",
                        value: arr[i].organic_source
                    },
                    {
                        label: "Direct Source",
                        value: arr[i].direct_source
                    },
                    {
                        label: "Referral Source",
                        value: arr[i].referral_source
                    }

                );

                usersArr.push(

                    {
                        label: "Users",
                        value: arr[i].users
                    },
                    {
                        label: "New Users",
                        value: arr[i].new_users
                    }
                );

                columnChartArr.push(

                    {
                        label: "No: Of Sessions Per User",
                        value: arr[i].number_of_sessions_per_users
                    },
                    {
                        label: "Page Per Session",
                        value: arr[i].page_per_session
                    },
                    {
                        label: "Average Session Time",
                        value: arr[i].avg_session_time
                    },
                    {
                        label: "Bounce Rate",
                        value: arr[i].bounce_rate
                    }
                );

            }
        }
        selectedValue = arg;

        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sourceArr: sourceArr,
            usersArr: usersArr,
            sessionsNum: sessionsNum,
            sessionsPerUser: sessionsPerUser,
            pagePerSession: pagePerSession,
            avgSessionTime: avgSessionTime,
            bounceRate: bounceRate,
            columnChartArr: columnChartArr
        }, () => {
            // console.log(this.state.organicSource);
        })
    }

    updateDashboard = event => {
        this.getData(event.value);
        this.setState({
            selectedValue: event.value
        }, () => {
            console.log(this.state.users);
        });
    }

    componentDidMount() {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );

            });
    }


    render() {
        return (
            <div>
                {/* fluid means 100% */}
                <Container fluid>
                    <Row className="TopHeader">
                        <Col>
                            Dashboard
                        </Col>

                        <Col>
                            <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>

                <Container className="mainDashboard">
                    <Row>
                        <Col>
                            <WidgetText title="Organic Source" value={this.state.organicSource} />
                        </Col>
                        <Col>
                            <WidgetText title="Direct Source" value={this.state.directSource} />
                        </Col>
                        <Col>
                            <WidgetText title="Referral Source" value={this.state.referralSource} />
                        </Col>
                        <Col>
                            <WidgetText title="Page Views" value={this.state.pageViews} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <WidgetBar title="Source Comparison" data={this.state.sourceArr} />
                        </Col>
                        <Col>
                            <WidgetText title="Total Sessions" description="Number of sessions in a year" value={this.state.sessionsNum} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <WidgetDoughnut title="Users Source" data={this.state.usersArr} />
                        </Col>
                        <Col>
                            <WidgetColumn title="Sessions Analysis" data={this.state.columnChartArr} />
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Dashboard;
