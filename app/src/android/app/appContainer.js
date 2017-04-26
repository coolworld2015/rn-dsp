'use strict';

import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Campaigns from '../campaigns/campaigns';
import CampaignDetails from '../campaigns/campaignDetails';

import Sspsem from '../sspsem/sspsem';
import SspsemDetails from '../sspsem/sspsemDetails';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    onLogOut() {
        this.props.onLogOut();
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar backgroundColor='white'/>}
            >
                <CampaignsTab tabLabel="Campaigns"/>
                <SspsemTab tabLabel="SSP EM"/>
                <Logout onLogOut={this.onLogOut.bind(this)} tabLabel="Logout"/>
            </ScrollableTabView>
        );
    }
}

class Logout extends Component {
    constructor(props) {
        super(props);

        this.props.onLogOut();
    }

    render() {
        return null;
    }
}

class CampaignsTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Campaigns', index: 0},
            {title: 'Campaign Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Campaigns routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <CampaignDetails data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class SspsemTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Sspsem', index: 0},
            {title: 'Sspsem Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Sspsem routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <SspsemDetails data={route.data} routes={this.routes} navigator={navigator}/>;
                break;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

export default AppContainer;