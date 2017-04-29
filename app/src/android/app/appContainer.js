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

import Viewoo from '../viewoo/viewoo';
import ViewooDetails from '../viewoo/viewooDetails';

import AllRNComponents from '../components/components';

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
                {/*
				<ViewooTab tabLabel="Viewoo"/>
                <ComponentsTab tabLabel="Demo"/>
				*/}
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

class ViewooTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Viewoo', index: 0},
            {title: 'Viewoo Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Viewoo routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <ViewooDetails data={route.data} routes={this.routes} navigator={navigator}/>;
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

class ComponentsTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Components', index: 0},
            {title: 'Components Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <AllRNComponents routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <AllRNComponents data={route.data} routes={this.routes} navigator={navigator}/>;
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