'use strict';

import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

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
                <CampaignsTab tabLabel="Campaigns1"/>
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
            {title: 'Phones', index: 0},
            {title: 'Phone Details', index: 1}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Phones routes={this.routes} navigator={navigator}/>;
                break;
            case 1:
                return <PhoneDetails data={route.data} routes={this.routes} navigator={navigator}/>;
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